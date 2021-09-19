import './Button.css';
const Button = ({
  children,
  className,
  type = 'button',
  disabled = false,
  click,
}) => {
  return (
    <button
      className={`button ${className}`}
      type={type}
      disabled={disabled}
      onClick={click}
    >{children}</button>
  )
}

export default Button;
