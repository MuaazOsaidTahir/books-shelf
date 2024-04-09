import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://${process.env.MONGODB_NAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD ?? "")}@cluster0.csteog8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected!')).catch(err => {
    console.log(err.message);
  })