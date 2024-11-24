const LoadingModal = ({ showModal, closeModal, textModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };
  if (!showModal) return null;
  return (
    <div className="flex justify-center items-center bg-black/25 fixed left-0 top-0 w-full h-full z-30">
      <div className="flex flex-col justify-center gap-5 bg-white rounded-md p-5 min-w-[280px]">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent m-auto rounded-full animate-spin"></div>
        <h1 className="font-normal text-sm text-neutral-grayish-blue text-center">{textModal}</h1>
      </div>
    </div>
  );
};

export default LoadingModal;
