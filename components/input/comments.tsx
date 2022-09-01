import React, { useState, useEffect } from 'react';
import styles from './comments.module.css';
import { CommentList } from './comment-list';
import { NewComment } from './new-comment';
import { Data } from '../../pages/api/events/[eventid]';
import { IComment } from '../../data/Comment';

interface CommentsProps {
  eventId: string;
}

export const Comments: React.FC<CommentsProps> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);

  const [commentList, setCommentList] = useState<IComment[] | []>();
  const [stateMessage, setStateMessage] = useState<string>();

  const fetchComments = () => {
    setStateMessage('Loading');
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data: Data) => {
        if (data.message !== 'Success!') {
          return;
        }
        setCommentList(data.comments);
        setStateMessage(undefined);
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
    fetch(`/api/events/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((res) => res.json())
      .then((data: Data) => {
        setShowComments(false);
      })
      .catch(console.log);
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {stateMessage && <h2>{stateMessage}...</h2>}
      {commentList && showComments && <CommentList comments={commentList} />}
    </section>
  );
};
