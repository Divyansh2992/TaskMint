import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const [tasks, setTasks] = useState([]);
    const [doneRows, setDoneRows] = useState([]);

    useEffect(() => {
        // Fetch dashboard welcome message
        axios.get("http://localhost:3000/dashboard", { withCredentials: true })
            .then(res => setMessage(res.data))
            .catch(() => {
                alert("You are not authorized. Redirecting to login.");
                window.location.href = "/login";
            });
        // Fetch user tasks
        axios.get("http://localhost:3000/my-tasks", { withCredentials: true })
            .then(res => setTasks(res.data.tasks || []));
    }, []);

    const handleTaskDone = async (idx) => {
        try {
            await axios.post("http://localhost:3000/mark-task-done", { index: idx }, { withCredentials: true });
            setDoneRows(rows => [...rows, idx]);
            // Do not remove the row, just mark as done (green)
        } catch (error) {
            alert("Failed to mark task as done.");
        }
    };

    const handleTaskRemove = async (idx) => {
        try {
            await axios.post("http://localhost:3000/remove-task", { index: idx }, { withCredentials: true });
            setTasks(tasks => tasks.filter((_, i) => i !== idx));
        } catch (error) {
            alert("Failed to remove task.");
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: 40, fontSize: "2.7rem" }}>Dashboard</h1>
            <p style={{ textAlign: "center", fontSize: "1.2rem", marginBottom: 30 }}>{message}</p>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Your Tasks</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <table style={{ borderCollapse: "collapse", minWidth: 420, fontSize: "1.1rem", background: "#fff", borderRadius: 8, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" }}>
                    <thead style={{ background: "#f5f5f5" }}>
                        <tr>
                            <th style={{ padding: "10px 18px", borderBottom: "2px solid #eee" }}>S.No.</th>
                            <th style={{ padding: "10px 18px", borderBottom: "2px solid #eee" }}>FirstName</th>
                            <th style={{ padding: "10px 18px", borderBottom: "2px solid #eee" }}>Phone</th>
                            <th style={{ padding: "10px 18px", borderBottom: "2px solid #eee" }}>Notes</th>
                            <th style={{ padding: "10px 18px", borderBottom: "2px solid #eee" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: "center", padding: 20 }}>No tasks assigned.</td></tr>
                        ) : (
                            tasks.map((task, idx) => (
                                <tr key={idx} style={{ borderBottom: "1px solid #f0f0f0", background: doneRows.includes(idx) ? '#d4edda' : undefined, transition: 'background 0.3s' }}>
                                    <td style={{ padding: "8px 14px", textAlign: "center" }}>{idx + 1}</td>
                                    <td style={{ padding: "8px 14px" }}>{task.FirstName}</td>
                                    <td style={{ padding: "8px 14px" }}>{task.Phone}</td>
                                    <td style={{ padding: "8px 14px" }}>{task.Notes}</td>
                                    <td style={{ padding: "8px 14px", textAlign: "center" }}>
                                        <button style={{marginRight:8}} onClick={() => handleTaskDone(idx)} disabled={doneRows.includes(idx)}>Done</button>
                                        <button onClick={() => handleTaskRemove(idx)}>Remove</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
