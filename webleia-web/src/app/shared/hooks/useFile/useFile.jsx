import { useCallback } from 'react';

const useFile = () => {
  const getExtension = useCallback((fileName) => {
    return fileName.split('.').pop();
  }, []);

  const convertBytesToMB = useCallback((bytes) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }, []);

  const getImageBlob = async (url) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const file = new File([blob], 'image.jpg', { type: blob.type })
    return file
  }

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[arr.length - 1])
    let n = bstr.length
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  return { getExtension, convertBytesToMB, getImageBlob, dataURLtoFile };
};

export default useFile;