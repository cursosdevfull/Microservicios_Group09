const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server
  .listen(19020)
  .on("listening", () => console.log("Server is running on port 19020"))
  .on("error", (error) => {
    console.log(error);
    process.exit(1);
  });
