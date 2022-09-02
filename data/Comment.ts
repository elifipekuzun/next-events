import mongoose, { Document } from 'mongoose';

export type CommentProps = {
  username: string;
  userEmail: string;
  comment: string;
};

export interface IComment extends Document {
  eventId: string;
  comment: CommentProps;
}

const commentSchema = new mongoose.Schema<IComment>({
  eventId: {
    type: String,
  },
  comment: {},
});

export const Comment = mongoose.model<IComment>('Comment', commentSchema);
