"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "stool_journal_entries";

const BRISTOL = [
  { id: 1, label: "Type 1", desc: "Hard pellets (constipation)" },
  { id: 2, label: "Type 2", desc: "Lumpy sausage (slow transit)" },
  { id: 3, label: "Type 3", desc: "Cracked sausage (near optimal)" },
  { id: 4, label: "Type 4", desc: "Smooth & soft (ideal)" },
  { id: 5, label: "Type 5", desc: "Soft blobs (low fiber)" },
  { id: 6, label: "Type 6", desc: "Mushy (loose stools)" },
  { id: 7, label: "Type 7", desc: "Watery (diarrhea)" }
];

const HYDRATION = ["0", "1–3", "5+"];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function Page() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [hydration, setHydration] = useState("1–3");
  const [color, setColor] = useState("");
  const [bristol, setBristol] = useState(4);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  function saveEntry() {
    setEntries([
      {
        date,
        time,
        hydration,
        color,
        bristol,
        notes
      },
      ...entries
    ]);
    setTime("");
    setColor("");
    setNotes("");
    setBristol(4);
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20, fontFamily: "system-ui" }}>
      <h1>Daily Stool Journal</h1>
      <p style={{ color: "#555" }}>
        Track stool patterns daily using the Bristol Stool Chart.
      </p>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />

        <label style={{ marginTop: 10 }}>Time</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />

        <label style={{ marginTop: 10 }}>Hydration (cups)</label>
        <select value={hydration} onChange={e => setHydration(e.target.value)}>
          {HYDRATION.map(h => (
            <option key={h}>{h}</option>
          ))}
        </select>

        <label style={{ marginTop: 10 }}>Stool color</label>
        <input
          placeholder="brown, yellow, pale..."
          value={color}
          onChange={e => setColor(e.target.value)}
        />

        <label style={{ marginTop: 10 }}>Bristol Stool Type</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
          {BRISTOL.map(b => (
            <button
              key={b.id}
              onClick={() => setBristol(b.id)}
              style={{
                padding: 8,
                borderRadius: 8,
                border: bristol === b.id ? "2px solid black" : "1px solid #ccc",
                background: "#fff"
              }}
            >
              <strong>{b.id}</strong>
              <div style={{ fontSize: 10 }}>{b.label}</div>
            </button>
          ))}
        </div>

        <label style={{ marginTop: 10 }}>Notes</label>
        <input
          placeholder="food, stress, travel..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />

        <button
          onClick={saveEntry}
          style={{
            marginTop: 16,
            padding: "10px 16px",
            borderRadius: 10,
            border: "none",
            background: "black",
            color: "white"
          }}
        >
          Save entry
        </button>
      </div>

      <h2 style={{ marginTop: 24 }}>Recent entries</h2>
      {entries.length === 0 && <p>No entries yet.</p>}
      {entries.map((e, i) => (
        <div key={i} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
          <strong>{e.date}</strong> — Bristol {e.bristol}, hydration {e.hydration}
        </div>
      ))}
    </div>
  );
}
