import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import "./Signup.css"; // Import external CSS file

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const handleApi = () => {
        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR');
            });
    };

    return (
        <div>
            <Header />
            <div className="signup-card">
                <h3>Welcome to Signup Page</h3>
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
                    <label htmlFor="mobile">MOBILE</label>
                    <input
                        id="mobile"
                        className="form-control"
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">EMAIL</label>
                    <input
                        id="email"
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button className="btn btn-primary mr-3" onClick={handleApi}>SIGNUP</button>
                <Link className="btn btn-secondary m-3" to="/login">LOGIN</Link>
            </div>
        </div>
    );
}

export default Signup;
