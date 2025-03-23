const Shimmer = () => {
  return (
    <div>
      <h1 className='md:my-5 my-2.5 text-lg md:text-3xl font-serif dark:text-cyan-200'>
        Trending Quizzes
      </h1>

      <div className='flex flex-row overflow-x-hidden gap-1 p-4'>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className='w-[300px] h-[200px] bg-gray-800 rounded-lg overflow-hidden relative shadow-lg shrink-0'
          >
            {/* Shimmer Effect */}
            <div className='absolute inset-0 bg-gray-700 animate-pulse' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
