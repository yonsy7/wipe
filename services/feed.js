import { getFirestore, collection, doc, getDoc, query, where, orderBy, limit, startAfter, getDocs, addDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { auth, firestore } from './firebaseConfig';
export const updateArray = async() => {
  const ownerId = auth.currentUser.uid;
  const circleRef = collection(firestore,'circles')
    const circleDoc = await addDoc(circleRef, {
      name: "circleName",
      owner: ownerId,
      membersId: [ownerId],
      membersUsernames: ["ownerUsername"],
      createdAt: new Date(),
      tweets: [],
    });

    const userRef = doc(firestore,'users', ownerId);
    await updateDoc(userRef, {
      circles: arrayUnion(circleDoc.id),
    });

    return circleDoc.id;
}

export const getFeedTweets = async (lastVisible) => {
  const uid = auth.currentUser.uid;
  const tweetsRef = collection(firestore, 'tweets');

  const circleQuerySnapshot = await getDoc(doc(collection(firestore, 'users'), uid));
  const userCircles = circleQuerySnapshot.data().circles;

  if (!userCircles || userCircles.length === 0) {
    return { tweets: [], lastVisible: null };
  }

  let tweetQuery = query(
    tweetsRef,
    where('circleId', 'in', userCircles),
    orderBy('createdAt', 'desc'),
    limit(10)
  );

  if (lastVisible) {
    tweetQuery = query(tweetQuery, startAfter(lastVisible));
  }

  const snapshot = await getDocs(tweetQuery);
  const tweets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const newLastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { tweets, lastVisible: newLastVisible };
};
