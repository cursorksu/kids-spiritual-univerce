import Resizer from 'react-image-file-resizer';

export const resizeFile = (
  file,
  maxWidth = 600,
  maxHeight = 300,
  quality = 80
) => {
  const response = new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'JPEG',
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });
  return response;
};
