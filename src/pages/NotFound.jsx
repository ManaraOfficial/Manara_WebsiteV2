import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-slate-50 px-4 py-8 text-center select-none">
      
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[#2E6B3E]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-[#F28526]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-96 w-96 rounded-full bg-[#D9381E]/10 blur-3xl" />

      {/* Main Content Area */}
      <div className="relative my-auto flex w-full max-w-6xl flex-col items-center justify-center">

        {/* Banners & 404 Grid */}
        <div className="relative z-10 grid w-full grid-cols-1 items-center gap-8 md:grid-cols-12">
          
          {/* Left Signpost: Education Banner */}
          <div className="flex flex-col items-center justify-center md:col-span-3">
            <div className="group relative flex flex-col items-center animate-[bounce_4s_infinite]">
              <div className="relative rounded-xl bg-[#2E6B3E] px-6 py-2.5 font-extrabold tracking-wider text-white shadow-lg transition-transform hover:scale-105">
                <span>EDUCATION</span>
                {/* Arrow Tip */}
                <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 rounded-sm bg-[#2E6B3E]" />
              </div>
              {/* Pole */}
              <div className="h-10 w-2.5 rounded-b bg-slate-300 shadow-inner" />
            </div>
          </div>

          {/* Center 404 Block */}
          <div className="flex flex-col items-center justify-center md:col-span-6">
            <div className="relative">
              {/* Animated 404 Numbers */}
              <div className="flex items-center justify-center text-8xl font-black tracking-tight sm:text-9xl">
                <span className="inline-block animate-[bounce_3s_infinite] text-[#2E6B3E] drop-shadow-sm">
                  4
                </span>
                <span className="inline-block animate-[bounce_3s_infinite_200ms] text-[#F28526] drop-shadow-sm">
                  0
                </span>
                <span className="inline-block animate-[bounce_3s_infinite_400ms] text-[#D9381E] drop-shadow-sm">
                  4
                </span>
              </div>

              <p className="mt-1 text-xl font-extrabold uppercase tracking-widest text-slate-700 sm:text-2xl">
                Page Not Found
              </p>
            </div>
          </div>

          {/* Right Signposts: Health & Partnership Banners */}
          <div className="flex flex-col items-center justify-center gap-6 md:col-span-3 md:flex-row md:gap-4">
            
            {/* Health Sign */}
            <div className="group relative flex flex-col items-center animate-[bounce_5s_infinite_500ms]">
              <div className="rounded-xl bg-[#F28526] px-5 py-2.5 font-extrabold tracking-wider text-white shadow-lg transition-transform hover:scale-105">
                HEALTH
              </div>
              <div className="h-10 w-2.5 rounded-b bg-slate-300 shadow-inner" />
            </div>

            {/* Partnership Sign */}
            <div className="group relative flex flex-col items-center animate-[bounce_6s_infinite_1000ms]">
              <div className="relative rounded-xl bg-[#D9381E] px-5 py-2.5 font-extrabold tracking-wider text-white shadow-lg transition-transform hover:scale-105">
                PARTNERSHIP
                {/* Arrow Tip */}
                <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 rounded-sm bg-[#D9381E]" />
              </div>
              <div className="h-10 w-2.5 rounded-b bg-slate-300 shadow-inner" />
            </div>

          </div>

        </div>

        {/* Message Description */}
        <p className="mt-10 max-w-md text-sm font-medium text-slate-500 sm:text-base">
          Looks like you've wandered off the path. The page you are looking for has been moved or doesn't exist.
        </p>

        {/* Return Home Button */}
        <div className="mt-8 z-30">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2E6B3E] via-[#F28526] to-[#D9381E] p-[2px] shadow-lg shadow-orange-500/10 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2 rounded-[10px] bg-white px-7 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50 sm:text-base">
              <svg
                className="h-5 w-5 text-[#2E6B3E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Return to Home
            </span>
          </Link>
        </div>

      </div>

      {/* Decorative Bottom Ground Line */}
      <div className="relative w-full max-w-4xl border-b border-slate-200 pt-6">
        <div className="absolute -top-1 left-1/2 h-2 w-20 -translate-x-1/2 rounded-full bg-slate-300/50" />
      </div>

    </div>
  )
}