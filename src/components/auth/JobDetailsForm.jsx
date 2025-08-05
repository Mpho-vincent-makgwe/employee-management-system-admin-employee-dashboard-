// components/auth/JobDetailsForm.jsx
"use client";

export const JobDetailsForm = ({ 
  formData, 
  errors, 
  handleInputChange, 
  handleSubmit, 
  loading 
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-[#4F46E5] mb-6">Set up your Profile</h2>
      <h3 className="text-md font-medium text-black mb-4">Job Details</h3>
      
      {errors.form && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-black mb-1">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
          </div>
          <div>
            <label className="block text-sm text-black mb-1">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-black mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
          </div>
          
          <div>
            <label className="block text-sm text-black mb-1">Manager</label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.manager && <p className="mt-1 text-sm text-red-600">{errors.manager}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-black mb-1">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.employmentType && <p className="mt-1 text-sm text-red-600">{errors.employmentType}</p>}
          </div>
          
          <div>
            <label className="block text-sm text-black mb-1">Work Email</label>
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.workEmail && <p className="mt-1 text-sm text-red-600">{errors.workEmail}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-black mb-1">Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.dateOfJoining && <p className="mt-1 text-sm text-red-600">{errors.dateOfJoining}</p>}
          </div>
          
          <div>
            <label className="block text-sm text-black mb-1">Work Location</label>
            <select
              name="workLocation"
              value={formData.workLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select Location</option>
              <option value="Headquarters">Headquarters</option>
              <option value="Remote">Remote</option>
              <option value="Branch Office">Branch Office</option>
              <option value="Client Site">Client Site</option>
            </select>
            {errors.workLocation && <p className="mt-1 text-sm text-red-600">{errors.workLocation}</p>}
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Complete Profile'}
        </button>
      </form>
    </div>
  );
};