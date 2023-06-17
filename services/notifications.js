import { getMessaging, requestPermission, getToken, onMessage, AuthorizationStatus } from "firebase/messaging";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { auth, firebase, firestore } from "./firebaseConfig";


/*const messaging = getMessaging(firebase);


export const requestUserPermission = async () => {
  try {
    const authStatus = await requestPermission(messaging);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await getToken(messaging);
      console.log('FCM token:', token);
      return token;
    }
  } catch (error) {
    console.error('Error requesting user permission:', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });*/

export const hasNewNotifications = async () => {
  const uid = auth.currentUser.uid;
  const notificationsRef = doc(firestore, 'notifications', uid);

  const snapshot = await getDoc(notificationsRef);
  if (!snapshot.exists()) {
    return false;
  }

  const data = snapshot.data();
  return data.hasNew;
};
