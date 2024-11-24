import { useState, useEffect } from "react";
import ReplyBtn from "../Buttons/ReplyBtn";
import VoteCounter from "../common/VoteCounter";
import EditBtn from "../Buttons/EditBtn";
import DeleteBtn from "../Buttons/DeleteBtn";
import UpdateBtn from "../Buttons/UpdateBtn";
import ReplySendBtn from "../Buttons/ReplySendBtn";
import CancelActionBtn from "../Buttons/CancelActionComment";
import DeleteModal from "../common/Modal/DeleteModal";
import LoadingModal from "../common/Modal/LoadingModal";
import api from "../../services/api";

import { formatRelativeTime } from "../../utils/dateConversion";

import { useComments } from "../../context/CommentsContext";

const Comment = ({
  commentId,
  avatarUser,
  dateAtCreated,
  user,
  content,
  voteCounter,
  replies = [],
  reply = false,
  replyForUser,
  replyId,
}) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [modeComment, setModeComment] = useState("");
  const [contentCommentBox, setContentCommentBox] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setShowLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState("");
  const [repliesState, setRepliesState] = useState(replies);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowLoadingModal = () => setShowLoading(true);
  const handleCloseLoadingModal = () => setShowLoading(false);

  const { updateComments } = useComments();

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUsername, setCurrentUserName] = useState();

  useEffect(() => {
    const handleCurrentUser = async () => {
      try {
        const response = await api.get("/users/juliusomo"); //to get other users, use their username
        if (response.status === 200) {
          setCurrentUser(response.data);
          setCurrentUserName(response.data.username);
        }
      } catch (error) {
        setTimeout(() => {
          console.error("Erro ao buscar usuario:", error);
        }, 10000);
      }
    };
    handleCurrentUser();
  }, []);

  useEffect(() => {
    setRepliesState(replies);
  }, [replies]);

  const handleEditCommentary = async (newContent) => {
    if(newContent.length <= 0) return;
    handleShowLoadingModal();
    setMessageLoading("Changing your comment...");
    try {
      const response = await api.put(`/comments/${commentId}`, {
        content: newContent,
      });

      if (response.status === 200) {
        console.log("Comment Updated!", response.data);
        await updateComments();
        handleCloseLoadingModal();
      } else {
        console.warn("Failed to update comment");
        handleCloseLoadingModal();
      }
    } catch (error) {
      console.error("Error editing comment", error);
      handleCloseLoadingModal();
    }
  };

  const handleEditReply = async (replyId, newContent) => {
    if(newContent.length <= 0) return;
    handleShowLoadingModal();
    setMessageLoading("Changing your comment...");
    try {
      const response = await api.put(
        `/comments/${commentId}/replies/${replyId}`,
        {
          content: newContent,
        }
      );

      if (response.status === 200) {
        console.log("Reply Updated!", response.data);
        await updateComments();
        handleCloseLoadingModal();
      } else {
        console.warn("Failed to update reply");
        handleCloseLoadingModal();
      }
    } catch (error) {
      console.error("Error editing reply", error);
      handleCloseLoadingModal();
    }
  };

  const handleNewReply = async (replyContent, parentReplyId = null) => {
    if(replyContent.length <= 0) return;
    handleShowLoadingModal();
    setMessageLoading("Creating new repply");
    try {
      const response = await api.post(`/comments/${commentId}`, {
        user: { username: currentUsername },
        score: 0,
        content: replyContent,
        parentReplyId,
      });

      if (response.status === 201) {
        console.log("Reply Created!", response.data);
        await updateComments();
        handleCloseLoadingModal();
      } else {
        console.warn("Failed to create reply", response);
        handleCloseLoadingModal();
      }
    } catch (error) {
      console.error("Error creating reply", error);
      handleCloseLoadingModal();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <DeleteModal
        showProp={showModal}
        closeProp={handleCloseModal}
        commentId={commentId}
        reply={reply}
        replyId={replyId}
      />
      <LoadingModal
        showModal={loading}
        closeModal={handleCloseLoadingModal}
        textModal={messageLoading}
      />
      <div className="bg-white flex max-sm:flex-col-reverse gap-4 p-4 rounded-lg min-w-[550px] max-sm:min-w-[85%]">
        <div className="flex items-center justify-between">
          <VoteCounter
            voteCounter={voteCounter}
            commentId={commentId}
            isReply={reply}
            replyId={replyId}
          />
          <div className="flex items-center gap-2 sm:hidden">
            {currentUsername === user ? (
              <div className="flex items-center gap-1">
                <DeleteBtn action={handleShowModal} />
                {modeComment !== "UPDATE" && (
                  <EditBtn
                    action={() => {
                      setModeComment("UPDATE");
                      setContentCommentBox(content);
                    }}
                  />
                )}
              </div>
            ) : (
              <ReplyBtn
                action={() => {
                  setShowCommentBox(true);
                  setModeComment("REPLY");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <img
                src={avatarUser}
                className="w-6 h-6"
                alt={`${user}-picture`}
              />
              <h1 className="text-neutral-dark-blue font-medium">{user}</h1>
              {currentUsername === user && (
                <h1 className="px-3 bg-primary-moderate-blue text-white text-xs rounded-sm">
                  you
                </h1>
              )}
              <span className="text-neutral-grayish-blue text-sm">
                {formatRelativeTime(dateAtCreated)}
              </span>
            </div>
            <div className="flex items-center gap-2 max-sm:hidden">
              {currentUsername === user ? (
                <div className="flex items-center gap-1">
                  <DeleteBtn action={handleShowModal} />
                  {modeComment !== "UPDATE" && (
                    <EditBtn
                      action={() => {
                        setModeComment("UPDATE");
                        setContentCommentBox(content);
                      }}
                    />
                  )}
                </div>
              ) : (
                <ReplyBtn
                  action={() => {
                    setShowCommentBox(true);
                    setModeComment("REPLY");
                  }}
                />
              )}
            </div>
          </div>

          {modeComment === "UPDATE" ? (
            <div className="flex flex-col gap-3">
              <textarea
                className="px-4 py-2 border text-sm text-neutral-dark-blue placeholder:font-light w-full rounded-lg resize-none focus:outline-primary-moderate-blue"
                placeholder="Change your comment..."
                rows={3}
                value={contentCommentBox}
                onChange={(e) => setContentCommentBox(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <UpdateBtn
                  action={async () => {
                    if (reply) {
                      await handleEditReply(replyId, contentCommentBox);
                    } else {
                      await handleEditCommentary(contentCommentBox);
                    }
                    setModeComment(null);
                  }}
                />
                <CancelActionBtn action={() => setModeComment(null)} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-neutral-grayish-blue max-w-[400px]">
              {reply && (
                <span className="text-primary-moderate-blue font-bold cursor-pointer">
                  @{replyForUser}
                </span>
              )}
              {""}
              {content}
            </p>
          )}
        </div>
      </div>
      {showCommentBox && (
        <div className="flex max-sm:flex-col justify-between gap-2 px-3 py-4 rounded-lg bg-white min-w-[600px] max-sm:min-w-[85%]">
          <div className="flex gap-4 w-full">
            {currentUser && (
              <img
                src={currentUser.image.webp}
                className="w-6 h-6"
                alt={`${currentUser}-picture`}
              />
            )}
            <textarea
              className="px-4 py-2 border text-sm text-neutral-dark-blue placeholder:font-light w-full rounded-lg  resize-none focus:outline-primary-moderate-blue"
              placeholder={`Reply to ${user} comment`}
              rows={3}
              value={contentCommentBox}
              onChange={(e) => setContentCommentBox(e.target.value)}
            />
          </div>
          <div className="flex items-center max-sm:justify-end sm:justify-center sm:flex-col gap-2 sm:min-h-[80px]">
            <ReplySendBtn
              action={async () => {
                await handleNewReply(contentCommentBox, replyId);
                setShowCommentBox(false);
              }}
              text={"REPLY"}
            />
            <CancelActionBtn action={() => setShowCommentBox(false)} />
          </div>
        </div>
      )}
      {repliesState.length > 0 && (
        <div className="ml-4 border-l pl-6 max-sm:pl-3 flex flex-col gap-1">
          {repliesState.map((reply) => (
            <Comment
              key={reply.id}
              commentId={commentId}
              avatarUser={reply.user?.image?.webp}
              user={reply.user?.username}
              dateAtCreated={reply.createdAt}
              content={reply.content}
              voteCounter={reply.score}
              replies={reply.nestedReplies}
              reply={true}
              replyForUser={user}
              replyId={reply.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
