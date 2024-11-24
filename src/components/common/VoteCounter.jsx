import { useState } from "react";
import plusIcon from "../../assets/images/icon-plus.svg";
import minusIcon from "../../assets/images/icon-minus.svg";

import api from "../../services/api";

const VoteCounter = ({ voteCounter, isReply, commentId, replyId }) => {
  const [count, setCount] = useState(voteCounter);
  const [userUpVotes, setUserUpVotes] = useState(0);
  const [hasDownVoted, setHasDownVoted] = useState(false);

  const updateVoteOnServer = async (newCount) => {
    try {
      if (isReply) {
        await api.put(`/comments/${commentId}/replies/${replyId}`, {
          score: newCount,
        });
      } else {
        await api.put(`/comments/${commentId}`, {
          score: newCount,
        });
      }
      console.log("Vote updated on server!");
    } catch (error) {
      console.error("Error updating vote on server:", error);
    }
  };

  const handleVote = async (type) => {
    let newCount = count;

    if (type === "up") {
      if (hasDownVoted) {
        newCount += 1;
        setHasDownVoted(false);
      } else {
        newCount += 1;
        setUserUpVotes(userUpVotes + 1);
      }
    } else if (type === "down") {
      if (hasDownVoted) return;
      if (userUpVotes > 0) {
        newCount -= 1;
        setUserUpVotes(userUpVotes - 1);
      } else {
        newCount -= 1;
        setHasDownVoted(true);
      }
    }

    setCount(newCount);
    await updateVoteOnServer(newCount); 
  };

  return (
    <div className="flex flex-col max-sm:flex-row max-sm:w-[100px] max-sm:h-fit items-center justify-between h-[80px] w-[30px] rounded-md bg-neutral-light-gray px-2 py-2">
      <img
        className="w-3 h-3 cursor-pointer transition-all hover:brightness-50"
        src={plusIcon}
        onClick={() => handleVote("up")}
        alt="add vote"
      />
      <h1 className="text-sm font-medium text-primary-moderate-blue">
        {count}
      </h1>
      <img
        className="w-3 cursor-pointer transition-all hover:brightness-50"
        src={minusIcon}
        onClick={() => handleVote("down")}
        alt="remove vote"
      />
    </div>
  );
};

export default VoteCounter;
