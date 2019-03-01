var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlanningSchema = mongoose.Schema({
    
    UniqueId:{
        type: Number
    },
    OwnerName:{
        type: String,
        required: true
    },
    MobileNumber: {
        type: Number,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    PinCode:{
        type: String,
        required: true
    },
    RecordCreationDate:{
        type: String
    },
    RecordCreationTime:{
        type: String
    },
    YourState: {
        type: String
    },
    Gender:{
        type: Number,
        // enum:["Male","Female"]
    },
    YourAvatar:{
        type: String,
        //  data: Buffer, 
        //  contentType: String 
    },
    RelatedDocs:{
        type: String,
        // data: Buffer,
        // contentType: String 
    },
    YourMessage:{
        type: String
    },
    GeoCoordinates:{
        type: String,
        default: "null"
    },
    SurLandArea:{
        type: String,
        default: "null"
    },
    SurPicture:{
        type: String,
        default: "null"
    },
    // role:{
    //     type:String,
    //     required:true,
    //     default:"select_roll"
    // }
})

module.exports = mongoose.model('Planning', PlanningSchema);