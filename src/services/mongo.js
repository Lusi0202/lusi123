const mongo = require("mongoose"); //ye mongo ke under jo bhi property h o hamko de dega

const MongoConnect =async () => {  //mongo.connect ek function h, data_base se connect krne ke liye
    console.log("TRY TO CONNECT WITH MONGODB");

  await  mongo.connect(process.env.MONGO_URL, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
    })
        .then((response) => {
            // console.log(response)
            console.log("done !!!")
            return true;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    console.log("Connection Establish!!!");
    return true;
};
module.exports={MongoConnect}