const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

const db = new Database('./db/epic-games.db', { fileMustExist: true });

router.get('/', (req, res) => {
  // Hämta totalt minst 10 bilder från databasen
  const allImages = db.prepare('SELECT productImage FROM products LIMIT 10').all();

  // Dela upp bilderna i grupper om 3, 5 och 2
  const group1 = allImages.slice(0, 3); // 3 bilder
  const group2 = allImages.slice(3, 8); // 5 bilder
  const group3 = allImages.slice(8, 10); // 2 bilder

  // Skicka grupperna till EJS
  res.render('index', {
    title: 'Epic Games Store',
    group1,
    group2,
    group3,
  });
});

module.exports = router;

