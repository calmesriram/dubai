var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Signup = require("../models/signup")
var Planning  = require('../models/planning.model');

router.use(bodyParser.urlencoded({extended:true}));

router.post('/signup',(req,res)=>{
    console.log(req.body)
    Signup.create({
        username:req.body.username,
        password:req.body.password
    },
    (err,data)=>{
        if(err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(data);
    })
    res.end()
    // Planning.find({},(err,docs)=>{
    //     if(err) return res.status(500).send("There was a problem finding the plannings.");
    //     res.status(200).send(docs);
    // })
})



router.post('/planningRegister',(req,res)=>{
    Planning.create({
        // RecordId:req.body.RecordId,
        UniqueId:req.body.UniqueId,
        OwnerName:req.body.OwnerName,
        MobileNumber: req.body.MobileNumber,
        Email: req.body.Email,
        PinCode: req.body.PinCode,
        RecordCreationDate: req.body.RecordCreationDate,
        RecordCreationTime: req.body.RecordCreationTime,
        YourState: req.body.YourState,
        Gender: req.body.Gender,
        YourAvatar: req.body.YourAvatar,
        RelatedDocs: req.body.RelatedDocs,
        YourMessage: req.body.YourMessage
    },
    (err,docs)=>{
        if(err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(docs)
    })

})

router.get('/getAll',(req,res)=>{
    Planning.find({},(err,docs)=>{
        if(err) return res.status(500).send("There was a problem finding the plannings.");
        res.status(200).send(docs);
    })
})

router.get('/:id',(req,res)=>{
    Planning.findById(req.params.id,(err,doc)=>{
        if(err) return res.status(500).send("There was a problem finding the planning.");
        if(!doc) return res.status(404).send("No planning found");
        res.status(200).send(doc);
    })
})

router.put('/updatePlanning/:id',(req,res)=>{
    Planning.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,doc)=>{
        if(err) return res.status(500).send("There are a problem updating the planning");
        res.status(200).send(doc);
    })
})


//==** Routing for Survey**==

router.put('/updateServey/:id',(req,res)=>{
    var count=0;
    Object.keys(req.body).forEach(i=>{
        UpdateData(req.params.id,{[i]:req.body[i]}).then(x=>{            
            count++;
            if(Object.keys(req.body).length == count){
                Planning.findById({ _id:req.params.id},(err,data)=>{
                        res.status(200).send(data);   
                    })
            }
        })
    })
})

const multer = require('multer');
 
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/uploads/')
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname)
	}
});
 
var upload = multer({storage: storage});




router.post('/fileuploader', upload.single("file"), (req,res,next)=>{
    console.log("anugundu", req.files);
    
   
    let oldpath = __basedir+'/uploads/'+req.file.filename;
    // console.log("oldpath",oldpath);
        
        // console.log("new_path_file",new_path_file);
        Planning.find(function(err,records){  
            let newrecordid = records.length+1;
            let _newfilename = 'avatarimg'+newrecordid +'-' + Date.now() + path.extname(req.file.filename);
            let new_path_file = __basedir+'/uploads/'+ _newfilename;
            fs.rename(oldpath,new_path_file,(error,response)=>{
                if(error){
                    res.status(400).json(error);
                }
                else{
                    res.status(200).json({"newimagename":_newfilename});
                }
                
            });
        });

    });



function UpdateData(id,data) {
    return new Promise(function(resolve, reject) {
        Planning.findByIdAndUpdate( { _id:id} , { $set:data} ,(err,newdoc)=>{   
         if(newdoc){
             resolve(newdoc);
         }
         else{
             console.log('Error')
         }
        }).catch(e=>{
            console.log(e);
        });
    })

}



    // function readFile(filename, enc){
    //     return new Promise(function (fulfill, reject){
    //       fs.readFile(filename, enc, function (err, res){
    //         if (err) reject(err);
    //         else fulfill(res);
    //       });
    //     });
    //   }
module.exports = router;