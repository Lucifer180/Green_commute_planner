import React from 'react';
import Img7 from '../../../public/Img7.png';
const AboutTransCard = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8 background-slate-900">

       
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">About TransCard</h2>
        <p className="mt-4 text-gray-500">
          Revolutionizing Green Commute for a Sustainable Future
        </p>
      </div>
      <img src={Img7} alt="TranCard" className='w-60 h-60 ml-120' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-indigo-600">Reduce Train Lines</h3>
          <p className="mt-2 text-gray-500 text-center">
            Say goodbye to long queues! TransCard simplifies your journey with easy tap-in and tap-out, reducing train line congestion.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-indigo-600">Fight Misuse of Free Bus Services</h3>
          <p className="mt-2 text-gray-500 text-center">
            Secure and verified access ensures only eligible passengers use free bus services, maximizing resources efficiently.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-indigo-600">Ease the Burden on Conductors</h3>
          <p className="mt-2 text-gray-500 text-center">
            Conductors can focus on ensuring safety and efficiency, while TransCard handles ticket verification, easing their workload.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-indigo-600">Save Time</h3>
          <p className="mt-2 text-gray-500 text-center">
            With quick tap-in, tap-out functionality, TransCard reduces boarding time and makes your commute faster.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-indigo-600">Eco-Friendly</h3>
          <p className="mt-2 text-gray-500 text-center">
            By eliminating paper tickets, TransCard promotes sustainability, reducing waste and contributing to a greener environment.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold text-gray-900">How It Works</h3>
        <p className="mt-4 text-gray-500">
          TransCard integrates with your local transportation system, allowing you to load credit, tap in/out, and experience seamless travel, reducing wait times and promoting efficient commuting.
        </p>
      </div>

      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
          Join the Movement
        </button>
      </div>
    </div>
  );
};

export default AboutTransCard;
