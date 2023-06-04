import React from 'react';

const LoadingCircle = () => {
  const circleStyle = `w-20 h-20 rounded-full animate-spin border-y border-solid border-blue-500 border-t-transparent`;
  const containerStyle = 'flex flex-col justify-center items-center h-screen';
  const textStyle = 'text-blue-500 mt-4 animate-pulse';
  return (
    <div className={containerStyle}>
      <div className={circleStyle}></div>
      <div className={textStyle}>Loading...</div>
    </div>
  );
};

export default LoadingCircle;