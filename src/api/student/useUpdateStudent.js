import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { useGetStudentProfile } from './useGetStudentProfile';
import { useGetAllEntities } from '../entity/useGetAllEntities';
export const useUpdateStudent = () => {
  const { getStudentProfile } = useGetStudentProfile();
  const { getAllEntities } = useGetAllEntities('students');

  const updateStudentData = useCallback(
    async (studentId, data) => {
      try {
        const studentDocRef = doc(fireStore, `/students/${studentId}`);
        const profileSnap = await getDoc(studentDocRef);
        const student = profileSnap.data();
        if (student) {
          await updateDoc(studentDocRef, {
            ...data,
            modification_timestamp: Timestamp.now(),
          });
          await getAllEntities();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [getStudentProfile, getAllEntities]
  );

  return { updateStudentData };
};
