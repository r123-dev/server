const mongoose=require('mongoose');
const URI="mongodb+srv://rohanmourya879:vivek123@cluster0.upxigtg.mongodb.net/Vivek";


const connectdb=async ()=>{
    try {
         mongoose.connect(URI);
        console.log("connection successful")
    } catch (error) {
        console.log("database connection error");
        process.exit(0);
    }
}

module.exports=connectdb;