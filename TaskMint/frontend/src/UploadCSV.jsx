import React, { useState } from "react";
import axios from "axios";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setError("");
    setSuccess("");
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    const allowedExtensions = [".csv", ".xls", ".xlsx"];
    const fileName = selectedFile.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    if (!allowedTypes.includes(selectedFile.type) && !hasValidExtension) {
      setError("Only CSV, XLS, and XLSX files are allowed.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!file) {
      setError("Please select a valid file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:3000/upload-csv", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("File uploaded and tasks distributed successfully.");
      setFile(null);
    } catch (err) {
      setError("Failed to upload file. Make sure it is a valid CSV, XLS, or XLSX file.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Upload CSV/XLS/XLSX</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <button type="submit" className="auth-submit-btn" style={{ width: "100%" }}>Upload</button>
      </form>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: 16 }}>{success}</div>}
    </div>
  );
};

export default UploadCSV;
