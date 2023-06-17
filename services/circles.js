import { auth, firestore } from './firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore, addDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';


export const createCircle = async (circleName, friends) => {
  const ownerId = auth.currentUser?.uid;
  
  const ownerUsername = (await getDoc(doc(firestore, 'users', ownerId))).data().username;
  const circleRef = collection(firestore,'circles');
  const circleDoc = await addDoc(circleRef, {
    name: circleName,
    owner: ownerId,
    membersId: [ownerId, ...friends?.map(friend => friend[0])],
    membersUsernames: [ownerUsername, ...friends?.map(friend => friend[1])],
    createdAt: new Date(),
    tweets: [],
  });
  console.log({
    name: circleName,
    owner: ownerId,
    membersId: [ownerId, ...friends?.map(friend => friend[0])],
    membersUsernames: [ownerUsername, ...friends?.map(friend => friend[1])],
    createdAt: new Date(),
    tweets: [],
  })

  const userRef = doc(firestore,'users', ownerId);
await updateDoc(userRef, {
  circles: arrayUnion(circleDoc.id),
});
;

  return circleDoc.id;
};


export const getCirclesByUser = async (userId) => {
    const q = query(collection(firestore, "circles"), where("membersId", "array-contains", userId));
    const querySnapshot = await getDocs(q);
    const circles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return circles;
};


export const getCircleDetails = async (circleId) => {
  const circleRef = doc(collection(firestore, 'circles'), circleId);
  const circleDoc = await getDoc(circleRef);

  if (circleDoc.exists()) {
    const circleData = circleDoc.data();
    const users = circleData.membersId.map((id, index) => ({
      id: id,
      username: circleData.membersUsernames[index],
    }));
    return {
      id: circleDoc.id,
      name: circleData.name,
      users: users,
    };
  } else {
    return null;
  }
};

export const addUserToCircle = async (circleId, username, userId) => {
  const usersRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(query(usersRef, where('username', '==', username)));

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userId = userDoc.id;
    const circleRef = doc(collection(firestore, 'circles'), circleId);
    await updateDoc(circleRef, {
      membersId: arrayUnion(userId),
      membersUsernames: arrayUnion(username),
    });

    await updateDoc(userDoc.ref, {
      circles: arrayUnion(circleId),
    });

    const updatedCircleDetails = await getCircleDetails(circleId);
    return updatedCircleDetails;
  } else {
    return null;
  }
};

export const removeUserFromCircle = async (circleId, userId, username) => {
  const userRef = doc(collection(firestore, 'users'), userId);

  const circleRef = doc(collection(firestore, 'circles'), circleId);
  await updateDoc(circleRef, {
    membersId: arrayRemove(userId),
    membersUsernames: arrayRemove(username),
  });

  await updateDoc(userRef, {
    circles: arrayRemove(circleId),
  });

  const updatedCircleDetails = await getCircleDetails(circleId);
  return updatedCircleDetails;
};
