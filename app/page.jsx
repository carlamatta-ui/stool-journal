"use client";

import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>Stool Journal</h1>
      <p>If you see this page, your app is working 🎉</p>

      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: "10px 16px",
          borderRadius: 10,
          border: "1px solid #000",
          background: "#000",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Test button ({count})
      </button>
    </div>
  );
}
