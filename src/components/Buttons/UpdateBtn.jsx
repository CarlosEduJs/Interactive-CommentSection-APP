const UpdateBtn = ({ action }) => {
    return (
      <button
        onClick={action}
        className="bg-primary-moderate-blue text-white text-xs rounded-md px-4 py-2 max-w-[150px] ml-auto hover:opacity-40"
      >
        UPDATE
      </button>
    );
  };
  
  export default UpdateBtn;
  