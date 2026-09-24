const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.write("<h1>Welcome to Home Page</h1>");
        res.end();
    }

    else if (req.url === "/about") {
        res.write("<h1>About Page</h1>");
        res.end();
    }

    else if (req.url === "/contact") {
        res.write("<h1>Contact Page</h1>");
        res.end();
    }

    else {
        res.write("<h1>404 Page Not Found</h1>");
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});