var express = require('express');
var path = require("path");
let planning=require('./models/planning.model')
var bodyParser = require('body-parser');
var Web3=require('web3')
var multer  = require('multer')
var mongoose = require('mongoose');
var config = require('./config/db');
var User = require('./models/user.model')
var cors = require('cors')
var Signup = require("./models/signup")
var fs = require('fs');
// global.__root   = __dirname + '/';
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ed9c627571c540d39a95770ce85f7534'));

mongoose.connect(config.db);

mongoose.connection.on('connected',()=> {
    console.log('Database is connected' + config.db);
})

mongoose.connection.on('error',(err)=>{
    console.error('Database error', + err); 
})



var app = express();
app.use(express.static(__dirname+'/uploads'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/signup',(req,res)=>{
  console.log(req.body)
  var a=req.body.username
  var b=req.body.password
  console.log(a,b)
  var mydata =new Signup({
    username:a,
    password:b
  });
  mydata.save().then(data=>{
       console.log("success");
  }).catch(err=>{
      console.log("Not inserted");
  })
 
   res.end()
 

  })
  app.get('/signupdetails',(req,res)=>{
    
    Signup.find()
    .then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        
        console.log(err);
        res.send(err);
    });
     res.end()
   
  
    })
  


app.get('/',(req,res)=>{
      res.send("hello world");
      web3.eth.getBlockNumber().then((res,err)=>{
          var user = new User();   
          user.lastupdated=res;   
              user.save((err,address)=>{
                  if(err)  {
                      console.log(err);
                  }else {
                      console.log(address);
                  }
              });
          })       
  })
app.get('/api',(req,res)=>{
    res.status(200).send('API works.');
})


var planningController = require('./controllers/planning.ctrl')
app.use('/api/planning',planningController);

var ServeyController = require('./controllers/planning.ctrl');
app.use('/api/servey',ServeyController);

var ImgController  = require('./controllers/planning.ctrl');
app.use('/api/img',ImgController)

//var signupuser = require('./controllers/planning.ctrl')
//app.use('/api/users',signupuser);

global.__basedir = __dirname;



// const multer = require('multer');
 
// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 	  cb(null, __basedir + '/uploads/')
// 	},
// 	filename: (req, file, cb) => {
// 	  cb(null, file.originalname)
// 	}
// });
 
// var upload = multer({storage: storage});




// app.use('/fileuploader', upload.single("file"), ctrlUser.fileuploader);

// app.use('/api');






//////////////////////////////////////////////

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads')));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage });



  app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
  });
/////////////////////////////////////////////////////////////////



//////////////////////////////////////////////

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads1')));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var storage1 = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './uploads1/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var upload1 = multer({ storage: storage1 });



  app.post("/upload1", upload1.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
  });
/////////////////////////////////////////////////////////////////








app.listen(port,() => console.log(`App listening on port ${port}!`))

var agenda = require('./agenda')
module.exports = app;