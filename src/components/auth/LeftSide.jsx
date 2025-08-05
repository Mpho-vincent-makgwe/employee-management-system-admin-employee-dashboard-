// components/auth/LeftSide.jsx
export const LeftSide = () => {
  return (
    <div className="bg-[#3F38B8] text-white flex flex-col rounded-md p-16 pt-24 pb-24">
      <div className="w-full mb-8">
        <p className="text-indigo-200 text-lg">Manage your work, time, and profile<br/>
          all in one place—simple, fast, and<br/>secure.</p>
      </div>
      
      <div className="w-full flex justify-center mb-8">
        <div className="bg-indigo-700 rounded-lg overflow-hidden">
          <img
            src="./dashboardpic.jpeg"
            alt="Dashboard Preview"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      
      <div className="w-full">
        <div className="p-6 bg-[#ffffff]/5 rounded-md text-center">
          <h4 className="text-sm font-semibold mb-4">Testimonial</h4>
          <p className="mb-4 italic text-xs">
            "The Employee Management System has completely changed their meaning any week..."
          </p>
          <div className="flex items-center justify-center space-x-2">
            <img 
              src="./user-avatar.jpg" 
              alt="Testifier" 
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium">Motor Portal</div>
              <div className="text-indigo-200 text-sm">Design & Marketing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};