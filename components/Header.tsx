
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center pt-16 pb-12 px-4 select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <span className="text-indigo-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm animate-pulse">
        Linh Master AI Presents
      </span>
      
      <h1 className="text-6xl md:text-8xl font-extrabold text-center leading-tight mb-6">
        <span className="text-gradient">CREATIVE</span><br />
        <span className="text-white drop-shadow-2xl">MASTERMIND AI</span>
      </h1>
      
      <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl font-light">
        Siêu hệ thống kiến tạo nội dung đa vũ trụ. Tích hợp Neural Architecture cho kết quả thực chiến & chuyên gia 100%.
      </p>
      
      <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mt-8 shadow-lg shadow-indigo-500/50"></div>
    </header>
  );
};

export default Header;
