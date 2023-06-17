import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

export const getBio = async (userId) => {

    if(!userId) return null

    const userRef = doc(firestore, 'users', userId)
    const userSnapchot = getDoc(userRef)
    if(userSnapchot.exists){
        return userSnapchot.data().bio
    }
    else {
        return null
    }
  };
export async function setDataTest(content) {
    const docRef = collection(firestore, "test");
 
    const docData = {
            content
        }
    await addDoc(docRef, docData);
}


  export async function fetchPlugin(userUid) {
    const pluginRef = doc(firestore, 'users', userUid);
    const pluginSnapshot = await getDoc(pluginRef);
    if(pluginSnapshot.exists()) {
      const pluginData = pluginSnapshot.data();
      return pluginData.bio;
    }
    else {
      return null;
    }
}

