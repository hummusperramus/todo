const express = require("express");
const router = express.Router();
const { db } = require("../db");

var days = [];
var categories = [];
var tasks = [];

updateData();

function updateData() {
  db.serialize(() => {
    db.all(
      `SELECT id_category, category FROM categories ORDER BY id_category ASC;`,
      (err, rows) => {
        if (err) {
          console.log(err);
          throw err;
        }
        categories = rows;
      }
    );

    db.all(`SELECT id_day, day FROM days ORDER BY id_day ASC;`, (err, rows) => {
      if (err) {
        console.log(err);
        throw err;
      }
      days = rows;
    });

    db.all(`SELECT * FROM tasks;`, (err, rows) => {
      if (err) {
        console.log(err);
        throw err;
      }
      tasks = rows;
    });
  });
}

router.get("/days", function (req, res) {
  res.json(days);
});

router.get("/categories", function (req, res) {
  res.json(categories);
});

router.get("/tasks", function (req, res) {
  res.json(tasks);
});

router.post("/tasks", (req, res) => {
  let days = req.body.days
    .map((el, i) => [el, i])
    .filter((el) => el[0])
    .map((el) => el[1]);
  let done = new Array(days.length).fill(false);
  days = JSON.stringify({ data: days });
  done = JSON.stringify({ data: done });

  db.run(
    "INSERT INTO tasks (task,days,description,done,category) VALUES (?, ?, ?, ?, ?)",
    [req.body.name, days, req.body.description, done, req.body.category],
    (err) => {
      if (err) {
        console.log(err);
        res.json({ result: "ERROR" });
        return;
      }
      db.all(
        "SELECT * FROM tasks WHERE task = ?",
        [req.body.name],
        function (err, rows) {
          if (err) {
            console.log(err);
            res.json({ result: "ERROR" });
          }
          updateData();
          res.json({ result: "OK", data: rows });
        }
      );
    }
  );
});

router.delete("/tasks", (req, res) => {
  let tasksList = "(" + req.body.tasks.map((el) => "?").join(",") + ")";
  db.run(
    "DELETE FROM tasks WHERE id_task IN " + tasksList,
    req.body.tasks,
    (err) => {
      if (err) {
        console.log(err);
        res.json({ result: "ERROR" });
        return;
      }
      updateData();
      res.json({ result: "OK" });
    }
  );
});

router.post("/categories", (req, res) => {
  db.run(
    "INSERT INTO categories (category) VALUES (?)",
    [req.body.category],
    (err) => {
      if (err) {
        console.log(err);
        res.json({ result: "ERROR" });
        return;
      }
      db.all(
        "SELECT * FROM categories WHERE category = ?",
        [req.body.category],
        function (err, rows) {
          if (err) {
            console.log(err);
            res.json({ result: "ERROR" });
          }
          updateData();
          res.json({ result: "OK", data: rows });
        }
      );
    }
  );
});

router.delete("/categories", (req, res) => {
  let categoriesList =
    "(" + req.body.categories.map((el) => "?").join(",") + ")";
  db.run(
    "DELETE FROM categories WHERE id_category IN " + categoriesList,
    req.body.categories,
    (err) => {
      if (err) {
        console.log(err);
        res.json({ result: "ERROR" });
        return;
      }
      updateData();
      res.json({ result: "OK" });
    }
  );
});

router.put("/tasks", (req, res) => {
  db.run(
    "UPDATE tasks SET done = ? WHERE id_task = ?",
    [req.body.done, req.body.task],
    (err) => {
      if (err) {
        console.log(err);
        res.json({ result: "ERROR" });
        return;
      }
      updateData();
      res.json({ result: "OK" });
    }
  );
});

module.exports = router;
