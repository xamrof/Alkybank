const { checkSchema } = require("express-validator");

const transactionSchemaPOST = checkSchema({
  amount: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isDecimal: true,
    errorMessage:
      "Enter valid transaction amount in a decimal number format (ej:1000.25)",
  },
  date: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isDate: { options: { strictMode: true } },
    errorMessage: "Enter valid Date in de YYYY/MM/DD format",
  },
  user: {
    isInt: {
      if: (value) => {
        return value !== undefined;
      },
    },
    errorMessage: "Enter Valid userID - Must provide an Integer ",
  },
  category: {
    isInt: {
      if: (value) => {
        return value !== undefined;
      },
    },
    errorMessage: "Enter Valid categoryID - Must provide an Integer",
  },
});

module.exports = transactionSchemaPOST;
