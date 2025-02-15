import { useCallback, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from '../index';

export const useGetStudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const getStudentProfile = useCallback(async (uid) => {
    try {
      const docRef = doc(fireStore, `students`, uid);
      const docSnap = await getDoc(docRef);
      setProfile(docSnap.data());
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  return { profile, getStudentProfile };
};
