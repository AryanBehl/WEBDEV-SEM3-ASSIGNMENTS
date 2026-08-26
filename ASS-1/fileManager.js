const fs = require("fs");

// Create File:-

fs.writeFile("test.txt", "Hello World", (err) => {
    if (err) console.log(err);
    else console.log("File Created");
});


// Read File:-

fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});


// Update File:-

fs.appendFile("test.txt", "\nWelcome to Node.js", (err) => {
    if (err) console.log(err);
    else console.log("File Updated");
});


// Delete File:-

fs.unlink("test.txt", (err) => {
    if (err) console.log(err);
    else console.log("File Deleted");
});