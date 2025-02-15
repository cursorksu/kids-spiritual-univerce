import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';
import { fireStore } from '../index';

export const useCreateUser = () => {
  const dispatch = useDispatch();
  const createUserDoc = async (userObj) => {
    try {
      const userDock = doc(fireStore, `/users/${userObj?.uid}`);
      const createdAt = Timestamp.now();
      const userData = await setDoc(userDock, {
        ...userObj,
        createdAt,
        groups: [],
      });
      dispatch(
        setMessage({
          type: 'success',
          message: {
            title: `Hi ${userObj.fullName}!`,
            description: `Your Account was successfully created! Now you can Log in`,
          },
        })
      );
      return userData?.uid;
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: 'Error User Creation:',
            description: error.message,
          },
        })
      );
    }
  };

  return { createUser: createUserDoc };
};
