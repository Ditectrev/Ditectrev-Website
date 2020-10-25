/* Custom webpack server properties. */

const dotenv = require('dotenv-webpack');

module.exports = {
  // Define plugins.
  plugins: [
    new dotenv(), //* Handle environemntal variables on localhost, but on the Server-Side Rendering (SSR). There's no access to "process.env" on the browser.
  ],
};
