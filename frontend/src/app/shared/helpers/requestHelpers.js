export const convertToFormData = (formObj) => {
  const formData = new FormData();
  const keys = Object.keys(formObj);
  keys.forEach((key) => {
    formData.append(key, formObj[key]);
  });
  return formData;
};
