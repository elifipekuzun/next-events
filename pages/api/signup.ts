import '../../data/db';
import { Document } from 'mongoose';
import { User, IUser } from '../../data/User';
import { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  message: string;
  user: { email: string } | undefined;
};

export const fetchUsers = async (): Promise<Document<IUser>[]> => {
  const users = await User.find();
  return users;
};

export const addUser = async (email: string): Promise<void> => {
  const user = await User.findOne({ email }).exec();
  if (user) {
    return;
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
    await addUser(email);
    res.status(201).json({ user: { email }, message: 'Success!' });
  }
};

export default handler;
