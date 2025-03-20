import React from "react";

const AllQuizes = () => {
  const arr = new Array(30).fill(0);
  return (
    <div className='w-full  '>
      <h2 className='my-5 text-3xl font-serif dark:text-cyan-200  ml-10 '>
        Explore Other Quizes
      </h2>
      <div className='flex flex-wrap gap-5 w-full justify-center  '>
        {arr.map((item, index) => {
          return (
            <div
              key={index}
              className='card bg-base-100 w-2/12 shadow-sm flex-shrink-0'
            >
              <figure>
                <img
                  src='https://d1ymz67w5raq8g.cloudfront.net/Pictures/2000xAny/6/5/5/509655_shutterstock_1506580442_769367.jpg'
                  alt='Shoes'
                />
              </figure>
              <div className='card-body'>
                <h2 className='card-title'>
                  Card Title
                  <div className='badge badge-secondary'>NEW</div>
                </h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className='card-actions justify-end'>
                  <div className='badge badge-outline'>Fashion</div>
                  <div className='badge badge-outline'>Products</div>
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
