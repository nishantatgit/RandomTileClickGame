const path = require("path");
module.exports = {
  entry: {
    bundle: "./src"
  },
  output: {
    path: path.resolve(__dirname, "./public")
  }
};
