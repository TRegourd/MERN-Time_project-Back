const { v4: uuidv4 } = require("uuid");

function getRandomTeamCode() {
  let hexString = uuidv4();

  // remove decoration
  hexString = hexString.replace("-", "");

  let base64String = Buffer.from(hexString, "hex").toString("base64");

  return base64String;
}

module.exports = getRandomTeamCode;
