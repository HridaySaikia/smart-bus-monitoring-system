"use client";

export default function TestPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Test Button</h1>

      <button
        style={{
          padding: "20px",
          fontSize: "20px",
          background: "blue",
          color: "white"
        }}
        onClick={() => {
          alert("BUTTON WORKING");
        }}
      >
        Click Me
      </button>
    </div>
  );
}