const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3'); 

const db = new Database('./db/epic-games.db', { fileMustExist: true });

router.get('/', (req, res) => {
  const images = db.prepare('SELECT productImage FROM products LIMIT 3').all();

  res.render('index', { title: 'Epic Games Store', images });
});

module.exports = router;
