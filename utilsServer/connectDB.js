const mongoose = rquire('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlparse: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("mongoDb connected");
    } catch (error) {
        console.log(error);
        process.exist(1);
        
    }
}

module.exports = connectDB;