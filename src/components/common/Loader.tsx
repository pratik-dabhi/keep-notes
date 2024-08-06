
const Loader = () => {
  
  return (
    <div className="fixed flex z-50 w-full bg-opacity-60 justify-center items-center bg-black h-screen">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-8 w-8 bg-white rounded-full animate-bounce" />
    </div>
  );
};

export default Loader;
