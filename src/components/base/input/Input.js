import './Input.css';
import {forwardRef} from "react";
const Input = forwardRef(({
  label,
  id,
  className,
  ...props
 },  ref) => {
  return (
    <div className={`input ${className}`}>
      <label htmlFor={id} className="input__label">{label}</label>
      <input
        ref={ref}
        id={id}
        className="input__field"
        {...props}
      />
    </div>
  )
});

export default Input;
