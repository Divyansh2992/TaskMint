import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        number: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/", formData, {
                withCredentials: true
            });
            setSuccess("Signup successful! Redirecting to dashboard...");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 2000);
        } catch {
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="auth-modal-bg">
            <div className="auth-modal">
                <button className="auth-close-btn" onClick={() => window.location.href = "/"}>×</button>
                <h2 className="auth-title">Welcome to TaskMint</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <label className="auth-label">What's your name?</label>
                    <input
                        className="auth-input"
                        type="text"
                        name="username"
                        placeholder="Name"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <label className="auth-label">What's your e-mail?</label>
                    <input
                        className="auth-input"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label className="auth-label">Your password?</label>
                    <input
                        className="auth-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label className="auth-label">Phone Number</label>
                    <input
                        className="auth-input"
                        type="text"
                        name="number"
                        placeholder="98xxxxxxxx"
                        value={formData.number}
                        onChange={handleChange}
                        required
                    />
                    <button className="auth-submit-btn" type="submit">Let’s Begin Your Journey</button>
                </form>
                {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
                {success && <p style={{ color: "green", marginTop: 10 }}>{success}</p>}
                <div className="auth-footer">
                    <a href="/login">Sign in with your account</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
