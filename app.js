// require('dotenv').config();
// const express = require('express');
// const expressLayout = require('express-ejs-layouts');
// const methodOverride = require('method-override');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const bcrypt = require('bcrypt');
// const jwd = require('jsonwebtoken');


// const connectDB = require('./server/config/db');
// const { isActiveRoute } = require('./server/helpers/routeHelpers');


// const app = express();
// const port = 3000 || process.env.PORT;

// //connect to db
// connectDB();

// app.use(express.urlencoded({extended : true}));
// app.use(express.json());
// app.use(cookieParser());
// app.use(methodOverride('_method'));

// app.use(session({
//     secret : 'keyboard cat',
//     resave : false,
//     saveUninitialized : true,
//     store : MongoStore.create({
//         mongoUrl : process.env.MONGODB_URI
//     }),

// }));

// app.use(express.static('public'));

// //templating engine 
// app.use(expressLayout);
// app.set('layout','./layouts/main');
// app.set('view engine','ejs');

// app.locals.isActiveRoute = isActiveRoute;
// app.use('/', require('./server/routes/main'));
// app.use('/', require('./server/routes/admin'));



// app.listen(port, () => {
//     console.log(`application started on port ${port}`);

// })
require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Fixed typo from "jwd" to "jwt"

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const port = process.env.PORT || 3000; // Fixed port assignment

// Connect to the database
connectDB().then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));

app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Application started on port ${port}`);
});
