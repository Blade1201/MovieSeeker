import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

import "../../../styles/comments.css"
import {Link} from "react-router-dom";

const Comments = ({currentUserId, currentImdbId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const [loading, setLoading]= useState(true);
  const [flag, setFlag] = useState(true);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text, parentId) => {
    createCommentApi(text, currentImdbId, parentId).then(() => {
      setActiveComment(false);
      setFlag(!flag);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      setActiveComment(null);
      setFlag(!flag);
    });
  };

  const deleteComment = (id) => {
    if (window.confirm("Biztos benne, hogy törölni akarja ezt a hozzászólást?")) {
      deleteCommentApi(id).then(() => {
        setFlag(!flag);
      });
    }
  };

  useEffect(() => {
    getCommentsApi(currentImdbId).then((data) => {
      setLoading(false);
      setBackendComments(data);
    });
  }, [flag, currentImdbId]);


  return (
      loading ?
          null
          :
          <div className="comments">
            <h3 className="comments-title">Hozzászólások</h3>
            <div className="comment-form-title">Szóljon hozzá!</div>
            {
              currentUserId ?
                <CommentForm submitLabel="Küldés" handleSubmit={addComment}/>
                :
                <Link to="/authentication">A hozzászóláshoz jelentkezzen be!</Link>
            }
            <div className="comments-container">
              {rootComments.map((rootComment) => (
                  <Comment
                      key={rootComment.id}
                      comment={rootComment}
                      replies={getReplies(rootComment.id)}
                      activeComment={activeComment}
                      setActiveComment={setActiveComment}
                      addComment={addComment}
                      deleteComment={deleteComment}
                      updateComment={updateComment}
                      currentUserId={currentUserId}
                  />
              ))}
            </div>
          </div>
  );
};

export default Comments;
