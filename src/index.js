const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const {handlebars} = require('express-handlebars');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');

const db = require('./config/db');

// Connect to DB

db.connect();

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Midderware để xử lý dữ liệu form data
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// xử lý dữ liệu từ code js lên (sử dụng XMLHttpRequest, fetch, axios, ...)
app.use(express.json());

// Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// console.log('PATH: ', path.join(__dirname, 'resources/views'))

// Route init
route(app);

// app.get('/', (req, res) => {
//   res.render('home');
// });

// app.get('/news', (req, res) => {
//   res.render('news');
// });

// app.get('/search', (req, res) => {
//   // console.log(req.query.q)
//   res.render('search');
// });

// app.post('/search', (req, res) => {
//   console.log(req.body)
//   res.send('');
// });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
