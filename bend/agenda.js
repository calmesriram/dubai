// var express = require('express');
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var app= express();
// var cors=require ("cors")
// var Web3=require('web3')
// //let modelsch=require('./modelschema.schema')
// let User=require('./models/user.model')
// let planning=require('./models/planning.model')
// var multer  = require('multer');
// var path = require("path");
// var fs = require('fs');
// var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ed9c627571c540d39a95770ce85f7534'));
// // var url ="mongodb+srv://test:test@cluster0-h7tsx.mongodb.net/"
// //var DBname = "onlinelandrecord"


// var mode=[
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_uint_details_array",
// 				"type": "uint256[5]"
// 			},
// 			{
// 				"name": "_owner_name",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_email",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_state",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_avatar_file",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_related_document_file",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_message",
// 				"type": "string"
// 			}
// 		],
// 		"name": "createNewRecord",
// 		"outputs": [
// 			{
// 				"name": "_isCreated",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_unique_record_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_newOwner",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_message",
// 				"type": "string"
// 			}
// 		],
// 		"name": "plannerUpdateExistingRecord",
// 		"outputs": [
// 			{
// 				"name": "_isUpdated",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_unique_record_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_geo_co_ordinates",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_land_area",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_picture",
// 				"type": "string"
// 			}
// 		],
// 		"name": "surveyerUpdateRecord",
// 		"outputs": [
// 			{
// 				"name": "isSurveyerUpdated",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "_uint_details",
// 				"type": "uint256[5]"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_owner_name",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_email",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_state",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_avatar_file",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_related_document_file",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_message",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_record_creater",
// 				"type": "address"
// 			}
// 		],
// 		"name": "recordCreationDetails",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "_unique_record_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_newOwner",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_message",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_planner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "planner_record_update",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "_unique_record_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_geo_co_ordinates",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_land_area",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_picture",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_surveyer",
// 				"type": "address"
// 			}
// 		],
// 		"name": "surveyer_update_record",
// 		"type": "event"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "show_last_record_id",
// 		"outputs": [
// 			{
// 				"name": "_record_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "_unique_record_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "show_record_details1",
// 		"outputs": [
// 			{
// 				"name": "_owner_name",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_mobile_number",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_email",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_pin_code",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_timestamp",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_state",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_gender",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "_unique_record_id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "show_record_details2",
// 		"outputs": [
// 			{
// 				"name": "_avatar_file",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_related_document_file",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_message",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_geo_co_ordinates",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_land_area",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_picture",
// 				"type": "string"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]

// let modesc = new web3.eth.Contract(mode,'0x302dc453a467ac69e54fe5640aa0746b709666f6',{
//     gasLimit: 3000000,
//  });

// // mongoose.connection.on('connected', function() {
// //     console.log('Connection to Mongo established.');
// //     // Hack the database back to the right one, because when using mongodb+srv as protocol.
// //     if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
// //         mongoose.connection.db = mongoose.connection.client.db(DBname);
// //     }
// // });

// // mongoose.connect(url, {dbName: DBname}, function(err, client) {
// //   if (err) {
// //      console.log("mongo error", err);
// //      return;
// //   }
// // });

// // mongoose.connect(url);
// app.use(bodyParser.json());
// app.use(cors())
// app.use(bodyParser.urlencoded({
//     extended:false
// }));


// app.get('/',(req,res)=>{
//     res.send("hello world");
//     web3.eth.getBlockNumber().then((res,err)=>{
//         var user = new User();   
//         user.lastupdated=res;   
//             user.save((err,address)=>{
//                 if(err)  {
//                     console.log(err);
//                 }else {
//                     console.log(address);
//                 }
//             });
//         })       
// })

// setInterval(()=>{
//     var currentblock;
//     var lastupdated;
//     var uesrid='5c768804493a3f442d2b9600';
//     web3.eth.getBlockNumber().then((res,err)=>{
// currentblock=res;
// console.log(currentblock);
//     User.find((err,address)=>{ 
//         if(err){
//         console.log(err);
//       }
//         else{
//             lastupdated=address[0].lastupdated;   
//         }
//     console.log('lasupdate'+lastupdated );
//     console.log('currentblock'+currentblock );
// if(currentblock!=lastupdated && lastupdated<currentblock)
// {
//     console.log('update')
//     modesc.getPastEvents('recordCreationDetails', {
//         fromBlock: lastupdated ,
//         toBlock: lastupdated 
//     }, (error, events) => {
//         events.find(data=>{ 
//             console.log(data['returnValues']);
  
