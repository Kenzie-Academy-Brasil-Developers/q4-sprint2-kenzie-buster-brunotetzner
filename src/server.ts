import { app } from "./app";
import { AppDataSource } from "./data-source";

const port = 3000;
AppDataSource.initialize()
  .then(() => {
    console.log("Data source intialized");
    app.listen(port, () =>
      console.log(`App running!\nhttp://localhost:${port}/`)
    );
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
