// SuperadminDashboard.jsx
import React, { useState } from "react";

/* ---------- generic editable table ---------- */
function EditableTable({ rows, setRows, columns }) {
  const toggleEdit = (id) =>
    setRows((r) =>
      r.map((row) =>
        row.id === id ? { ...row, isEditing: !row.isEditing } : row
      )
    );

  const handleChange = (id, field, value) =>
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );

  const removeRow = (id) => setRows((r) => r.filter((row) => row.id !== id));

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-300 text-left">
          {columns.map((c) => (
            <th key={c.key} className="px-4 py-2">
              {c.label}
            </th>
          ))}
          <th className="px-4 py-2 w-32">Actions</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-gray-400">
            {columns.map((c) => (
              <td key={c.key} className="px-4 py-2 bg-gray-300">
                {row.isEditing ? (
                  <input
                    className="w-full rounded px-2 py-1"
                    value={row[c.key]}
                    onChange={(e) =>
                      handleChange(row.id, c.key, e.target.value)
                    }
                  />
                ) : (
                  row[c.key]
                )}
              </td>
            ))}

            <td className="px-4 py-2 bg-gray-300">
              {row.isEditing ? (
                <button
                  onClick={() => toggleEdit(row.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => toggleEdit(row.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => removeRow(row.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- read-only table (for medical info) ---------- */
function ReadOnlyTable({ rows }) {
  const keys = Object.keys(rows[0] || {}).filter((k) => k !== "id");
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-300 text-left">
          {keys.map((k) => (
            <th key={k} className="px-4 py-2">
              {k.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className="border-b border-gray-400">
            {keys.map((k) => (
              <td key={k} className="px-4 py-2 bg-gray-300">
                {r[k]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- main dashboard ---------- */
export default function SuperadminDashboard() {
  /* 1. — data sets ------------------------------------------------------- */
  const [userRows, setUserRows] = useState(
    Array.from({ length: 5 }).map((_, i) => ({
      id: crypto.randomUUID(),
      col1: `Row ${i + 1} Data 1`,
      col2: `Row ${i + 1} Data 2`,
      col3: `Row ${i + 1} Data 3`,
      col4: `Row ${i + 1} Data 4`,
      isEditing: false,
    }))
  );

  const [ambulanceRows, setAmbulanceRows] = useState([
    {
      id: crypto.randomUUID(),
      ambId: "AMB-001",
      plate: "WP-1234",
      driver: "Sunil",
      status: "Available",
      isEditing: false,
    },
    {
      id: crypto.randomUUID(),
      ambId: "AMB-002",
      plate: "WP-5678",
      driver: "Kamal",
      status: "On Call",
      isEditing: false,
    },
  ]);

  const medicalRows = [
    {
      id: 1,
      condition: "Asthma",
      allergy: "Pollen",
      medication: "Inhaler",
      note: "Carries inhaler at all times",
    },
    {
      id: 2,
      condition: "Diabetes",
      allergy: "None",
      medication: "Metformin",
      note: "Type 2 – diet controlled",
    },
  ];

  /* 2. — column configs -------------------------------------------------- */
  const userCols = [
    { key: "col1", label: "Column 1" },
    { key: "col2", label: "Column 2" },
    { key: "col3", label: "Column 3" },
    { key: "col4", label: "Column 4" },
  ];

  const ambulanceCols = [
    { key: "ambId", label: "Ambulance ID" },
    { key: "plate", label: "Plate #" },
    { key: "driver", label: "Driver" },
    { key: "status", label: "Status" },
  ];

  /* 3. — UI state -------------------------------------------------------- */
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [activeView, setActiveView] = useState("User Details");

  /* helper to render each sidebar item */
  const link = (label) => (
    <li
      key={label}
      onClick={() => setActiveView(label)}
      className={`cursor-pointer hover:text-blue-300 ${
        activeView === label ? "text-blue-300 font-semibold" : ""
      }`}
    >
      {label}
    </li>
  );

  /* 4. — JSX ------------------------------------------------------------- */
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-500 to-purple-900 text-white">
      {/* ---- sidebar ---- */}
      <aside className="w-60 bg-blue-900 p-4 rounded-r-xl shadow-lg">
        <h2 className="text-lg font-bold mb-8 bg-blue-800 px-2 py-1 rounded-full text-center">
          Admin Dashboard
        </h2>

        <ul className="space-y-4 text-sm">
          {/* User dropdown */}
          <li
            onClick={() => setOpenUserMenu((o) => !o)}
            className="cursor-pointer hover:text-blue-300 flex items-center justify-between"
          >
            <span
              className={`${
                activeView.includes("User") ? "text-blue-300 font-semibold" : ""
              }`}
            >
              User Details
            </span>
            <span>{openUserMenu ? "▾" : "▸"}</span>
          </li>

          {openUserMenu && (
            <ul className="ml-4 space-y-2 text-xs">
              {link("User Details")}
              {link("Medical Details")}
            </ul>
          )}

          {link("Ambulance Details")}
          {link("Alert Details")}
        </ul>
      </aside>

      {/* ---- main content ---- */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">{activeView}</h1>

        <div className="bg-gray-200 p-6 rounded-lg shadow-xl text-black">
          {activeView === "User Details" && (
            <EditableTable
              rows={userRows}
              setRows={setUserRows}
              columns={userCols}
            />
          )}

          {activeView === "Medical Details" && (
            <ReadOnlyTable rows={medicalRows} />
          )}

          {activeView === "Ambulance Details" && (
            <EditableTable
              rows={ambulanceRows}
              setRows={setAmbulanceRows}
              columns={ambulanceCols}
            />
          )}

          {activeView === "Alert Details" && (
            <p className="italic">Build this section next…</p>
          )}
        </div>
      </main>
    </div>
  );
}
