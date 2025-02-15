import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { fbConfig } from "./fbConfig";

export const firebaseApp = initializeApp(fbConfig);
export const fireStore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);