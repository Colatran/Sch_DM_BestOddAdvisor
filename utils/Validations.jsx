const pattern_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const validateEmail = (valid, email, setValid_Email) => {
  if(pattern_email.test(email)) {
    setValid_Email(true);
  }
  else {
    setValid_Email(false);
    valid.valid = false;
  }
}

export const validateName = (valid, name, setValid_Name) => {
  if(name.trim() === '') {
    setValid_Name(false);
    valid.valid = false;
  }
  else {
    setValid_Name(true);
  }
}

export const validatePass = (valid, pass, setValid_Pass) => {
  if(pass.length < 4) {
    setValid_Pass(false);
    valid.valid = false;
  }
  else {
    setValid_Pass(true);
  }
}

export const validatePassConfirm = (valid, pass, passConf, setValid_PassConf) => {
  if(pass === passConf) {
    setValid_PassConf(true);
  }
  else {
    setValid_PassConf(false);
    valid.valid = false;
  }
}

export const validateBirthDate = (valid, birthDate, setValid_birthDate) => {
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff == 0 && dayDiff < 0)) { 
    age--; 
  }

  if(age < 18) {
    setValid_birthDate(false);
    valid.valid = false;
  }
  else {
    setValid_birthDate(true);
  }
}