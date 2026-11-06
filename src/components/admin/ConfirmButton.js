"use client";

export default function ConfirmButton({ message, children, className = "btn btn-bad btn-sm" }) {
  return (
    <button
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
