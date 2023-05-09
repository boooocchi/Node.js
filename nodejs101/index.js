const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <h1>Hello Node!</h1>
    <a href="http://localhost:8000/read-message">read</a>
    <a href="http://localhost:8000/write-message">write</a>

    `);
  }
  if (req.url === "/read-message") {
    res.setHeader("Content-Type", "text/html");
    const textFilePath = path.join(__dirname, "text.html");
    fs.readFile(textFilePath, (err, content) => {
      // if (err.code === "ENOENT") {
      //   res.statusCode = 404;
      //   res.setHeader("Content-Type", "text/html");
      //   res.write(`
      //     <html>
      //     <body>

      //     <h1>Page not found!</h1>
      //     </body>
      //     </html>
      //   `);
      //   res.end();
      // } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf8");
      // }
    });
  }
  if (req.url === "/write-message" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    console.log("post");
    res.write(`
    <form method="post">
    <input type="text" name="message"></input><button type="submit" mthod="POST">submit</button>
    </form>
    `);
    res.end();
  }

  if (req.url === "/write-message" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    console.log(body);
    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const message = formData.get("message");
      let content = `<p>${message}</p>`;
      fs.writeFile("text.html", content, (err) => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

server.listen(8000);
