export const validateEmail = email =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const validateUrl = url => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url);