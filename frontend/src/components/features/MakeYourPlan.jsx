import React from 'react';
import Img4 from '../../../public/Img4.jpg';
import Img5 from '../../../public/Img5.jpg';
import Img6 from '../../../public/Img6.jpg';
const MakeYourPlan = () => {
  return (
    <div className="flex flex-wrap justify-between gap-4">
      <article className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <img
          alt=""
         src={Img4}
          className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
        />
        <div className="p-4">
          <a href="#">
            <h3 className="text-lg font-medium text-gray-900">Make your own trip plan</h3>
          </a>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          Plan your next carpool trip—coordinate routes, split costs, and reduce emissions. Save money, build connections, and make commuting greener. Start planning today for a smoother, more enjoyable ride!
          </p>
        </div>
        <a
          className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden ml-10"
          href="#"
          onClick={()=>alert('Planning functionality coming soon!')}
        >
          Notify Others
        </a>
      </article>

      <article className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <img
          alt=""
          src={Img5}
          className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
        />
        <div className="p-4">
          <a href="#">
            <h3 className="text-lg font-medium text-gray-900">Plan your next trekking adventure</h3>
          </a>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          "Plan your next trekking adventure—coordinate routes, share gear, and ensure safety. Save time, reduce costs, and make the journey more enjoyable. Start planning today for a memorable, eco-friendly trek!"
          </p>
        </div>
        <a
          className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden ml-10"
          href="#"
          onClick={()=>alert('Planning functionality coming soon!')}
        >
          Notify Others
        </a>
      </article>

      <article className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <img
          alt=""
          src={Img6}
          className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
        />
        <div className="p-4">
          <a href="#">
            <h3 className="text-lg font-medium text-gray-900">plan your weekend party's</h3>
          </a>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          "Plan your weekend party—coordinate with friends, share ideas, and create unforgettable memories. Save time, reduce costs, and make it an epic celebration. Start planning now for the best weekend party ever!"
          </p>
        </div>
        <a
          className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden ml-10"
          href="#"
        onClick={()=>alert('Planning functionality coming soon!')}
        >
          Notify Others
        </a>
      </article>
    </div>
  )
}

export default MakeYourPlan
