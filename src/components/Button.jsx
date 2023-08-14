import "./Button.css";

export default function Button({ type, clickCallback, children }) {
  return (
    <button
      onClick={() => clickCallback()}
      className={`button ${type}`}
      type={type}
    >
      {children}
    </button>
  );
}
