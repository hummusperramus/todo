const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "./db/todo.db",
  sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to Todo database.");
    db.run("PRAGMA foreign_keys = ON");
  }
);

//db.run('delete from tasks')

/*
db.serialize(() => {
    console.log("ASD")
    db.run("CREATE TABLE IF NOT EXISTS categories(id_category INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL UNIQUE)")
        .run("INSERT INTO categories (category) VALUES ('Workout'), ('Academic'), ('My dog')")
        .all(`SELECT id_category, category FROM categories;`, (err, rows) => {
            if (err){
                console.log(err)
              throw err;
            }
            console.log(rows);
          });

    db.run("CREATE TABLE IF NOT EXISTS days(id_day INTEGER PRIMARY KEY AUTOINCREMENT, day TEXT NOT NULL UNIQUE)")
            .run("INSERT INTO days (id_day, day) VALUES (0,'Sunday'), (1,'Monday'), (2,'Tuesday'), (3,'Wednesday'), (4,'Thursday'), (5,'Friday'), (6,'Saturday')")
            .all(`SELECT id_day, day FROM days;`, (err, rows) => {
                if (err){
                    console.log(err)
                throw err;
                }
                console.log(rows);
            });
})
*/

module.exports = { db };
