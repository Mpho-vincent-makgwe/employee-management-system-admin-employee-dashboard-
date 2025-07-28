

const CardTitle = ({ children, level = 3, className = '', color }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={` font-poppins text-[${color ? color : '#3a3a3c'}] leading-snug ${
      level === 1 ? 'text-4xl font-bold' :
      level === 2 ? 'text-3xl font-bold' :
      level === 3 ? 'text-2xl lg:text-4xl font-bold' : 
      level === 4 ? 'text-2xl font-medium' :
      level ===5 ? 'text-lg font-medium':
      'text-sm'
    } ${className}`}>
      {children}
    </Tag>
  );
};

export default CardTitle