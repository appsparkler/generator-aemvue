
const { camelCase, titleCase } = require('change-case');
const filters = {
  camelCase: userInput => camelCase(userInput),
  titleCase: userInput => titleCase(userInput)
};

module.exports = filters
