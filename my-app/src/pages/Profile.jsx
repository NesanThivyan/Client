import React, { useEffect, useState } from "react";
import axios from "axios";


export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("user"); 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/users/me");
      setUserData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const TabButton = ({ id, children }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`text-sm font-bold text-left transition-colors  
                  ${activeTab === id
                    ? "text-white underline"
                    : "text-gray-200 hover:text-blue-200"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <aside className="w-1/5 bg-blue-900 rounded-r-xl shadow-md p-4 flex flex-col gap-4">
        <TabButton id="user">User Details</TabButton>
        <TabButton id="medical">User Medical Details</TabButton>
        <TabButton id="guardian">Guardian Details</TabButton>
        <TabButton id="settings">Settings</TabButton>
      </aside>

      {/*  Main */}
      <main className="flex-1 bg-blue-50 p-10 rounded-l-xl shadow-inner overflow-auto">
        {activeTab === "user" && (
          <UserDetailsPanel
            data={userData}
            loading={loading}
            onRefresh={fetchUser}
          />
        )}
        {activeTab === "medical" && (
          <MedicalDetailsPanel
            data={userData?.medical}
            loading={loading}
            onRefresh={fetchUser}
          />
        )}
        {activeTab === "guardian" && <ComingSoon who="Guardian" />}
        {activeTab === "settings" && <ComingSoon who="Settings" />}
      </main>
    </div>
  );
}

function UserDetailsPanel({ data, loading, onRefresh }) {
  const [form, setForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  if (loading) return <Skeleton />;
  if (!form)
    return <p className="text-center text-sm text-gray-500">No user data.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/users/me", form);
      setIsEditing(false);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  return (
    <section className="max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <ProfileIcon />
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700 disabled:opacity-50"
          disabled={isEditing && !form.name}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setForm(data);
            }}
            className="px-3 py-1 rounded-md border text-xs font-semibold"
          >
            Cancel
          </button>
        )}
      </div>

      <DetailRow
        label="Full Name"
        name="name"
        value={form.name}
        isEditing={isEditing}
        onChange={handleChange}
      />
      <DetailRow
        label="Email"
        name="email"
        value={form.email}
        isEditing={isEditing}
        onChange={handleChange}
      />
      <DetailRow
        label="Phone"
        name="phone"
        value={form.phone}
        isEditing={isEditing}
        onChange={handleChange}
      />
      <DetailRow
        label="Birth Date"
        name="dob"
        value={form.dob}
        isEditing={isEditing}
        onChange={handleChange}
      />
    </section>
  );
}

function MedicalDetailsPanel({ data, loading, onRefresh }) {
  const [form, setForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  if (loading) return <Skeleton />;
  if (!form)
    return (
      <p className="text-center text-sm text-gray-500">No medical data.</p>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/users/me/medical", form);
      setIsEditing(false);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">Medical Information</h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setForm(data);
            }}
            className="px-3 py-1 rounded-md border text-xs font-semibold"
          >
            Cancel
          </button>
        )}
      </div>
      <DetailRow
        label="Blood Group"
        name="bloodGroup"
        value={form.bloodGroup}
        isEditing={isEditing}
        onChange={handleChange}
      />
      <DetailRow
        label="Allergies"
        name="allergies"
        value={form.allergies}
        isEditing={isEditing}
        onChange={handleChange}
      />
      <DetailRow
        label="Chronic Issues"
        name="conditions"
        value={form.conditions}
        isEditing={isEditing}
        onChange={handleChange}
      />
    </section>
  );
}

const DetailRow = ({ label, name, value, isEditing, onChange }) => (
  <div className="flex items-start gap-3">
    <label className="font-semibold w-32 text-sm pt-2">{label}:</label>
    {isEditing ? (
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="flex-1 px-3 py-1 border rounded-md text-sm"
      />
    ) : (
      <p className="text-sm pt-2">{value || "—"}</p>
    )}
  </div>
);

const ProfileIcon = () => (
  <div className="w-20 h-20 rounded-full bg-purple-300 flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
      <path d="M4 20c0-2.7 5.3-4 8-4s8 1.3 8 4v1H4v-1z" />
    </svg>
  </div>
);

const Skeleton = () => (
  <div className="space-y-2 animate-pulse max-w-md mx-auto">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-4 bg-gray-300 rounded w-full" />
    ))}
  </div>
);

const ComingSoon = ({ who }) => (
  <p className="text-center text-gray-500 mt-20">{who} panel coming soon…</p>
);
