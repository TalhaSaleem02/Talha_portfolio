import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });

            const data = await response.json();
            if (response.ok) {
                router.push("/auth/signin"); // Redirect to login after signup
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch (err) {
            setError("Error connecting to server");
        }
    };

    return (
        <div className="flex flex-center full-h">
            <div className="loginform">
                <div className="heading">Sign Up Create Admin</div>

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
                    <input
                        type="password"
                        name="confirmPassword"
                        className="input"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button className="login-button" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}


// export default function singup(){
//   return <>

//     <h1>You Don't Have permision to Signup To this Admin Dashboard</h1>
  
//   </>
// }