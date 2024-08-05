import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import "./Login.css"; // Import external CSS file

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    };

    return (
        <div>
            <Header />
            <div className="login-card">
                <h3>Welcome to Login Page</h3>
                <div className="form-group">
                    <label htmlFor="username">USERNAME</label>
                    <input
                        id="username"
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">PASSWORD</label>
                    <input
                        id="password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary mr-3" onClick={handleApi}>LOGIN</button>
                <Link className="btn btn-secondary m-3" to="/signup">SIGNUP</Link>
            </div>
        </div>
    );
}

export default Login;
