import React from 'react';

const LinkBox = ({ lbTitle, lbNumber, lbTheme }) => {
  return (
    <div className="flex items-center p-8 bg-white shadow border rounded-lg">
      <div
        className={
          `bg-${lbTheme}-500` +
          ' inline-flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full mr-6'
        }
      >
        <img
          src="https://e7.pngegg.com/pngimages/805/76/png-clipart-bar-chart-computer-icons-ups-and-downs-miscellaneous-text.png"
          className="w-6"
        />
      </div>
      <div className="">
        <span className="inline-block text-2xl font-bold">{lbNumber}</span>
        <span className="block text-gray-500">{lbTitle}</span>
      </div>
    </div>
  );
};

export default LinkBox;
