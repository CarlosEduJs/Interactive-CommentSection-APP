import EditIcon from "../../assets/images/icon-edit.svg";

const EditBtn = ({ action }) => {
  return (
    <button
      onClick={action}
      className="text-primary-moderate-blue text-xs rounded-md px-2 max-h-[30px] hover:opacity-40 flex items-center gap-1"
    >
      <img className="w-3 h-3" src={EditIcon} alt="edit icon" />
      <span>Edit</span>
    </button>
  );
};

export default EditBtn;
