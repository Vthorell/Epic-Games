var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// db kod
const Database = require('better-sqlite3');
const db = new Database('./db/epic-games.db', { 
  fileMustExist: true,
  verbose: console.log 
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productdetailRouter = require('./routes/product-detail')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product-detail', productdetailRouter);

// GET /admin/products
app.get("/admin/products/", function (req, res) {

  
  res.render('admin/products', 
  {
    title: "Administration",
  });
});

// GET /api/products
app.get('/api/products', (req, res) => {

  // Behöver en selekt sats
  const select = db.prepare(`
    SELECT id,
           productName,
           productDescription,
           productImage,
           rating,
           price,
           urlSlug
      FROM products
 `);

  // Kör SQL SELECT-kommandot/satsen
  const products = select.all();

  res.json(products);

});

// GET /admin/products/new
app.get("/admin/products/new", function (req, res) {
  
  res.render("admin/products/new", {
    title: "Administration",
  });
});

// POST  /admin/products/new/
app.post('/admin/products/new/', function (req, res) {

  // console.log( req.body );
  // 1 - Samla ihop informationen vi fick från frontend
  const products = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productImage: req.body.productImage,
    rating: req.body.rating,
    price: req.body.price,
    urlSlug: generateSlug(req.body.productName)
  };
  
  // 2 - Lagra informationen i databas
  const insert = db.prepare(`
    INSERT INTO products (
      productName,
      productDescription,
      productImage,
      rating,
      price,
      urlSlug  
    ) VALUES (
      @productName,
      @productDescription,
      @productImage,
      @rating,
      @price,
      @urlSlug  
    )
  `);
  
  // Kör SQL-kommandot/satsen - alltså skicka den till databasen
  insert.run(products);

  // 3 - Instruera webbläsaren att gå till product listan
  res.redirect('/admin/products');
});

// GET /products/:urlSlug
app.get('/products/:urlSlug', function (req, res) {
  
  // Plocka ut värdet av URL-segment nummer 2 (t.ex. /posts/1 - är
  // detta värdet "1")
  const urlSlug = req.params.urlSlug;

  const select = db.prepare(`
    SELECT id,
           productName,
           productDescription,
           productImage,
           rating,
           price
      FROM products
     WHERE urlSlug = ?
 `);

 const row = select.get(urlSlug)
  
  res.render('products/details', {
    title: row.productName,
    products: row
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

function generateSlug(title) {
  return title
      .toLowerCase()                   // Convert to lowercase
      .trim()                          // Remove leading/trailing whitespace
      .replace(/[^a-z0-9\s-]/g, '')    // Remove special characters
      .replace(/\s+/g, '-')            // Replace spaces with hyphens
      .replace(/-+/g, '-');            // Collapse multiple hyphens
}