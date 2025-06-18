const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const todo = require("./routes/todo");
const compression = require("compression");
const helmet = require("helmet");

app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api", todo);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
