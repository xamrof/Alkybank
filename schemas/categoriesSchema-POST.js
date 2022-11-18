const { checkSchema } = require("express-validator");

const categoriesSchemaPOST = checkSchema({
  name: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    errorMessage: "Enter valid category name",
  },
  description: {
    isString: {
      if: (value) => {
        return value !== undefined;
      },
    },
    errorMessage: "Enter valid description ",
  },
});

module.exports = categoriesSchemaPOST;
