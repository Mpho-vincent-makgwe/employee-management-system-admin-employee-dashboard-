

const ButtonPrimary = ({ children, onClick, icon: Icon, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-medium rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 ${className}`}
    >
      {Icon && <Icon className="mr-2 text-xl" />}
      {children}
    </button>
  );
};

export default ButtonPrimary