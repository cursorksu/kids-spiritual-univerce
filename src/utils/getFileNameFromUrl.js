export const getFileNameFromUrl = (url) => {
    const decodedUrl = decodeURIComponent(url);
    const parts = decodedUrl.split('/');
    const fileWithParams = parts.pop();
    return fileWithParams.split('?')[0];
};