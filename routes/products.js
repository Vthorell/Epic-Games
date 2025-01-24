const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

const db = new Database('epic-games.db'); 

router.get('/', (req, res) => {
  const images = db.prepare('SELECT productimage FROM products LIMIT 3').all();
  res.render('index', { images });
});

module.exports = router;

   

