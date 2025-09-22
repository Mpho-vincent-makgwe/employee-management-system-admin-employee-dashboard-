
export default function PasswordModal(){
    return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
    <div className="flex justify-center mb-4">
     
      <svg
        className="h-12 w-12 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <h2 className="text-xl font-semibold text-blue-600 mb-2">Successful</h2>
    <p className="text-sm text-gray-600 mb-6">
      Your password has been reset. You can now use your new password to sign in.
    </p>

    <button
      onClick={handleGoBack}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Go Back
    </button>
  </div>
</div>

    )
}
