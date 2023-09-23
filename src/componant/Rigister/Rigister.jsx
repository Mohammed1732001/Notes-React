import React from 'react'
import "./Rigister.css";
import notesImg from "../../images/notes1.png"
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios, { Axios } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'


export default function Rigister() {
    const navigate = useNavigate()
    const [regErore, setRegErore] = useState(null)
    const [isLoding, setIsLoding] = useState(false)

    async function handelRegistrion(reOpject) {
        setIsLoding(true)
        let { data } = await axios.post("https://route-movies-api.vercel.app/signup", reOpject)
        if (data.message === "success") {
            setIsLoding(false)
            navigate("/login")
        }
        else {
            setIsLoding(false)
            setRegErore(data.errors.email.message)
        }

    }

    const validtion = Yup.object({
        first_name: Yup.string().required("frist name is required").min(3, "minmum 3 character").max(15, "maxmum 15 character"),
        last_name: Yup.string().required("last name is required").min(3, "minmum 3 character").max(15, "maxmum 15 character"),
        email: Yup.string().required("email is required").email("email is in valid"),
        password: Yup.string().required("password  is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        age: Yup.number().required("Age is required").min(18, "min age is 10 ").max(100, "max age is 100"),

    })


    let formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            age: "",
        },
        validationSchema: validtion,
        onSubmit: handelRegistrion

    })

    return <div className='body'>
        <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
            <i className="fa-regular fa-note-sticky text-info fs-2"></i>
            <p className='ps-2 text-info fs-4 fw-bold'>Notes</p>
        </li>
        <div className='container'>
            <div className='row'>
                <div className=' min-vh-100 half-img mt-5 col-lg-5 d-none d-lg-flex justify-content-center align-items-center'>
                    <img className='w-100 p-5' src={notesImg} />
                </div>
                <div className='col-lg-7'>
                    <div className='min-vh-100 d-flex justify-content-center align-items-center text-center signup-container'>
                        <div className='bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2'>
                            <h1 className='fw-bold text-info'>Sign Up Now</h1>
                            <div className='pt-3'>
                                <form onSubmit={formik.handleSubmit}>
                                    {regErore && <p className='alert alert-danger'>{regErore} </p>}
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='frist-name' type="text" name='first_name' id='first_name' className='form-control my-2' />
                                    {formik.errors.first_name && formik.touched.first_name ? <p className='text-danger text-start'>{formik.errors.first_name}</p> : null}
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Last name' type="text" name='last_name' id='last_name' className='form-control my-2' />
                                    {formik.errors.last_name && formik.touched.last_name ? <p className='text-danger text-start'>{formik.errors.last_name}</p> : null}
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='email' type="email" name='email' id='email' className='form-control my-2' />
                                    {formik.errors.email && formik.touched.email ? <p className='text-danger text-start'>{formik.errors.email}</p> : null}
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='password' type="password" name='password' id='password' className='form-control my-2' />
                                    {formik.errors.password && formik.touched.password ? <p className='text-danger text-start'>{formik.errors.password}</p> : null}
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Age' type="number" name='age' id='age' className='form-control my-2' />
                                    {formik.errors.age && formik.touched.age ? <p className='text-danger text-start'>{formik.errors.age}</p> : null}
                                    {isLoding ? <button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'> <i class="fa-solid fa-spinner fa-spin"></i></button> : <button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'> Sign Up</button>}
                                    <p className='pt-2 text-light'>Already have account <br /> <Link className='text-decoration-none text-info' to='/login'>Login Now</Link></p>
                                </form>

                            </div>


                        </div>
                    </div>
                </div>


            </div>

        </div>

    </div>


}
