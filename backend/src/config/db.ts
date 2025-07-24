import mongoose from 'mongoose';

console.log('MONGO_URI:', process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '', {
      // useNewUrlParser: true, useUnifiedTopology: true, // not needed in mongoose 6+
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 