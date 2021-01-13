const express = require('express')
const app = express()
const port = 80
const formcontroller = require('./controllers/formController')
const updateController = require('./controllers/updateController')
const statusController = require('./controllers/statusController')
const siteUserSignupdata = require('./controllers/userController')
const userLoginController = require('./controllers/userlogincontroller')
const userLogoutController = require('./controllers/userLogoutController')
const officerLoginController = require('./controllers/officerLoginController')
const officerSignupController = require('./controllers/officerSignupController')
const adminLoginController = require('./controllers/adminLoginController')
const contactController = require('./controllers/contactcontroller')
const bodyParser = require('body-parser')
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views','./views');

app.use(cookieParser());

// STORING SESSIONS IN MONGODB
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1/my_database',
    collection: 'mySessions'
  });

  store.on('error', function(error) {
    console.log(error);
  });

app.use(session ({
    secret: 'This is a secret',
    store: store,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//Using Body parser
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

//Setting View Engine
app.set('view engine', 'pug')

//Mongoose Code
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, autoIndex: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});



//For Static Folder
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
  res.render('index.pug')
})
app.get('/userlogin', (req, res) => {
  if(req.session.user){
    return res.redirect('/user')
}
  res.render('userlogin.pug')
})

app.post('/userlogin', userLoginController);

app.get('/user', (req, res) => {
  if(!req.session.user){
    console.log("Not a User")
    return res.status(401).redirect('/userlogin')
  }
  const Name = req.session.user.Name;
  res.render('user.pug',{Name: Name})
})

app.post('/user', formcontroller.userForm);

app.get('/officerlogin', (req, res) => {
  res.render('officerlogin.pug')
})

app.post('/officerlogin', officerLoginController);

app.get('/status', (req, res) => {
  res.render('status.pug')
})
app.get('/officer', formcontroller.officerData);


app.get('/signup', (req, res) => {
  res.render('siteUserSignup.pug')
})
app.post('/signup', siteUserSignupdata);

app.get('/confirm/:aadhar', updateController);

app.post('/status', statusController );

app.get('/logout', userLogoutController )

app.get('/admin', (req,res) => res.render('admin.pug'))

app.post('/admin', adminLoginController )

app.get('/admindashboard', (req,res) => res.render('admindashboard.pug') )

app.post('/admindashboard', officerSignupController )

app.get('/contact', (req,res) => res.render('contact.pug'));

app.post('/contact',contactController  );



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

