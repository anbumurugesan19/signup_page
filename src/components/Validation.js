const Validation = (formData) => {
  let error = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  if (!formData.firstname) {
    error.firstname = "FirstName Is Required";
  }

  if (!formData.surname) {
    error.surname = "SurName Is Required";
  }

  if (!formData.email) {
    error.email = "Email or MobileNum Is Required";
  } else if (
    emailRegex.test(formData.email) ||
    phoneRegex.test(formData.email)
  ) {
    
  } else {
    error.email = "Email or MobileNum Is Required";
  }

  if (!formData.password) {
    error.password = "Password Is Required";
  } else if (formData.password.length < 5) {
    error.password = "mininum 5 words are needed";
  }

  if (!formData.gender) {
    error.gender = "Gender Is Required";
  }
  return error;
};

export default Validation;
