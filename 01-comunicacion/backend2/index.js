const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT_BACKEND2 || 19030;

server
  .listen(PORT)
  .on("listening", () => console.log(`Server is running on port ${PORT}`))
  .on("error", (error) => {
    console.log(error);
    process.exit(1);
  });
