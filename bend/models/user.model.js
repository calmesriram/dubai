var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var userSchema=new Schema(
    {
     
        lastupdated:'number'

    }
)
module.exports=mongoose.model('User',userSchema)