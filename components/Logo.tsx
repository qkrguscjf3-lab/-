
import React from 'react';

const Logo: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const colorClass = light ? 'text-white' : 'text-slate-900';
  return (
    <div className={`flex flex-col items-center justify-center leading-none ${colorClass}`}>
      <span className="logo-text-top uppercase">Production</span>
      <span className="logo-text-main uppercase">Taskforce</span>
    </div>
  );
};

export default Logo;
