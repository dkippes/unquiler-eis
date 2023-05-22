export const validateEmail = email =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const validateUrl = url => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url);

export const dateFormatter = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month < 10 ? '0' + month : month}-${day}`;
};
