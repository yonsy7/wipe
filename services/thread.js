import { collection, doc, getDoc, query, orderBy, getDocs } from 'firebase/firestore';

import { firestore } from './firebaseConfig';


export const getThread = async (tweetId) => {
  const tweetRef = doc(firestore, 'tweets', tweetId);
  const mainTweetSnapshot = await getDoc(tweetRef);

  if (!mainTweetSnapshot.exists()) {
    throw new Error('Tweet not found');
  }

  const mainTweet = { id: mainTweetSnapshot.id, ...mainTweetSnapshot.data() };
  const repliesQuery = query(collection(tweetRef, 'replies'), orderBy('createdAt', 'asc'));
  const repliesSnapshot = await getDocs(repliesQuery);
  const threadReplies = repliesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { mainTweet, threadReplies };
};
