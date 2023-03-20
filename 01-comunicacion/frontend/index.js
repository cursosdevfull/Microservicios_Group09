const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server
  .listen(19010)
  .on("listening", () => console.log("Server is running on port 19010"))
  .on("error", (error) => {
    console.log(error);
    process.exit(1);
  });
