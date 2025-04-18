"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react"; // Import signIn from NextAuth

export default function Signin() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const router = useRouter();

    // Handle Input Changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Attempt to sign in using NextAuth's credentials provider
            const result = await signIn("credentials", {
                redirect: false, // Prevent automatic redirects
                email: form.email,
                password: form.password,
            });

            if (!result.error) {
                // Successful sign-in, redirect to homepage or dashboard
                router.push("/");
            } else {
                setError(result.error || "Invalid email or password");
            }
        } catch (error) {
            setError("Sign-in failed. Please try again.");
        } finally {
            setLoading(false);

            // Automatically clear error message after 4 seconds
            setTimeout(() => {
                setError("");
            }, 4000);
        }
    };

    return (
        <div className="flex flex-center full-h">
            <div className="loginform">
                <div className="heading">Sign In</div>

                {error && <p className="error">{error}</p>}

                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Enter email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="login-button" type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
