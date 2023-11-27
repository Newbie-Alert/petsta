import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { config } from "./config";
import { v4 as uuid } from 'uuid'

// Your we b app's Firebase configuration
// Initialize Firebase

export const saveData = async (uid, title, content) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      uid: uid,
      title,
      content,
      cid: uuid()
    });
    console.log('제목,내용 저장', docRef.id);
  } catch (e) {
    console.log('실패');
    console.log(e.code);
    return null;
  }
};

export const fetchData = async () => {
  const snapshot = await getDocs(collection(db, 'posts'));
  const posts = [];
  snapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return posts;
};

export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const dataUrl = await readFileAsDataURL(file);
    await uploadString(storageRef, dataUrl, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Image URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('에러', error);
    return null;
  }
};

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};


// const firebaseConfig = config.db.dbConfig;

const firebaseConfig = config.db.dbConfig

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Create a storage reference from our storage service
