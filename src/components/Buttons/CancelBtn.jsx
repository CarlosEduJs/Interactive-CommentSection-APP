const CancelBtn = ({ action }) => {
  return (
    <button
      onClick={action}
      className="bg-neutral-grayish-blue text-white text-sm py-2 px-3 rounded-lg "
    >
      NO, CANCEL
    </button>
  );
};

export default CancelBtn;
