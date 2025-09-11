import mongoose from 'mongoose';
import config from 'config';    

//get the connection string
const db = config.get('mongoURI');

//function to connect to MongoDB
const connectDataBase = async () => {
    try { 
        await mongoose.connect(db);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error(error.message);

        //Exit process with failure
        process.exit(1);
    } 
};

export default connectDataBase;   