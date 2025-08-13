const Card = ({ children, padding, border, className }) => {
  const customStyles = {
    // width: '600px',
    // height: '376px',
    backgroundColor: '#fff',
    padding: padding ? padding : '16px',
    border: border ? border : '0.6px solid #D0D5DD',
    borderRadius: '6px',
    opacity: 1,
  };

  return (
    <div
      style={customStyles}
      className={`${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
