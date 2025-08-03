'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

const AddEmployeeForm = () => {
    const router = useRouter()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
    employmentType: '',
    dateJoined: '',
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    router.push('/admin/employee-directory')
  };

const handleCancel = () => {
    router.push('/admin/dashboard')
}

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl shadow-md p-8 space-y-10">
      
      <section>
        <h2 className="text-lg font-semibold text-[#4F46E5] mb-6 pb-2">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-700">First Name</label>
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange}
              className="mt-1 w-full rounded-sm border border-gray-300 px-4 py-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Last Name</label>
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
              className="mt-1 w-full rounded-sm border border-gray-300 px-4 py-3 shadow-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className="mt-1 w-full rounded-sm border border-gray-300 px-4 py-3 shadow-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              className="mt-1 w-full rounded-sm border border-gray-300 px-4 py-3 shadow-sm" />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm text-gray-700">Home Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange}
              className="mt-1 w-full rounded-sm border border-gray-300 px-4 py-3 shadow-sm" />
          </div>
        </div>
      </section>

    
      <section>
        <h2 className="text-lg font-semibold text-[#4F46E5] mb-6  pb-2">Job Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-black">Job Title</label>
            <input type="text" name="jobTitle" value={form.jobTitle} onChange={handleChange}
              className="mt-1 w-full rounded-sm border border-gray-300 px-4 py-3 shadow-sm" />
          </div>
          <div>
            <label className="text-sm text-black">Employment Type</label>
            <select
  name="employmentType"
  value={form.employmentType}
  onChange={handleChange}
  className="mt-1 w-full rounded-sm border border-gray-300 px-4  py-3 shadow-sm text-black appearance-none bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[length:1rem] bg-[right_0.75rem_center]">
  <option value="">Select type</option>
  <option value="Full-time">Full-time</option>
  <option value="Part-time">Part-time</option>
  <option value="Contract">Contract</option>
</select>

          </div>
          <div>
            <label className="text-sm text-black">Date Joined</label>
            <input type="date" name="dateJoined" value={form.dateJoined} onChange={handleChange}
              className="mt-1 w-full rounded-sm border border-gray-300 px-4 py-3 shadow-sm text-black" />
          </div>
          <div>
            <label className="text-sm text-black">Monthly Salary</label>
            <input type="number" name="salary" value={form.salary} onChange={handleChange}
              className="mt-1 w-full rounded-sm border border-gray-300 px-4 py-3 shadow-sm" />
          </div>
        </div>
      </section>

      
      <div className="flex justify-start gap-4 pt-4">
  <Button
    type="submit"
    className="px-4 py-2 text-sm font-medium bg-[#4F46E5] text-white border border-[#4F46E5] hover:bg-[#4338CA]"
  >
    Add Employee
  </Button>
  <Button
    type="button"
    onClick={handleCancel}
    className="px-4 py-2 text-sm font-medium bg-white text-[#4F46E5] border border-[#4F46E5] hover:bg-indigo-50 hover:text-white"
  >
    Cancel
  </Button>
</div>


    </form>
  );
};

export default AddEmployeeForm;
