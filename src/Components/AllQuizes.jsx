import React, { useEffect, useState } from "react";

const AllQuizes = () => {
  const arr = new Array(30).fill(0);
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    fetchQuizes();
  }, []);

  const fetchQuizes = async () => {
    try {
      const res = await fetch("http://localhost:3000/quizzes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setQuizzes(data.quizzes);
    } catch (err) {
      console.log("Failed to fetch");
    }
  };
  return (
    <div className='w-full  '>
      <h2 className='my-5 text-3xl font-serif dark:text-cyan-200  ml-10 '>
        Explore Other Quizes
      </h2>
      <div className='flex flex-wrap gap-10 w-full justify-center  '>
        {quizzes &&
          quizzes.map((item, index) => {
            return (
              <div
                key={index}
                className='card bg-base-100 w-10/12 md:w-3/12  shadow-sm flex-shrink-0'
              >
                <figure>
                  <img
                    src={item.titleImage}
                    alt='Shoes'
                    className='h-56 object-cover w-full'
                  />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title md:text-lg '>{item.title}</h2>
                  <div className='flex flex-col'>
                    <p>{item.topic}</p>
                    <div className='flex flex-col md:flex-row'>
                      <p className='text-cyan-200'>
                        Total Question:{" "}
                        <span className='font-semibold text-purple-200'>
                          {item.questions.length}
                        </span>
                      </p>
                      <p className='text-cyan-200'>
                        Total Marks:{" "}
                        <span className='font-mono text-md text-purple-200 '>
                          {item.totalScore} marks
                        </span>
                      </p>
                    </div>
                    <p className='text-cyan-200'>
                      Duration:{" "}
                      <span className='font-semibold text-red-400 '>
                        {item.maxDuration} Sec
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllQuizes;
