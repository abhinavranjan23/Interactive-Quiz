import React, { useEffect, useRef, useState } from "react";
import LeftArrow from "../assets/left-arrow.png";
import RightIcon from "../assets/right-icon.png";
import Swal from "sweetalert2";
import Shimmer from "./Shimmer";
const TrendingQuizes = () => {
  const container = useRef(null);
  const [trendingQuizzes, setTrendingQuizzes] = useState(null);
  console.log(trendingQuizzes);
  const scrollLeft = () => {
    container.current.scrollLeft -= 500;
  };
  const scrollRight = () => {
    container.current.scrollLeft += 500;
  };
  useEffect(() => {
    if (trendingQuizzes) {
      return;
    }
    fetchTrendingQuizes();
  }, [trendingQuizzes]);
  const handleEditTrending = (id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it from Trending!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await removeTrending(id);
        if (res.ok) {
          Swal.fire({
            title: "Removed!",
            text: "Quiz has been removed from Trending.",
            icon: "success",
          });
        } else {
          const data = await res.json();
          Swal.fire({
            title: "Error!",
            text: data.error,
            icon: "error",
          });
        }
      }
    });
  };
  const removeTrending = async (id) => {
    console.log(id);
    try {
      const res = await fetch(
        `http://localhost:3000/admin/update/quizzes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isTrending: false }),
          credentials: "include",
        }
      );
      return res;
    } catch (err) {
      console.log("Something Went Wrong");
    }
  };

  const fetchTrendingQuizes = async () => {
    try {
      const res = await fetch("http://localhost:3000/quizzes/trending", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setTimeout(() => {
        setTrendingQuizzes(data.quizzes);
      }, 3000);
    } catch (err) {
      console.log("Failed to fetch");
    }
  };
  if (!trendingQuizzes) {
    return <Shimmer />;
  }
  return (
    <div className='ml-5 md:ml-10 group  '>
      <div className='flex justify-between items-center'>
        <h2 className='md:my-5 my-2.5 text-lg md:text-3xl font-serif dark:text-cyan-200 '>
          Trending Quizes
        </h2>
        <div className=' items-center gap-2 mr-5 hidden group-hover:flex group-hover:visible'>
          <button
            className='p-1.5 dark:bg-cyan-50 rounded-full dark:hover:bg-cyan-100 active:scale-95'
            onClick={scrollLeft}
          >
            <img src={LeftArrow} className=' w-4' alt='left' />
          </button>
          <button
            className='p-1.5 dark:bg-cyan-50 rounded-full dark:hover:bg-cyan-100 active:scale-95'
            onClick={scrollRight}
          >
            <img src={RightIcon} alt='right' className='w-4' />
          </button>
        </div>
      </div>
      <div
        className='flex flex-row gap-5 w-full overflow-x-scroll scrollbar-hide scroll-smooth py-4 '
        ref={container}
      >
        {trendingQuizzes &&
          trendingQuizzes.map((item, index) => {
            return (
              <div
                key={index}
                className='card bg-base-100 w-8/12 md:w-96 shadow-md flex-shrink-0 '
              >
                <figure>
                  <img
                    src={item.titleImage}
                    alt='Shoes'
                    className=' w-full h-24 md:w-96 md:h-56 object-cover'
                  />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title textarea-md md:text-lg'>
                    {item.title}
                    <div className='badge badge-secondary'>{` ${
                      item.isTrending ? "Trending" : ""
                    } `}</div>
                  </h2>
                  <div className='flex flex-col'>
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
                  <div className='card-actions justify-end'>
                    <button
                      className='badge badge-outline px-1.5 py-1 rounded-md bg-cyan-900 active:scale-95'
                      onClick={() => handleEditTrending(item._id)}
                    >
                      Not Trending
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TrendingQuizes;
