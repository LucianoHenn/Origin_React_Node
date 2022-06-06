import app from "./app";

require("./utils/database");

const main = () => {
  app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}`);
};

main();
