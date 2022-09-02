import mongoose, { Document } from 'mongoose';
import { IUser } from '../../data/User';
import { NextApiRequest, NextApiResponse } from 'next';

const User = mongoose.model<IUser>('User');

export type Data = {
  message: string;
  user: { email: string } | undefined;
};

export const fetchUsers = async (): Promise<Document<IUser>[]> => {
  const users = await User.find();
  return users;
};

export const addUser = async (email: string): Promise<void | IUser> => {
  const user = await User.findOne({ email }).exec();
  if (user) {
    return user;
  }
  try {
    await User.create({ email });
  } catch (error) {
    console.log(error);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res
        .status(422)
        .json({ message: 'Invalid email address', user: undefined });
      return;
    }
    const user = await addUser(email);
    if (user) {
      res.status(201).json({ user, message: 'Success!' });
    } else {
      res.status(201).json({ user: { email }, message: 'Success!' });
    }
  }
};

export default handler;
