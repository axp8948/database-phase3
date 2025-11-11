import { useState } from "react";
import "./App.css";

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Get Item by ID or Name
  const searchItem = async () => {
    if (!id && !name) {
      setMessage("Please enter an Item ID or Name");
      return;
    }

    const query = id ? `id=${id}` : `name=${name}`;
    try {
      const res = await fetch(`${API_URL}/api/item?${query}`);
      const data = await res.json();
      setResult(data);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  // Insert Item
  const insertItem = async () => {
    try {
      const res = await fetch(`${API_URL}/api/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iId: 999, // example iId
          Iname: "Frozen Broccoli",
          Sprice: 3.99,
          Idescription: "Vitamin A,B,C",
        }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // Update Frozen Brocoli to Organic Frozen Brocoli
  const updateItem = async () => {
    try {
      const res = await fetch(`${API_URL}/api/item/update`, {
        method: "PUT",
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Organic Fresh Brocoli
  const deleteItem = async () => {
    try {
      const res = await fetch(`${API_URL}/api/item/delete`, {
        method: "DELETE",
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Best Price Store - Item Operations</h1>

      {/* Search */}
      <div className="card">
        <h2>Q1: Search Item</h2>
        <input
          type="text"
          placeholder="Enter Item ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <span style={{ margin: "0 10px" }}>or</span>
        <input
          type="text"
          placeholder="Enter Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={searchItem}>Search</button>
        {result && result.length > 0 && (
          <div className="result">
            <h3>Results:</h3>
            {result.map((item) => (
              <div key={item.iId} className="item-card">
                <p><strong>Item ID:</strong> {item.iId}</p>
                <p><strong>Name:</strong> {item.Iname}</p>
                <p><strong>Price:</strong> ${parseFloat(item.Sprice).toFixed(2)}</p>
                <p><strong>Description:</strong> {item.Idescription}</p>
              </div>
            ))}
          </div>
        )}

        {result && result.length === 0 && (
          <div className="result">
            <h3>No item found.</h3>
          </div>
        )}

      </div>

      {/* Insert */}
      <div className="card">
        <h2>Q2: Insert Item</h2>
        <button onClick={insertItem}>Insert “Frozen Broccoli”</button>
      </div>

      {/* Update */}
      <div className="card">
        <h2>Q3: Update Item</h2>
        <button onClick={updateItem}>
          Update “Frozen Broccoli” to “Organic Fresh Broccoli”
        </button>
      </div>

      {/* Delete */}
      <div className="card">
        <h2>Q4: Delete Item</h2>
        <button onClick={deleteItem}>Delete “Organic Fresh Broccoli”</button>
      </div>

      {message && <p className="msg">{message}</p>}
    </div>
  );
}

export default App;
