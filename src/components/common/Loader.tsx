const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <span className="sr-only">Loading...</span>
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-yellow-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-600 animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
