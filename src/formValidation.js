export const emailValidation = (value) => {
  if (value === "") {
    return "This field is mandatory";
  } else if (
    // eslint-disable-next-line
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) === false
  ) {
    return "Invalid email address.";
  } else {
    return "OK";
  }
};

export const textValidation = (value) => {
  if (value === "") {
    return "This field is mandatory";
  } else if (value.length < 3) {
    return "Field is too short.";
  } else {
    return "OK";
  }
};