// 	var newdata = new planning();
// 		newdata.UniqueId=data['returnValues'][0][0];
//         newdata.OwnerName=data['returnValues'][1];
//         newdata.MobileNumber=data['returnValues'][0][1];
//         newdata.Email=data['returnValues'][2];
//         newdata.PinCode=data['returnValues'][0][3];
//         newdata.RecordCreationDate='28/02/2019';
//         newdata.RecordCreationTime=data['returnValues'][0][4];
//         newdata.YourState=data['returnValues'][3];
//         newdata.Gender=data['returnValues'][0][2];
//         newdata.YourAvatar=data['returnValues'][4];
//         newdata.RelatedDocs=data['returnValues'][5];
//         newdata.YourMessage=data['returnValues'][6];
//         newdata.save((err,address) => {
//             if(err)  {
//                 console.log(err);
//             }else {
//                 console.log(address);
//             }
//         });
     
// })
//     })

// 	modesc.getPastEvents('planner_record_update', {
//         fromBlock: lastupdated ,
//         toBlock: lastupdated 
//     }, (error, events) => {
//         events.find(data=>{ 
//             console.log(data['returnValues']);
// 		var UniqueId=data['returnValues'][0];
//         var OwnerName=data['returnValues'][1];
//         var YourMessage=data['returnValues'][2];
//         planning.findOneAndUpdate({UniqueId:UniqueId}, {$set :{OwnerName:OwnerName,YourMessage:YourMessage}},(err,name)=> {
//             if(err)  {
//                 console.log(err);
//             }else {
//                 console.log(name);
//             }
//         });
     
// })
//     })

// 	modesc.getPastEvents('surveyer_update_record', {
//         fromBlock: lastupdated ,
//         toBlock: lastupdated 
//     }, (error, events) => {
//         events.find(data=>{ 
//             console.log(data['returnValues']);
  
// 		var UniqueId=data['returnValues'][0];
//         var GeoCoordinates=data['returnValues'][1];
//         var SurLandArea=data['returnValues'][2];
//         var SurPicture=data['returnValues'][3];
//         planning.findOneAndUpdate({UniqueId:UniqueId}, {$set :{GeoCoordinates:GeoCoordinates,SurLandArea:SurLandArea,SurPicture:SurPicture}},(err,name)=> {
//             if(err)  {
//                 console.log(err);
//             }else {
//                 console.log(name);
//             }
//         });
     
// })
//     })

//     User.findByIdAndUpdate(uesrid, {$set :{lastupdated:lastupdated+1}},(err,name)=>{
//         console.log(name);
        
//         if(err){
//         console.log(err);
        
//     }
//         else{
//             console.log(name);   
//         }
//     })
// }
// })
// })
// },5000)

// //////////////////////////////////////////////

// // specify the folder
// app.use(express.static(path.join(__dirname, 'uploads')));
// // headers and content type
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// var storage = multer.diskStorage({
//     // destination
//     destination: function (req, file, cb) {
//       cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
//   var upload = multer({ storage: storage });



//   app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
//     console.log('files', req.files);
//     res.send(req.files);
//   });
// /////////////////////////////////////////////////////////////////



// //////////////////////////////////////////////

// // specify the folder
// app.use(express.static(path.join(__dirname, 'uploads1')));
// // headers and content type
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// var storage1 = multer.diskStorage({
//     // destination
//     destination: function (req, file, cb) {
//       cb(null, './uploads1/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
//   var upload1 = multer({ storage: storage1 });



//   app.post("/upload1", upload1.array("uploads[]", 12), function (req, res) {
//     console.log('files', req.files);
//     res.send(req.files);
//   });
// /////////////////////////////////////////////////////////////////






// // app.listen(3000,()=>{
// //     console.log("connected");
    
// //   })