import { getFirestore, collection, doc, getDoc, getDocs, query, where, orderBy, startAt, endAt, writeBatch, addDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { auth, firestore } from './firebaseConfig';

export const searchUsers = async (searchText) => {
  const usersRef = collection(firestore, 'users');
  const userQuery = query(usersRef, orderBy('username'), startAt(searchText), endAt(searchText + '\uf8ff'));
  const querySnapshot = await getDocs(userQuery);

  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};


export const getFriendRequests = async () => {
  const currentUser = auth.currentUser;
  const requestsRef = collection(firestore, 'friendRequests');
  const requestQuery = query(requestsRef, where('toId', '==', currentUser.uid));
  const querySnapshot = await getDocs(requestQuery);

  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const acceptFriendRequest = async (requestId) => {
  const currentUser = auth.currentUser;
  const requestsRef = collection(firestore, 'friendRequests');
  const requestDoc = await getDoc(doc(requestsRef, requestId));

  if (requestDoc.exists) {
    const { fromId, toId, fromUserName, toUserName } = requestDoc.data();
    const batch = writeBatch(firestore);

    // Add each other as friends
    batch.set(doc(collection(firestore, 'friends')), { friend1Id: fromId, friend1Username: fromUserName, friend2Id: toId, friend2Username: toUserName });
    batch.set(doc(collection(firestore, 'friends')), { friend1Id: toId, friend1Username: toUserName, friend2Id: fromId, friend2Username: fromUserName });

    // Delete the friend request
    batch.delete(doc(requestsRef, requestId));

    await batch.commit();
  }
};

export const rejectFriendRequest = async (requestId) => {
  const requestsRef = collection(firestore, 'friendRequests');
  await deleteDoc(doc(requestsRef, requestId));
};

export const addFriend = async (userId) => {
  const currentUser = auth.currentUser;

  // Retrieve the current user's name
  const currentUserSnapshot = await getDoc(doc(firestore, 'users', currentUser.uid));
  const currentUserName = currentUserSnapshot.data().username;

  // Retrieve the target user's name
  const targetUserSnapshot = await getDoc(doc(firestore, 'users', userId));
  const targetUserName = targetUserSnapshot.data().username;

  const requestsRef = collection(firestore, 'friendRequests');

  await addDoc(requestsRef, {
    fromId: currentUser.uid,
    fromUserName: currentUserName,
    toId: userId,
    toUserName: targetUserName,
    status: 'pending',
  });
};

export const sendFriendRequest = async (senderId, senderName, receiverId, receiverName) => {
  
    await addDoc(collection(firestore, 'friendRequests'), {
      fromId: senderId,
      fromUserName: senderName,
      toId: receiverId,
      toUserName: receiverName,
      status: 'pending',
    });
  
};

export const getUserFriends = async () => {
    const userId = auth.currentUser.uid
  
    const userFriendsRef = collection(firestore, 'friends');
    const friendsQuery1 = query(userFriendsRef, where('friend1Id', '==', userId));
    const friendsQuery2 = query(userFriendsRef, where('friend2Id', '==', userId));

    const [friendsSnapshot1, friendsSnapshot2] = await Promise.all([getDocs(friendsQuery1), getDocs(friendsQuery2)]);

    const friends = [...friendsSnapshot1.docs, ...friendsSnapshot2.docs].map((doc) => doc.data());

    return friends.map((friend) => {
      return {
        id: friend.friend1Id === userId ? friend.friend2Id : friend.friend1Id,
        username: friend.friend1Id === userId ? friend.friend2Username : friend.friend1Username
      };
    });
};
