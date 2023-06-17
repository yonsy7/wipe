import { getFirestore, doc, setDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, getDoc, getDocs, query, where, orderBy, deleteDoc, writeBatch, addDoc, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { auth, firestore } from "./firebaseConfig";

export const createTweet = async (content, circleIds) => {
  const userId = auth.currentUser?.uid;
  const tweetCollectionRef = collection(firestore, 'tweets');
  const tweetData = {
    userId,
    content,
    createdAt: serverTimestamp(),
    circleIds,
    circleMemberIds: [],
    likes: [],
    comments: []
  };

  // Create new document in the 'tweets' collection and get reference
  const newTweetRef = await addDoc(tweetCollectionRef, tweetData);

  // Update the 'circles' collection
  for (const circleId of circleIds) {
    const circleRef = doc(firestore, 'circles', circleId);
    await updateDoc(circleRef, {
      tweets: arrayUnion(newTweetRef.id),
    });
  };

  return newTweetRef.id;
};


export const getTweets = async (circleId) => {
  
    let tweetsQuery = collection(firestore, 'tweets');

    if (circleId) {
      tweetsQuery = query(tweetsQuery, where('circleIds', 'array-contains', circleId));
    }

    const querySnapshot = await getDocs(tweetsQuery);

    const tweets = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return tweets;
  
};

export const deleteTweet = async (tweetId) => {
  
    const tweetRef = doc(firestore, 'tweets', tweetId);

    // Get the tweet document
    const tweetDoc = await getDoc(tweetRef);

    // Begin a new transaction
    const batch = writeBatch(firestore);

    // Update the 'circles' collection
    tweetDoc.data().circleIds.forEach((circleId) => {
      const circleRef = doc(firestore, 'circles', circleId);
      batch.update(circleRef, {
        tweets: arrayRemove(tweetId),
      });
    });

    // Remove the tweet from the 'tweets' collection
    batch.delete(tweetRef);

    // Commit the transaction
    await batch.commit();
  
};

export const getFeedTweets = async (userId) => {
  
    // Get the user document
    const userDoc = await getDoc(doc(firestore, 'users', userId));

    // Get the tweets from the circles that the user is a member of
    const tweetsPromises = userDoc.data().circles.map((circleId) => getTweets(circleId));

    const tweets = (await Promise.all(tweetsPromises)).flat();

    // Sort the tweets in descending order of creation
    const sortedTweets = tweets.sort((a, b) => b.createdAt - a.createdAt);

    return sortedTweets;
  
};

export const likeTweet = async (tweetId, userId) => {
  
    const tweetRef = doc(firestore, 'tweets', tweetId);

    // Begin a new transaction
    const batch = writeBatch(firestore);

    // Update the 'tweets' collection
    batch.update(tweetRef, {
      likes: arrayUnion(userId),
    });

    // Commit the transaction
    await batch.commit();
  
};

export const unlikeTweet = async (tweetId, userId) => {
  
    const tweetRef = doc(firestore, 'tweets', tweetId);

    // Begin a new transaction
    const batch = writeBatch(firestore);

    // Update the 'tweets' collection
    batch.update(tweetRef, {
      likes: arrayRemove(userId),
    });

    // Commit the transaction
    await batch.commit();
  
};
export const createComment = async (tweetId, content) => {
  const userId = auth.currentUser?.uid;
  
  // First get the original tweet to copy its circle data
  const tweetRef = doc(firestore, 'tweets', tweetId);
  const tweetSnapshot = await getDoc(tweetRef);
  const tweetData = tweetSnapshot.data();

  // Reference for the reply in 'replies' sub-collection
  const replyRef = doc(collection(firestore, 'tweets', tweetId, 'replies'));

  const replyData = {
    userId,
    content,
    createdAt: serverTimestamp(),
    likes: [],
    circleId: tweetData.circleId, // copy circle data from the original tweet
    circleName: tweetData.circleName,// copy circle data from the original tweet
  };

  // Begin a new transaction
  const batch = writeBatch(firestore);

  // Set the reply in 'replies' sub-collection under the 'tweets' collection
  batch.set(replyRef, replyData);

  // Commit the transaction
  await batch.commit();

  // Reference for the reply in 'tweets' collection using the same id as the replyRef
  const replyTweetRef = doc(firestore, 'tweets', replyRef.id);

  const replyTweetData = {
    ...replyData,
    isReply: true, // flag indicating this tweet is a reply
    replyTo: tweetId, // storing the id of the original tweet
  };

  // Begin a new transaction
  const batch2 = writeBatch(firestore);

  // Set the reply as a tweet in the 'tweets' collection
  batch2.set(replyTweetRef, replyTweetData);

  // Commit the transaction
  await batch2.commit();

  return replyTweetRef.id;
};


export const getComments = async (tweetId) => {
  
    const commentsQuery = query(collection(firestore, 'comments'), where('tweetId', '==', tweetId), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(commentsQuery);

    const comments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return comments;
  
};

export const likeComment = async (commentId, userId) => {
  
    const commentRef = doc(firestore, 'comments', commentId);

    // Begin a new transaction
    const batch = writeBatch(firestore);

    // Update the 'comments' collection
    batch.update(commentRef, {
      likes: arrayUnion(userId),
    });

    // Commit the transaction
    await batch.commit();
  
  }

  export const unlikeComment = async (commentId, userId) => {
    
      const commentRef = doc(firestore, 'comments', commentId);
  
      // Begin a new transaction
      const batch = writeBatch(firestore);
  
      // Update the 'comments' collection
      batch.update(commentRef, {
        likes: arrayRemove(userId),
      });
  
      // Commit the transaction
      await batch.commit();
    
  };
  