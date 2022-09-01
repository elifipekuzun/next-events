import mongoose from 'mongoose';

const mongoUrl =
  'mongodb+srv://elifipek:588647elka@cluster0.bmoow.mongodb.net/nextDB?retryWrites=true&w=majority';

mongoose.connect(mongoUrl).catch((err) => console.log(err));
