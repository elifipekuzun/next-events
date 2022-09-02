import React, { FormEvent, useRef, useState, useContext } from 'react';
import styles from './new-comment.module.css';
import { IComment } from '../../data/Comment';
import { NotificationContext, Props } from '../../store/notification-context';
import { Status } from '../ui/notification';

interface NewCommentProps {
  onAddComment(comment: IComment['comment']): any;
}

export const NewComment: React.FC<NewCommentProps> = ({ onAddComment }) => {
  const { showNofification } = useContext(NotificationContext) as Props;

  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const sendCommentHandler = (event: FormEvent): void => {
    event.preventDefault();

    const email = emailInputRef.current && emailInputRef.current.value;
    const name = nameInputRef.current && nameInputRef.current.value;
    const comment = commentInputRef.current && commentInputRef.current.value;

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !comment ||
      comment.trim() === ''
    ) {
      showNofification({
        title: 'Error',
        message: 'Please enter a valid email address and comment!',
        status: Status.error,
      });
      return;
    }

    onAddComment({ userEmail: email, username: name, comment });
  };

  return (
    <form className={styles.form} onSubmit={sendCommentHandler}>
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
