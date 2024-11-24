import replyIcon from "../../assets/images/icon-reply.svg"

const ReplyBtn = ({action}) => {
    return (
        <button onClick={action} className="flex items-center gap-2 transition-all hover:opacity-35">
            <img src={replyIcon}  />
            <h1 className="font-medium text-xs text-primary-moderate-blue">Reply</h1>
        </button>
    )
}

export default ReplyBtn