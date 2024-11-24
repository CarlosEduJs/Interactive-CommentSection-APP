import CommentList from "./Comments/CommentList";

import AddCommentBox from "./Comments/AddCommentBox";

import api from "../services/api";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center  py-5 w-screen">
      <CommentList />
      <AddCommentBox action={() => console.log("sended!")} text={"SEND"} />
    </div>
  );
};

export default Main;
