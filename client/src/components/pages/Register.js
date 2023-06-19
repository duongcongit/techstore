import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'universal-cookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import {MoonLoader } from "react-spinners"
import { ThreeDots } from "react-loader-spinner"

import { registerApi, removeTokens } from '../../api/userApi';
import '../../assets/css/Register.scss';

export default function SignUpPage() {
    const cookies = new Cookies();

    const [username, setUsername] = useState("");
    const [fullname, setfullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [agreeFaqCheckbox, setAgreeFaqCheckbox] = useState(false);
    

    const [processRegister, setProcessRegister] = useState(false);

    // if(cookies.get('accessToken')){
    //     window.location.href = '/'
    // }

    const register = () => {
        if (username === "" || fullname === "" || email === "" || phone === "" || address === "" || password === "" || repassword === "") {
            // Alert
            return toast.error('Thông tin chưa được điền đầy đủ! Vui lòng kiểm tra lại!', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        //
        if(!agreeFaqCheckbox){
            return toast.error('Hãy đồng ý với các điều quản của trang web trước khi tiếp tục!', {
                position: toast.POSITION.TOP_CENTER
            });
        }

        setProcessRegister(true);
        // Register
        let res = registerApi(
            username,
            fullname,
            email,
            phone,
            address,
            password
        )
            .then(res => {
                setProcessRegister(false);

                toast.success('Đăng ký thành công! Bạn có thể tới trang đăng nhập để sử dụng tài khoản ngay bây giờ đó!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 10000
                });
            })
            .catch(err => {
                setProcessRegister(false);

                if (err.response) {
                    if (err.response.status == 409) {
                        if (err.response.data.message === "Failed! Username is already in use!") {
                            return toast.error('Không thể sử dụng tên người dùng này! Vui lòng kiểm tra lại!', {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }
                        //
                        if (err.response.data.message === "Failed! Email is already in use!") {
                            return toast.error('Không thể sử dụng email này! Vui lòng kiểm tra lại!', {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }
                        //
                        if (err.response.data.message === "Failed! Phone number is already in use!") {
                            return toast.error('Không thể sử dụng số điệ thoại này! Vui lòng kiểm tra lại!', {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }
                    }
                }
            })

    }

    return (

        <section className="vh-100 container-fluid p-0">
            <div className="row">
                <ToastContainer />

                <div className='container-fluid h-custom position-absolute justify-content-center bg-light p-0 vh-100 w-100'
                    style={{
                        display: processRegister ? "flex" : "none",
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
                            { alignItems: 'center' }
                        }
                        wrapperClassName=""
                        visible={processRegister}
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
                                    <p className="text-center fw-bold mx-3 mb-0 fs-2">Đăng ký tài khoản</p>
                                </div>

                                {/* <!-- Username input --> */}
                                <div className="form-outline mb-4 px-4">
                                    <input type="text" id="inputUsername" className="form-control form-control-lg"
                                        placeholder="Nhập tên người dùng (không thể thay đổi)"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)} />
                                    <label className="form-label" htmlFor="inputUsername">Tên người dùng</label>
                                </div>

                                {/* <!-- Fullname input --> */}
                                <div className="form-outline mb-4 px-4">
                                    <input type="text" id="inputFullname" className="form-control form-control-lg"
                                        placeholder="Nhập họ tên đầy đủ"
                                        value={fullname}
                                        onChange={(event) => setfullname(event.target.value)} />
                                    <label className="form-label" htmlFor="inputFullname">Họ và tên</label>
                                </div>

                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4 px-4">
                                    <input type="text" id="inputEmail" className="form-control form-control-lg"
                                        placeholder="Nhập email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)} />
                                    <label className="form-label" htmlFor="inputEmail">Email</label>
                                </div>

                                {/* <!-- Phone number input --> */}
                                <div className="form-outline mb-4 px-4">
                                    <input type="text" id="inputPhone" className="form-control form-control-lg"
                                        placeholder="Nhập số điện thoại"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)} />
                                    <label className="form-label" htmlFor="inputPhone">Số điện thoại</label>
                                </div>

                                {/* <!-- Address input --> */}
                                <div className="form-outline mb-4 px-4">
                                    <input type="text" id="inputAddress" className="form-control form-control-lg"
                                        placeholder="Nhập địa chỉ"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)} />
                                    <label className="form-label" htmlFor="inputAddress">Địa chỉ</label>
                                </div>


                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-3 px-4">
                                    <input type="password" id="inputPassword" className="form-control form-control-lg"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)} />
                                    <label className="form-label" htmlFor="inputPassword">Mật khẩu</label>
                                </div>

                                {/* <!-- Password input again --> */}
                                <div className="form-outline mb-3 px-4">
                                    <input type="password" id="inputRepassword" className="form-control form-control-lg"
                                        placeholder="Nhập lại mật khẩu"
                                        value={repassword}
                                        onChange={(event) => setRepassword(event.target.value)} />
                                    <label className="form-label" htmlFor="inputRepassword">Xác nhận mật khẩu</label>
                                </div>

                                {/*  */}
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check mb-0">
                                        <input defaultChecked={agreeFaqCheckbox} onChange={() => setAgreeFaqCheckbox(!agreeFaqCheckbox ? true : false)} className="form-check-input me-2" type="checkbox" value="" id="agree-faq-checkbox" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Tôi đồng ý với các điều khoản sử dụng.
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg login-button"
                                        onClick={() => register()}>Đăng ký ngay</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Đã có tài khoản? </p>
                                    <p className="link-danger"><Link to="/login">Đăng nhập ngay</Link></p>
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
