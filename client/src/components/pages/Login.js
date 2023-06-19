import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'universal-cookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import {MoonLoader } from "react-spinners"
import { ThreeDots } from "react-loader-spinner"

import { loginApi, removeTokens } from '../../api/userApi';
import '../../assets/css/Login.scss';

export default function SignInPage() {
    const cookies = new Cookies();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [processLogin, setProcessLogin] = useState(false);

    if(cookies.get('accessToken')){
        window.location.href = '/'
    }

    const login = () => {
        if (username === "" || password === "") {
            // Alert
            return toast.error('Chưa nhập thông tin!', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        setProcessLogin(true);
        let res = loginApi(username, password)
            .then(res => {
                setProcessLogin(false);
                // Set access token
                cookies.set('accessToken', res.accessToken, { path: '/' });
                // Set refresh token
                cookies.set('refreshToken', res.refreshToken, { path: '/' });
                // Alert
                toast.success('Đăng nhập thành công!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    onClose: () => window.location.href = '/'
                });
            })
            .catch(err => {
                setProcessLogin(false);
                // Alert
                return toast.error('Thông tin đăng nhập không chính xác! Vui lòng kiểm tra lại!', {
                    position: toast.POSITION.TOP_CENTER
                });
            })

    }

    return (

        <section className="vh-100 container-fluid p-0">
            <div className="row">
                <ToastContainer />

                <div className='container-fluid h-custom position-absolute justify-content-center bg-light p-0 vh-100 w-100'
                style={{
                    display: processLogin ? "flex": "none",
                    opacity: 0.8
                }}
                >
                    <ThreeDots 
                        height="80"
                        width="80"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={
                            {alignItems: 'center'}
                        }
                        wrapperClassName=""
                        visible={processLogin}
                    />
                </div>

                <div className="container-fluid h-custom p-0">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 fs-2">Đăng nhập</p>
                                </div>

                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4 px-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Nhập username, số điện thoại hoặc email"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)} />
                                    <label className="form-label" htmlFor="form3Example3">Thông tin</label>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-3 px-4">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)} />
                                    <label className="form-label" htmlFor="form3Example4">Mật khẩu</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Nhớ mật khẩu trong 30 ngày
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Quên mật khẩu?</a>
                                </div>

                                <div className="text-center mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg login-button"
                                        onClick={() => login()}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Chưa có tài khoản? </p>
                                    <p className="link-danger"><Link to="/register">Đăng ký ngay</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div
                    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    {/* <!-- Copyright --> */}
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2020. All rights reserved.
                    </div>
                    {/* <!-- Copyright --> */}

                    {/* <!-- Right --> */}
                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    {/* <!-- Right --> */}
                </div>

            </div>
        </section>
    )
}
