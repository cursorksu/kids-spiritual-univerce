import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/notificationReducer';
import { fireStore } from '../index';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const useAssignTeacherChurch = () => {
  const dispatch = useDispatch();

  // Добавление учителя к церкви
  const addTeacherToChurch = useCallback(
    (churchId, teacherId) => {
      try {
        const churchRef = doc(fireStore, 'church', churchId);
        const teacherRef = doc(fireStore, 'users', teacherId);

        // Update church's teachers list and teacher's churches list
        const updateChurchPromise = updateDoc(churchRef, {
          teachers: arrayUnion(teacherId),
        });
        const updateTeacherPromise = updateDoc(teacherRef, {
          church: arrayUnion(churchId),
        });

        return Promise.all([updateChurchPromise, updateTeacherPromise]);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error adding teacher to church:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  // Удаление учителя из церкви
  const removeTeacherFromChurch = useCallback(
    (churchId, teacherId) => {
      try {
        const churchRef = doc(fireStore, 'church', churchId);
        const teacherRef = doc(fireStore, 'users', teacherId);

        // Update church's teachers list and teacher's churches list
        const updateChurchPromise = updateDoc(churchRef, {
          teachers: arrayRemove(teacherId),
        });
        const updateTeacherPromise = updateDoc(teacherRef, {
          church: arrayRemove(churchId),
        });

        return Promise.all([updateChurchPromise, updateTeacherPromise]);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: 'Error removing teacher from church:',
              description: error.message,
            },
          })
        );
      }
    },
    [dispatch]
  );

  return { addTeacherToChurch, removeTeacherFromChurch };
};
