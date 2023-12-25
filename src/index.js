const express=require("express"); //require ye karega ki express ke under jo value rahega usko layegarequire('dotenv').config();
const dot =require('dotenv')
const morgan =require('morgan')
const fs=require('fs')
const path=require('path')
const Mongo=require('./services/mongo')
//const {error} = require('console')
const {users}=require("./model/userModel");
//const { create } = require("domain")
const{CreateUser,FindUser,FindUserById,}=require("./controller/userController")
dot.config();
const joi=require('joi')
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const  accessLogStream =fs.createWriteStream(
     path.join(__dirname, 'access.log'),
     {flags:"a"});


app.use(morgan('combined',{stream:accessLogStream}))  //morgan used to store log

app.get('/getUsers', async(req,res)=>{
    try{  //ye dependent nahi h jaise then and catch depend h
        // const data= await users.create(req.body);
        const data =await FindUser();
             res.status(500).send({massage:data,status:true});
         }catch(e){
            res.status(500).send({massage: e ,status:true});
            console.log(error)
        }
        
})
app.get('/getUsersById/:id', async(req,res)=>{
    try{  //ye dependent nahi h jaise then and catch depend h
        // const data= await users.create(req.body);
        console.log(req.params.id);
        const data =await FindUserById(req.params.id);
             res.status(500).send({massage:data,status:true});
         }catch(e){
            res.status(500).send({massage: e ,status:true});
        }
        
})
app.all('/',( req ,res)=>{
    res.status(200).send({massage:"SERVER IS LIVE !!!",status:true})  //all sare method pe execute karege chahe get ho ya post ya or kuchh ho
})

app.get('/home',(req,res)=>{
    res.status(500).send({massage:"WELCOME TO THE PROJECT !!!",status:true})
})

app.post("/create",async(req,res)=>{
    console.log(req.body)
   
    try{
        const schema = joi.object({
        email:joi.string().email().required(),
        name:joi.string().min(2),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        age:joi.number().max(99).min(10),
        });    
   const validatedData =await schema.validateAsync(req.body);
            console.log(validatedData);
        const data=await CreateUser(req.body)
            console.log("data here",data)
            res.status(200).send({massage:data ,status:true});
    }catch(e){
            res.status(200).send({massage:e,status:false});
            console.log(e)
          
    }
    
});


app.all('*',(req,res)=>{
    res.status(484).send({massage:"YOU ARE ON WRONG PATH",status:false})
})   //* agr valid location nahi dalege tabhi chalega and isko sabse niche lagana chahiye

Mongo.MongoConnect()
    .then(()=>{
app.listen(process.env.PORT,()=>{   //ye tabhi chalega jb then true return karega
    console.log(`Server is Running on PORT http://127.0.0.1:${process.env.PORT}`)
    
});
}).catch((error)=>{
    console.log("we are getting error",error)})