const crypto = require("crypto");

const randomNumber = crypto.randomInt(1, 7);

console.log("Dice Rolled:", randomNumber);