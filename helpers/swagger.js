const swaggerJSDoc = require("swagger-jsdoc");
const path = require('path')

// metadata info about API

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Alkemy Bank",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-access-token"
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

// DOCS in JSON format

const swaggerSetup = swaggerJSDoc(options);

// function to setup our docs

module.exports = { swaggerSetup };
