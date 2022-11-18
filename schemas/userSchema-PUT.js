const { checkSchema } = require("express-validator");

const userSchemaPUT = checkSchema({
  id: {
    in: ["params"],
    isInt: true,
    errorMessage: "Enter an Interger number for ID",
  },
  firstName: {
    isAlpha: {
      if: (value) => {
        return value !== undefined;
      },
    },
    errorMessage: "Enter valid first Name",
  },
  lastName: {
    isAlpha: {
      if: (value) => {
        return value !== undefined;
      },
    },
    errorMessage: "Enter valid last Name",
  },
  email: {
    isEmail: {
      if: (value) => {
        return value !== undefined;
      },
    },
    errorMessage: "Enter valid email address",
  },
  password: {
    isAlphanumeric: {
      if: (value) => {
        return value !== undefined;
      },
    },
    errorMessage: "Enter valid Alphanumeric password ",
  },
});

module.exports = userSchemaPUT;
