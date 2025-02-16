import { SignedIn, UserButton } from "@clerk/clerk-react";
import React, { useState } from 'react';
import logo from '../../../public/logo.png';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    console.log(`Selected: ${option}`);
    setIsOpen(false);
  };

  return (
    <header className="bg-slate-900 shadow-md border border-slate-800">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex-1 md:flex md:items-center md:gap-12">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
         <img src={logo} alt="logo" className="h-17 w-17" onClick={()=>window.location.href="/"}/>
        </a>
      </div>

      <div className="md:flex md:items-center md:gap-12">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a className="text-white transition hover:text-gray-500/75 hover:cursor-pointer" href="/"> About </a>
            </li>

            <li>
              <a className="text-white transition hover:text-gray-500/75 hover:cursor-pointer" href="/api/distance"> Route planner </a>
            </li>

            <li>
              <a className="text-white transition hover:text-gray-500/75" href="/carbontracker"> carbon tracker </a>
            </li>

            <li>
              <a className="text-white transition hover:text-gray-500/75" href="/calculate-fuel-cost"> fuel sharing </a>
            </li>

            <li>
              <a className="text-white transition hover:text-gray-500/75" href="/rewards"> rewards </a>
            </li>

            <li>
              <a className="text-white transition hover:text-gray-500/75" href="/emergency-complaints"> Emergency and complaints </a>
            </li>
            <li>
              <a className="text-white transition hover:text-gray-500/75" href="/make-your-plan"> Make your own plan</a>
            </li>
            
          </ul>
        </nav>

        <div className="hidden md:relative md:block mr-4">
          <button
            type="button"
            className="overflow-hidden"
          >
            <span className="sr-only">Toggle dashboard menu</span>
            <SignedIn className="mt-1">
        <UserButton />
         </SignedIn>
           
          </button>

          <div
            className="hidden absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
          >
            <div className="p-2">
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
                My profile
              </a>

              

              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
                Team settings
              </a>
            </div>

            <div className="p-2">
              <form method="POST" action="#">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  role="menuitem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>

                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <button
            className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
  )
}

export default Header
