import { useCallback } from 'react';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';

export const useImages = () => {
  const storage = getStorage();
  const dispatch = useDispatch();

  const uploadImage = useCallback(
    async (file, folder = 'images') => {
      try {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        dispatch(
          setMessage({
            type: 'success',
            message: {
              title: `Image in ${folder}`,
              description: 'successfully uploaded',
            },
          })
        );

        return downloadURL;
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error upload image:`,
              description: error.message,
            },
          })
        );
        throw error;
      }
    },
    [storage, dispatch]
  );

  const deleteImage = useCallback(
    async (filePath) => {
      try {
        const storageRef = ref(storage, filePath);
        await deleteObject(storageRef);
      } catch (error) {
        dispatch(
          setMessage({
            type: 'error',
            message: {
              title: `Error delete image:`,
              description: error.message,
            },
          })
        );
        throw error;
      }
    },
    [storage, dispatch]
  );

  return {
    uploadImage,
    deleteImage,
  };
};
