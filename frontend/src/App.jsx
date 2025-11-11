import { useState } from "react";
import "./App.css";

function App() {
  // Search fields
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [result, setResult] = useState(null);

  // Insert fields
  const [insertId, setInsertId] = useState("");
  const [insertName, setInsertName] = useState("");
  const [insertPrice, setInsertPrice] = useState("");
  const [insertDesc, setInsertDesc] = useState("");

  // Update fields
  const [updateOldName, setUpdateOldName] = useState("");
  const [updateNewName, setUpdateNewName] = useState("");
  const [updateNewDesc, setUpdateNewDesc] = useState("");

  // Delete field
  const [deleteName, setDeleteName] = useState("");

  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Search item
  const searchItem = async () => {
    if (!searchId && !searchName) {
      setMessage("Please enter an Item ID or Name");
      return;
    }

    const query = searchId ? `id=${searchId}` : `name=${searchName}`;
    try {
      const res = await fetch(`${API_URL}/api/item?${query}`);
      const data = await res.json();
      setResult(data);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  // Insert item
  const insertItem = async () => {
    if (!insertId || !insertName || !insertPrice || !insertDesc) {
      setMessage("Please fill all fields to insert an item.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          iId: insertId,
          Iname: insertName,
          Sprice: insertPrice,
          Idescription: insertDesc,
        }),
      });
      const data = await res.json();
      setMessage(data.message);

      // clear insert fields
      setInsertId("");
      setInsertName("");
      setInsertPrice("");
      setInsertDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  const updateItem = async () => {
    if (!updateOldName) {
      setMessage("Please enter the current item name.");
      return;
    }

    if (!updateNewName && !updateNewDesc) {
      setMessage("Please enter a new name or new description to update.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/item/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldName: updateOldName,
          newName: updateNewName,
          newDesc: updateNewDesc,
        }),
      });
      const data = await res.json();
      setMessage(data.message);

      setUpdateOldName("");
      setUpdateNewName("");
      setUpdateNewDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete item
  const deleteItem = async () => {
    if (!deleteName) {
      setMessage("Please enter an item name to delete.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/item/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Iname: deleteName }),
      });
      const data = await res.json();
      setMessage(data.message);
      setDeleteName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <header className="store-header">
        <h1>Best Price Grocery Store</h1>
      </header>

      <h2 style={{ color: "#60a5fa" }}>Item Operations</h2>

      {/* Search */}
      <div className="card">
        <h3>Search Item</h3>
        <input
          type="text"
          placeholder="Enter Item ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <span style={{ margin: "0 10px" }}>or</span>
        <input
          type="text"
          placeholder="Enter Item Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={searchItem}>Search</button>

        {result && result.length > 0 && (
          <div className="result">
            <h4>Results:</h4>
            {result.map((item) => (
              <div key={item.iId} className="item-card">
                <p><strong>ID:</strong> {item.iId}</p>
                <p><strong>Name:</strong> {item.Iname}</p>
                <p><strong>Price:</strong> ${parseFloat(item.Sprice).toFixed(2)}</p>
                <p><strong>Description:</strong> {item.Idescription}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Insert */}
      <div className="card">
        <h3>Insert Item</h3>
        <input
          type="text"
          placeholder="Item ID"
          value={insertId}
          onChange={(e) => setInsertId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item Name"
          value={insertName}
          onChange={(e) => setInsertName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Selling Price"
          value={insertPrice}
          onChange={(e) => setInsertPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={insertDesc}
          onChange={(e) => setInsertDesc(e.target.value)}
        />
        <button onClick={insertItem}>Insert Item</button>
      </div>

      {/* Update */}
      <div className="card">
        <h3>Update Item</h3>
        <input
          type="text"
          placeholder="Current Item Name"
          value={updateOldName}
          onChange={(e) => setUpdateOldName(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Item Name (optional)"
          value={updateNewName}
          onChange={(e) => setUpdateNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Description (optional)"
          value={updateNewDesc}
          onChange={(e) => setUpdateNewDesc(e.target.value)}
        />
        <button onClick={updateItem}>Update Item</button>
      </div>

      {/* Delete */}
      <div className="card">
        <h3>Delete Item</h3>
        <input
          type="text"
          placeholder="Item Name to Delete"
          value={deleteName}
          onChange={(e) => setDeleteName(e.target.value)}
        />
        <button onClick={deleteItem}>Delete Item</button>
      </div>

      {message && <p className="msg">{message}</p>}
    </div>
  );
}

export default App;
