const operation = process.argv[2];

const a = Number(process.argv[3]);
const b = Number(process.argv[4]);

if (operation === "add") {
    console.log(a + b);
}

else if (operation === "sub") {
    console.log(a - b);
}

else if (operation === "mul") {
    console.log(a * b);
}

else if (operation === "div") {
    console.log(a / b);
}

else {
    console.log("Invalid Operation");
}