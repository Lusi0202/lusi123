//schema means structure
const {schema , model, Schema} =require("mongoose")
const {generate}=require('shortid')

const schema1 = new Schema({
    uid:{
        type:String,
        unique:true,
        default:generate,
        index:true  //it is use to find something using indexing with the help of uid
    },
    name:{
        type:String,
        unique:false,
        require:true  //when it is use ,when that thing for you is require
    },
    email:{
        type:String,
        unique:true,
        index:true,
        require:true
    },
    password:{
        type:String,
        unique:false,
        require:true  //if you dont use require then default value it taken false
    },
    age:{
        type:Number,
    }
})
const users=model("users",schema1)  //model ka name is user
module.exports={users}