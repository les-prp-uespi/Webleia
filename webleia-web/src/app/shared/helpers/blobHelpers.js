export const getImageBlob = async (url, name = "image.jpg") => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], name, { type: blob.type });
  return file;
};
