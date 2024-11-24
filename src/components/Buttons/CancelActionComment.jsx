const CancelActionBtn = ({ action }) => {
    return (
      <button
        onClick={action}
        className="bg-neutral-grayish-blue text-white text-xs py-2 px-3 hover:opacity-60 rounded-md"
      >
        CANCEL
      </button>
    );
  };
  
  export default CancelActionBtn;
  