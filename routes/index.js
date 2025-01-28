const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

const db = new Database('./db/epic-games.db', { fileMustExist: true });

router.get('/', (req, res) => {
  // Hämta totalt minst 10 bilder från databasen
  const allImages = db.prepare('SELECT productImage FROM products LIMIT 26').all();

  // Dela upp bilderna i grupper om 3, 5 och 2
  const group1 = allImages.slice(0, 3); 
  const group2 = allImages.slice(3, 8); 
  const group3 = allImages.slice(8, 11); 
  const group4 = allImages.slice(11, 16);
  const group5 = allImages.slice(16, 18);
  const group6 = allImages.slice(18, 23);
  const group7 = allImages.slice(23, 26);

  res.render('index', {
    title: 'Epic Games Store',
    group1,
    group2,
    group3,
    group4,
    group5,
    group6,
    group7,
  });
});

module.exports = router;

