import React, { useState, useEffect, useContext } from 'react';
import styles from './comments.module.css';
import { CommentList } from './comment-list';
import { NewComment } from './new-comment';
import { Data } from '../../pages/api/events/[eventid]';
import { IComment } from '../../data/Comment';
import { NotificationContext, Props } from '../../store/notification-context';
import { Status } from '../ui/notification';

interface CommentsProps {
  eventId: string;
}

export const Comments: React.FC<CommentsProps> = ({ eventId }) => {
  const { showNofification } = useContext(NotificationContext) as Props;

  const [showComments, setShowComments] = useState(false);

  const [commentList, setCommentList] = useState<IComment[] | []>();

  const fetchComments = () => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data: Data) => {
        if (data.message !== 'Success!') {
          showNofification({
            title: 'Error',
            message: data.message,
            status: Status.error,
          });
          return;
        }
        setCommentList(data.comments);
      })
      .catch(console.log);
  };

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments(!showComments);
  };
  const addCommentHandler = async (comment: IComment['comment']) => {
    showNofification({
      title: 'Loading...',
      message: 'Comment is processing...',
      status: Status.pending,
    });
    fetch(`/api/events/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((res) => res.json())
      .then((data: Data) => {
        if (data.message !== 'Success!') {
          showNofification({
            title: 'Error',
            message: data.message,
            status: Status.error,
          });
        }
        setShowComments(false);
        showNofification({
          title: 'Success!',
          message: 'The comment is successfully added.',
          status: Status.success,
        });
      })
      .catch(console.log);
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {commentList && showComments && <CommentList comments={commentList} />}
    </section>
  );
};
