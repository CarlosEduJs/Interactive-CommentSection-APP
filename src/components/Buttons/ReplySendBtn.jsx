const ReplySendBtn = ({ action, text }) => {
  return (
    <button
      onClick={action}
      className="bg-primary-moderate-blue text-white text-xs rounded-md px-4 py-2 hover:opacity-40"
    >
      {text}
    </button>
  );
};

export default ReplySendBtn;
