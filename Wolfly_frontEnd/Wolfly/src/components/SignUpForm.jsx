import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import Alert from '@mui/material/Alert';
import { useRegisterUserMutation } from '../services/userAuthApi';
import { motion } from "framer-motion";
const Login = () => {

    // navigate
    const navigate = useNavigate();
    const [registerUser,{isLoading}]=useRegisterUserMutation()
   
    // store form info
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        terms_condition:false

    });
    // show message
    const [showMsg, setMsg] = useState({
        status: false,
        severity: '',
        msg: ''

    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        let check = document.getElementById('check').checked
        console.log(check)
        console.log(form.name)
        console.log(form.email)
        console.log(form.password)
        console.log(form.password2)
        if (form.name && form.email && form.password && form.password2 && check) {
            if (!/\S+\.\S+/.test(form.email)) {
                setMsg({ status: true, severity: 'warning', msg: 'Email is invalid' })
            }
            else if (form.password.length < 8) {
                setMsg({ status: true, severity: 'warning', msg: 'Password must be 8 character' })
            }
            else if (form.password !== form.password2) {
                setMsg({ status: true, severity: 'warning', msg: 'Password and Confirm_password must be equal' })
            }
            else {
                
                setForm(form.terms_condition=check)
                const response = await registerUser(form)
                // show error and success message in front end
                try{
                    if(response.error){
                        const error_msg=response.error.data.errors.email[0]
                        setMsg({ status: true, severity: 'error', msg: error_msg })
                    }
                    else{
                        const success_msg=response.data.msg
                        setMsg({ status: true, severity: 'success', msg: success_msg })
                        setTimeout(()=>{
                            navigate('/login')
    
                        },2000)
                    }
                }
                catch(error){
                    setMsg({ status: true, severity: 'error', msg: "Server Error" })
                }
                
            }
        }
        else {
            setMsg({ status: true, severity: 'warning', msg: 'All Field Required' })
        }
    }

    return (
        <>
            <div className='flex items-center justify-center h-screen w-full bg-[url("your.png")] bg-cover bg-center ' >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="backdrop-blur-xl bg-opacity-10 bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full border border-gray-600"
                    >
                       <h2 className="text-4xl font-bold text-center text-black mb-8">Sign Up</h2>
                <form className='space-y-6 ' onSubmit={handleSubmit} id='LoginForm'>
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            className="peer  w-full h-full bg-transparent  font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border-blue-gray-200 border-2 focus:border-1 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded border-blue-gray-200 focus:border-black shadow-lg"
                            placeholder=" " type='text'
                            value={form.name}
                            onChange={(event) => {
                                setForm({ ...form, name: event.target.value })
                                setMsg({ status: false })
                            }}
                            
                            name='name'
                        /><label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.79] text-blue-gray-400 peer-focus:text-black before:border-blue-gray-200 peer-focus:before:!border-black after:border-sky-gray-200 peer-focus:after:!border-black">Name*

                        </label>
                        
                    </div>
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            className="peer  w-full h-full bg-transparent  font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border-blue-gray-200 border-2 focus:border-1 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded border-blue-gray-200 focus:border-black shadow-lg"
                            placeholder=" " type='text'
                            value={form.email}
                            onChange={(event) => {
                                setForm({ ...form, email: event.target.value })
                                setMsg({ status: false })
                            }}
                            // required
                            name='email'
                        /><label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.79] text-blue-gray-400 peer-focus:text-black before:border-blue-gray-200 peer-focus:before:!border-black after:border-sky-gray-200 peer-focus:after:!border-black">Email Address*

                        </label>
                    </div>


                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            className="peer  w-full h-full bg-transparent  font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border-blue-gray-200 border-2 focus:border-1 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded border-blue-gray-200 focus:border-black shadow-lg"
                            placeholder=" " type='password'
                            value={form.password}
                            onChange={(event) => {
                                setForm({ ...form, password: event.target.value })
                                setMsg({ status: false })
                            }}
                        
                            name='password'
                        /><label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.79] text-blue-gray-400 peer-focus:text-black before:border-blue-gray-200 peer-focus:before:!border-black after:border-sky-gray-200 peer-focus:after:!border-black">Password*

                        </label>
                    </div>
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            className="peer  w-full h-full bg-transparent  font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border-blue-gray-200 border-2 focus:border-1 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded border-blue-gray-200 focus:border-black shadow-lg"
                            placeholder=" " type='password'
                            value={form.password2}
                            onChange={(event) => {
                                setForm({ ...form, password2: event.target.value })
                                setMsg({ status: false })
                            }}
                           
                            name='password2'
                        /><label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.79] text-blue-gray-400 peer-focus:text-black before:border-blue-gray-200 peer-focus:before:!border-black after:border-sky-gray-200 peer-focus:after:!border-black">Confirm_Password*

                        </label>
                    </div>
                    <div>

                        <button type='submit' className="text-white w-full  bg-black  py-2 mb-5 px-6 focus:outline-none  hover:bg-gray-500 rounded text-lg">{isLoading ? <div className='flex justify-center'> <ThreeCircles
                            visible={true}
                            height="26"
                            width="25"
                            color="#fff"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /></div> : 'Register'}</button>
                        <p>
                            <input type='checkbox' name='checkboxs' id='check' />
                            <label htmlFor='check'> Agree terms & conditions*</label>
                        </p>
                    </div>
                    {
                        showMsg.status ?
                            <div className='flex justify-center'>
                                <Alert severity={showMsg.severity}>{showMsg.msg}</Alert>
                            </div>
                            :
                            <></>
                    }

                </form>
                </motion.div>
            </div>

        </>

    )
}
export default Login;  