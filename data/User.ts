import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
  },
});

export const User = mongoose.model<IUser>('User', userSchema);
