const mongooose = require('mongoose');

const postSchema = new mongooose.Schema({
    tittle : {
        type : String ,
        required : true, 
        unique : true
    },
    dosc : {
        type : String , 
        required : true ,
    },
    photo : {
        type : String , 
        required : false
    },
    username : {
        type : String ,
        required : true 
    },
    categories : {
        type : Array ,
        required : false 
    }
} , 
    {timestamps : true }
)

module.exports = mongooose.model('Post' , postSchema);