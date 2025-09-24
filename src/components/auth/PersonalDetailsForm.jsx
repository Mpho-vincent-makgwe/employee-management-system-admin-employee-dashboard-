"use client";

export const PersonalDetailsForm = ({
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  loading,
  setStep,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-[#4F46E5] mb-6">
        Set up your Profile
      </h2>
      <h3 className="text-md font-medium text-black mb-4">Personal Details</h3>

      {errors.form && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-black mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-black mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-black mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-black mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.dob && (
              <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-black mb-1">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            {errors.maritalStatus && (
              <p className="mt-1 text-sm text-red-600">
                {errors.maritalStatus}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-black mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-black mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contactNumber}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-black mb-1">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
            {errors.nationality && (
              <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-black mb-1">Home Address</label>
          <input
            type="text"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {errors.homeAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.homeAddress}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-black mb-1">
            Emergency Contact Number
          </label>
          <input
            type="tel"
            name="emergencyNumber"
            value={formData.emergencyNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
          {errors.emergencyNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.emergencyNumber}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Continue to Job Details"}
        </button>
      </form>
    </div>
  );
};
