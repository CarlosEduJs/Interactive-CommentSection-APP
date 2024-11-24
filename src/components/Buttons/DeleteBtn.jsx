import DeleteIcon from "../../assets/images/icon-delete.svg";

const DeleteBtn = ({ action }) => {
  return (
    <button
      onClick={action}
      className="text-primary-soft-red text-xs rounded-md px-2 max-h-[30px] hover:opacity-40 flex items-center gap-1"
    >
      <img className="w-3 h-3" src={DeleteIcon} alt="delete icon" />
      <span>Delete</span>
    </button>
  );
};

export default DeleteBtn;
