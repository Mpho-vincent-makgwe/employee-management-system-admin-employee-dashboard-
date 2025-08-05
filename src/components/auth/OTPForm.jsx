// components/auth/OTPForm.jsx
"use client";

export const OTPForm = ({ 
  formData, 
  errors, 
  handleInputChange, 
  handleSubmit, 
  loading,
  email 
}) => {
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    const newOtp = formData.otp.split('');
    newOtp[index] = value;
    handleInputChange({
      target: {
        name: 'otp',
        value: newOtp.join('')
      }
    });
    
    // Auto focus to next input
    if (value && index < 3) {
      document.querySelector(`input[name=otp${index+1}]`).focus();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-[#4F46E5] mb-4">Verify OTP</h2>
      <p className="text-sm text-gray-600 mb-6">Enter the OTP sent to your email {email}</p>
      
      {errors.otp && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {errors.otp}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-3 mb-8 max-w-[80%]">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              name={`otp${index}`}
              maxLength="1"
              value={formData.otp[index] || ''}
              onChange={(e) => handleOtpChange(e, index)}
              className="w-full p-3 text-center border border-gray-300 rounded-md text-black"
            />
          ))}
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mb-6 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};