'use client';

import React from 'react';
import { Tenant } from '@/types/tenant';

interface CondoLogoProps {
  tenant: Tenant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CondoLogo: React.FC<CondoLogoProps> = ({ tenant, className = '', size = 'md' }) => {
  if (tenant.logoSvgType === 'damha1') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Architectural Stylized Skyline Logo matching Mockup */}
        <div className="relative mb-1 flex items-end justify-center gap-1.5 h-10 w-24">
          {/* Building Line 1 - Cyan / Sky Blue */}
          <div className="w-2.5 h-7 rounded-t-sm border-2 border-[#00A3E0] border-b-0 bg-gradient-to-t from-transparent to-[#00A3E0]/20" />
          {/* Building Line 2 - Emerald Green (Taller) */}
          <div className="w-3 h-10 rounded-t-sm border-2 border-[#00B050] border-b-0 bg-gradient-to-t from-transparent to-[#00B050]/20 relative">
            <div className="absolute top-1.5 left-0.5 right-0.5 h-0.5 bg-[#00B050]/50" />
            <div className="absolute top-3.5 left-0.5 right-0.5 h-0.5 bg-[#00B050]/50" />
            <div className="absolute top-5.5 left-0.5 right-0.5 h-0.5 bg-[#00B050]/50" />
          </div>
          {/* Building Line 3 - Gold / Amber */}
          <div className="w-2.5 h-8 rounded-t-sm border-2 border-[#FBB03B] border-b-0 bg-gradient-to-t from-transparent to-[#FBB03B]/20" />
          {/* Base Curved Line */}
          <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00A3E0] via-[#00B050] to-[#FBB03B] rounded-full" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col items-center">
          <span className="text-[13px] font-extrabold uppercase tracking-tight text-[#002D5A] leading-none">
            Residencial
          </span>
          <div className="flex items-center gap-1 my-0.5">
            <span className="text-xl font-black uppercase tracking-tight text-[#00A3E0] leading-none">
              DAMHA
            </span>
            <span className="text-2xl font-black text-[#00B050] leading-none">
              1
            </span>
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#002D5A] leading-none">
            {tenant.city.toUpperCase()}
          </span>
          <span className="text-[8px] font-semibold tracking-wider text-slate-500 uppercase mt-1">
            {tenant.associationName}
          </span>
        </div>
      </div>
    );
  }

  // Fallback / White-label generic logo
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md mb-1">
        {tenant.name.charAt(0)}
      </div>
      <span className="text-base font-black text-slate-900 tracking-tight leading-tight">
        {tenant.name}
      </span>
      <span className="text-[9px] font-medium text-slate-500 uppercase tracking-widest">
        {tenant.associationName}
      </span>
    </div>
  );
};
