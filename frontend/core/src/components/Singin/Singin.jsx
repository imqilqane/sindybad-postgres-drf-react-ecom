import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import "../../assets/css/singin.css"
import axios from "axios"
import axiosInstance from '../../axios';


const Singin = () => {
    const navigate = useNavigate();
    const userData = Object.freeze({
        email : '',
        password : ''
    });
    const [user, setUSer] = useState(userData);
    const collectData = (e) => {
        setUSer({...user, [e.target.name.trim()]:e.target.value.trim()});
        console.log(user);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("auth/login/", user).then(res => {
            localStorage.setItem('access',res.data.token.access);
            localStorage.setItem('refresh',res.data.token.refresh);
            navigate('/')
        }).catch(err => {
            console.log(err);
        })
    };
    return (
        <div className="singin">
            <p className="category">Home / Sing in</p>
            <div className="container">
                <div className="row">
                <div className="col-md-3"></div>

                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <input type="email" placeholder="your email" name="email" onChange={collectData} />
                            </div>
                            <div className="row">
                                <input type="password" placeholder="your password" name="password" onChange={collectData}/>
                            </div>
                            <div className="row">
                                <button className="btn login">Sing in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singin;