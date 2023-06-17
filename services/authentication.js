import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase, auth } from './firebaseConfig';


export const signIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
          // Signed i
        setLoading(false);
        }
        ).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            setLoading(false);
          });
};

export const signOut = async () => {
try {
await firebase.auth().signOut();
} catch (error) {
throw error;
}
};