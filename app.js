var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// db kod
const Database = require('better-sqlite3');
const db = new Database('./db/freakyfashion.db', { 
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
           brand,
           sku,
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
