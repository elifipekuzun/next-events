import React from 'react';
import styles from './comment-list.module.css';
import { IComment } from '../../data/Comment';

type Props = {
  comments: IComment[];
};

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <ul className={styles.comments}>
      {comments &&
        comments.map((comment) => {
          return (
            <li key={comment._id}>
              <p>{comment.comment.comment}</p>
              <div>
                By <address>{comment.comment.username}</address>
              </div>
            </li>
          );
        })}
    </ul>
  );
};
