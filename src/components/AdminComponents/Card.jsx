

const Card = ({
    children, padding, border, className
}) => {

    const customStyles = {
        padding: padding ? padding : '16px',
        backgroundColor: '#fff',
        border: border ? border : '0.4px solid #d0d5dd'
    }
  return (
    <div style={customStyles} className={`w-full ${className} rounded-lg`}>{children}</div>
  )
}

export default Card