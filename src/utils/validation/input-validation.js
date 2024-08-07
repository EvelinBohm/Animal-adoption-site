export const validateEmail = (email) => {
  if (!email) {
    return "Email is required.";
  } else if (!email.includes("@")) {
    return "Email must contain @.";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return "Email format is invalid.";
  }
  return null;
};

export const validatePassword = (password) => {
  const validationRules = {
    upperCase: {
      pattern: /^(?=.*[A-Z])/,
      message: "At least one uppercase letter.",
    },
    lowerCase: {
      pattern: /(?=.*[a-z])/,
      message: "At least one lowercase letter.",
    },
    digit: {
      pattern: /(?=.*[0-9])/,
      message: "At least one digit.",
    },
    specialCharacter: {
      pattern: /(?=.*[!@#$%^&*])/,
      message: "At least one special character.",
    },
    minLength: {
      pattern: /.{8,}/,
      message: "At least 8 characters long.",
    },
  };

  for (const rule in validationRules) {
    if (!validationRules[rule].pattern.test(password)) {
      return validationRules[rule].message;
    }
  }

  return null;
};
