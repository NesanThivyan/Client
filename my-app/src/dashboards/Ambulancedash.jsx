// AmbulanceDash.jsx
import React, { useState } from "react";

/* ---------------- reusable editable table ---------------- */
function EditableTable({ rows, setRows }) {
  const columns = [
    { key: "ambId", label: "Ambulance ID" },
    { key: "plate", label: "Plate #" },
    { key: "driver", label: "Driver" },
    { key: "status", label: "Status" },
  ];

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
          {columns.map(({ label }) => (
            <th key={label} className="px-4 py-2">
              {label}
            </th>
          ))}
          <th className="px-4 py-2 w-32">Actions</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b border-gray-400">
            {columns.map(({ key }) => (
              <td key={key} className="px-4 py-2 bg-gray-300">
                {row.isEditing ? (
                  <input
                    className="w-full rounded px-2 py-1"
                    value={row[key]}
                    onChange={(e) =>
                      handleChange(row.id, key, e.target.value)
                    }
                  />
                ) : (
                  row[key]
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

/* ---------------- main component ---------------- */
export default function AmbulanceDash() {
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-500 to-purple-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Ambulance Details</h1>

      <div className="bg-gray-200 p-6 rounded-lg shadow-xl text-black">
        <EditableTable rows={ambulanceRows} setRows={setAmbulanceRows} />
      </div>
    </div>
  );
}
