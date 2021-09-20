import './Input.css';
import {forwardRef} from "react";
const Input = forwardRef(({
  label,
  id,
  className,
  children,
  ...props
 },  ref) => {
  return (
    <div className={`input ${className}`}>
      <label htmlFor={id} className="input__label">{label}</label>
      <input
        autoComplete="off"
        ref={ref}
        id={id}
        className="input__field"
        {...props}
      />
      { children }
    </div>
  )
});

export default Input;
