import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password
            }, { withCredentials: true });
            if (response.data === "Login successful") {
                setError("");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000);
            }
        } catch {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-modal-bg">
            <div className="auth-modal auth-modal-animate">
                <button className="auth-close-btn" onClick={() => window.location.href = "/"}>×</button>
                <h2 className="auth-title">Login to TaskMint</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <label className="auth-label">What's your e-mail?</label>
                    <input
                        className="auth-input"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <label className="auth-label">Your password?</label>
                    <input
                        className="auth-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button className="auth-submit-btn" type="submit">Login</button>
                </form>
                {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
                <div className="auth-footer">
                    <a href="/signup">Create an account</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
