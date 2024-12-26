const serverless = require("serverless-http");
const app = require("./src/index"); // Require the Express app

module.exports = serverless(app); // Wrap the app in serverless-http
