import "./Button.css";

function Button({ value, onClick, className }) {
  return <button onClick={onClick} className={className}>{value}</button>;
}

export default Button;
