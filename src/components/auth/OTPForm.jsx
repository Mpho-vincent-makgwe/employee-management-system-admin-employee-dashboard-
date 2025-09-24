"use client";
import { useState } from "react";
import CustomButton from "../ui/CustomButton";

export const OTPForm = ({ email, onSubmit, errors, loading }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 3) {
      document.querySelector(`input[name=otp${index + 1}]`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    onSubmit(otpCode);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-[#4F46E5] mb-4">Verify OTP</h2>
      <p className="text-sm text-gray-600 mb-6">
        Enter the OTP sent to your email {email}
      </p>

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
              value={otp[index]}
              onChange={(e) => handleOtpChange(e, index)}
              className="w-full p-3 text-center border border-gray-300 rounded-md text-black"
              pattern="[0-9]"
              inputMode="numeric"
            />
          ))}
        </div>

        <CustomButton
          type="submit"
          disabled={loading}
          text={loading ? "Verifying..." : "Submit"}
          variant="primary"
          size="medium"
          className="w-full mb-4"
        />
      </form>
    </div>
  );
};
