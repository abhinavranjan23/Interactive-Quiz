import React from "react";
import TrendingQuizes from "./TrendingQuizes";
import AllQuizes from "./AllQuizes";

const Quizes = () => {
  const arr = new Array(10).fill(0);
  return (
    <div className='flex flex-col max-w-full'>
      <TrendingQuizes />
      <AllQuizes />
    </div>
  );
};

export default Quizes;
