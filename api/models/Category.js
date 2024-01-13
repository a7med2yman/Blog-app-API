const mongooose = require('mongoose');

const categorySchema = new mongooose.Schema({
    name : {
        type : String ,
        required : true
    }
} , 
    {timestamps : true }
)

module.exports = mongooose.model('Category' , categorySchema);