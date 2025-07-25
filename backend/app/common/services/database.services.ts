import mongoose from 'mongoose';
export const connectDB = (): Promise<boolean> => { 

  return new Promise((resolve, reject) => {
    const mongodbUri = process.env.MONGO_URI ?? '';

    if (mongodbUri === '') {
      return reject(new Error('MongoDB URI not found!'));
    }

    // Optional: you can set options like strictQuery here if needed
    mongoose.set('strictQuery', false);

    mongoose
      .connect(mongodbUri)
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        resolve(true);
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        reject(error);
      });
  });
};


