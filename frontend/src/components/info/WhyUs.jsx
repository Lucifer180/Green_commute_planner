import React from 'react';

const WhyUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">Green Commute & Transport Planner</h1>
          <p className="text-xl text-gray-600 mt-4">
            Revolutionizing Sustainable Urban Mobility with Advanced Features and Robust Security.
          </p>
        </div>

        
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">Security Features</h2>
          <div className="space-y-6">
            
            <div className="flex items-center space-x-4">
              <div className="text-yellow-500 text-4xl">⚠</div>
              <div>
                <h3 className="text-2xl font-medium">Real-Time Alerts</h3>
                <p className="text-gray-600">
                  Receive *GPS-based notifications* for any sudden stop or deviation from the planned route. 
                  These *real-time alerts* help keep users informed about their ride status and ensure their safety.
                </p>
              </div>
            </div>

            
            <div className="flex items-center space-x-4">
              <div className="text-blue-500 text-4xl">🔒</div>
              <div>
                <h3 className="text-2xl font-medium">Double OTP Verification</h3>
                <p className="text-gray-600">
                  We ensure *secure login* and *ride bookings* with a *two-factor authentication (OTP)* system, adding an extra layer of protection for both passengers and drivers.
                </p>
              </div>
            </div>

            
            <div className="flex items-center space-x-4">
              <div className="text-green-500 text-4xl">🛡</div>
              <div>
                <h3 className="text-2xl font-medium">Verified Users</h3>
                <p className="text-gray-600">
                  Only *verified passengers* and *drivers* can use the platform, ensuring *trust* and *safety* for all users.
                  This feature mitigates concerns about sharing rides with strangers.
                </p>
              </div>
            </div>

            
            <div className="flex items-center space-x-4">
              <div className="text-red-500 text-4xl">🚔</div>
              <div>
                <h3 className="text-2xl font-medium">Emergency Notifications</h3>
                <p className="text-gray-600">
                  In case of an emergency, the app sends *immediate notifications* to the *emergency contacts* of both passengers and drivers.
                  This ensures that help is always a click away.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        <section>
          <h2 className="text-3xl font-semibold text-green-600 mb-4">Special Features</h2>
          <div className="space-y-6">
            
            <div className="flex items-center space-x-4">
              <div className="text-orange-500 text-4xl">⛽</div>
              <div>
                <h3 className="text-2xl font-medium">Fuel Cost Sharing</h3>
                <p className="text-gray-600">
                  Our *fuel cost sharing* feature automatically calculates the *fuel costs per passenger* in a carpool ride.  
                  Users can easily share expenses, reducing their overall travel costs and promoting cost-effective rides.
                </p>
              </div>
            </div>

            
            <div className="flex items-center space-x-4">
              <div className="text-green-500 text-4xl">🌱</div>
              <div>
                <h3 className="text-2xl font-medium">Carbon Footprint Tracking</h3>
                <p className="text-gray-600">
                  The app *tracks CO₂ savings* for each eco-friendly trip. Whether you take the bus, cycle, or use carpooling, the system helps you *measure your environmental impact*.
                  It motivates users to reduce their carbon footprint while making *green commuting* easier.
                </p>
              </div>
            </div>

            
            <div className="flex items-center space-x-4">
              <div className="text-purple-500 text-4xl">🎁</div>
              <div>
                <h3 className="text-2xl font-medium">Rewards System</h3>
                <p className="text-gray-600">
                  Earn *points* for every eco-friendly trip and *redeem* them for discounts, *gift cards, or **eco-friendly products*.  
                  We reward users who prioritize sustainability by offering fun incentives.
                </p>
              </div>
            </div>

            
            <div className="flex items-center space-x-4">
              <div className="text-teal-500 text-4xl">🏅</div>
              <div>
                <h3 className="text-2xl font-medium">Badges for Milestones</h3>
                <p className="text-gray-600">
                  Users earn *badges* for reaching milestones such as completing a week of carpooling or consistently reducing their carbon footprint.
                  These *badges* recognize and celebrate eco-friendly habits.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhyUs;