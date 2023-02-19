const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
// const {handlebars} = require('express-handlebars');
const { engine } = require('express-handlebars');

const SortMiddleware = require('./app/middleware/SortMiddleware');

const app = express();
const port = 3000;

app.use(methodOverride('_method'));

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

// Custom Middleware
app.use(SortMiddleware);

// Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        };

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
          <span class="${icon}"></span>
        </a>`;
      },
    },
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
