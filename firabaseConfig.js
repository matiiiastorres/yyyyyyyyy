import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const firebaseConfig = {
  projectId: 'matias-mit-wallet',
  storageBucket: 'matias-mit-wallet.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyBFzo6F4575YyWg5Oqqq5ZLwg7WnpP1zYc',
  authDomain: 'matias-mit-wallet.firebaseapp.com',
  messagingSenderId: '390985326962',
};

const matias = initializeApp(firebaseConfig);
export const storage = getStorage(matias);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const urlFoto = await getDownloadURL(storageRef);
  return urlFoto;
}
