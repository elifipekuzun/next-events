import '../../../data/db';
import mongoose from 'mongoose';
import { IComment } from '../../../data/Comment';

const Comment = mongoose.model<IComment>('Comment');

import { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  message: string;
  comments: undefined | IComment[];
};

export const fetchComments = async (eventId: string): Promise<IComment[]> => {
  const commentsData: IComment[] = await Comment.find({ eventId });
  return commentsData;
};

export const addComment = async (
  eventId: string,
  comment: IComment['comment']
): Promise<void> => {
  const newcomment = new Comment({
    eventId,
    comment: {
      username: comment.username,
      userEmail: comment.userEmail,
      comment: comment.comment,
    },
  });

  await newcomment.save();
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const eventId = req.query.eventid as string;
  if (!eventId) {
    res.status(500).json({
      message: 'Failed commeting to invalid event!',
      comments: undefined,
    });
    return;
  }

  if (req.method === 'POST') {
    const { comment } = req.body as IComment;

    if (
      !comment.comment.length ||
      !comment.userEmail.length ||
      !comment.username.length
    ) {
      res
        .status(402)
        .json({ message: 'Please fill all the fields!', comments: undefined });
      return;
    }
    try {
      await addComment(eventId, comment);
      res.status(201).json({ message: 'Success!', comments: undefined });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Inserting comment is failed!', comments: undefined });
      return;
    }
  }
  if (req.method === 'GET') {
    try {
      const comments = await fetchComments(eventId);

      res.status(201).json({ message: 'Success!', comments });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Fetching comments is failed', comments: undefined });
      return;
    }
  }
};

export default handler;
