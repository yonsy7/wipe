import { getFirestore, doc, updateDoc, getDoc, query, collection, where, getDocs, writeBatch } from "firebase/firestore";
import { auth, firestore } from "./firebaseConfig";

export const deleteTweet = async (tweetId) => {
  const userId = auth.currentUser.uid;
  if (!userId || !tweetId) return;

  try {
    const userTweetRef = doc(firestore, 'users', userId, 'tweets', tweetId);
    const tweetRef = doc(firestore, 'tweets', tweetId);
    const batch = writeBatch(firestore);

    // Delete the tweet from the user's tweets subcollection
    batch.delete(userTweetRef);

    // Delete the tweet from the main tweets collection
    batch.delete(tweetRef);

    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = async (profileUpdate) => {
  const userId = auth.currentUser.uid;
  if (!userId || !profileUpdate) return;

  try {
    // Define default values
    const defaults = {
      name: "",
      bio: "",
      profilePictureUrl: "../assets/profilePicture.jpg",
      bannerUrl: "../assets/banner.png"
    };

    // Merge default values with provided profile updates
    const updates = {
      ...defaults,
      ...profileUpdate,
    };

    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error(error);
  }
};

export const getUserProfile = async (userId) => {
  if (!userId) return;

  try {
    const userRef = doc(firestore, 'users', userId);
    const userProfileSnapshot = await getDoc(userRef);

    if (!userProfileSnapshot.exists()) {
      throw new Error('User not found');
    }

    const userCircles = userProfileSnapshot.data().circles || [];

    // Create an empty array to hold the tweets
    let visibleTweets = [];

    // Fetch tweets for each circle
    for (const circleId of userCircles) {
      const tweetsQuery = query(collection(firestore, 'tweets'), where('circleId', '==', circleId));
      const tweetsSnapshot = await getDocs(tweetsQuery);
      const tweets = tweetsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      visibleTweets = [...visibleTweets, ...tweets];
    }

    return { id: userProfileSnapshot.id, ...userProfileSnapshot.data(), visibleTweets};
  } catch (error) {
    console.error(error);
  }
};

export const getUserTweets = async (userId) => {
  if (!userId) return;

  try {
    const userRef = doc(firestore, 'users', userId);
    const userProfileSnapshot = await getDoc(userRef);

    if (!userProfileSnapshot.exists()) {
      throw new Error('User not found');
    }

    const userCircles = userProfileSnapshot.data().circles || [];

    const currentUserSnapshot = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
    const currentUserCircles = currentUserSnapshot.exists() && currentUserSnapshot.data().circles || [];

    // Create an empty array to hold the tweets
    let visibleTweets = [];

    // Fetch tweets for each circle
    if (currentUserCircles.length > 0) {
      for (const circleId of userCircles) {
        const tweetsQuery = query(collection(firestore, 'tweets'), where('circleId', '==', circleId), where('userId', '==', userId));
        const tweetsSnapshot = await getDocs(tweetsQuery);
        const tweets = tweetsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        visibleTweets = [...visibleTweets, ...tweets];
      }
    }

    return { id: userProfileSnapshot.id, visibleTweets};
  } catch (error) {
    console.error(error);
  }
};