// when user forgot pin
import { ThreeCircles } from 'react-loader-spinner';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/userAuthApi';

const ResetPassword = () => {
    const navigate=useNavigate();
    const [resetPassword,{isLoading}]=useResetPasswordMutation();
    const {id,token}=useParams();//extract id and token from url
    // store form info
    const [form, setForm] = useState({
        password: "",
        password2: ""

    });
    // show message
    const [showMsg, setMsg] = useState({
        status: false,
        severity: '',
        msg: ''

    })
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.password && form.password2) {
            if (form.password.length < 8) {
                setMsg({ status: true, severity: 'warning', msg: 'Password must be 8 character' })
            }
            else if (form.password!==form.password2) {
                setMsg({ status: true, severity: 'warning', msg: 'Password and Confirm_password must be equal' })
            }
            else {

               
                const response=await resetPassword({form,id,token});
                
                if(response.error){
                    const error_msg=response.error.data.errors.non_field_errors[0];
                    setMsg({ status: true, severity: 'error', msg: error_msg})
                }
                else{
                    const success_msg=response.data.msg;
                    setMsg({ status: true, severity: 'success', msg: success_msg })
                    setTimeout(()=>{
                        navigate('/')
                    },2000)
                }
               
                
            }
        }
        else {
            setMsg({ status: true, severity: 'warning', msg: 'All Field Required' })
        }
    }
    return (
        <>
            <div className='flex items-center justify-center mt-32 w-full bg-[url("your.png")] bg-cover bg-center '>
            <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="backdrop-blur-xl bg-opacity-10 bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full border border-gray-600"
                    >
                <h2 className='md:hidden text-center mt-7 font-semibold text-xl'>Change Your Password</h2>
               
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit} id="resetpassword">
                        <h2 className='text-center mt-7 text-xl font-semibold hidden md:block'>Change Your Password</h2>
                        <div className="relative w-full min-w-[200px] h-11">
                            <input
                                className="peer  w-full h-full bg-transparent  font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border-blue-gray-200 border-2 focus:border-1 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded border-blue-gray-200 focus:border-sky-500 shadow-lg"
                                placeholder=" " type='password'
                                value={form.password}
                                onChange={(event) => {
                                    setForm({ ...form, password: event.target.value })
                                    setMsg({ status: false })
                                }}

                                name='password'
                            /><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.79] text-blue-gray-400 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-sky-gray-200 peer-focus:after:!border-sky-500">Password*

                            </label>
                        </div>
                        <div className="relative w-full min-w-[200px] h-11">
                            <input
                                className="peer  w-full h-full bg-transparent  font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border-blue-gray-200 border-2 focus:border-1 border-t-transparent focus:border-t-transparent text-lg px-3 py-2.5 rounded border-blue-gray-200 focus:border-sky-500 shadow-lg"
                                placeholder=" " type='password'
                                value={form.password2}
                                onChange={(event) => {
                                    setForm({ ...form, password2: event.target.value })
                                    setMsg({ status: false })
                                }}

                                name='password2'
                            /><label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.79] text-blue-gray-400 peer-focus:text-sky-500 before:border-blue-gray-200 peer-focus:before:!border-sky-500 after:border-sky-gray-200 peer-focus:after:!border-sky-500">Confirm_Password*

                            </label>
                        </div>
                        <p>

                            <button type='submit' className="text-white w-full  bg-sky-500  py-2 mb-5 px-6 focus:outline-none  hover:bg-sky-600 rounded text-lg">{isLoading ? <div className='flex justify-center'> <ThreeCircles
                                visible={true}
                                height="26"
                                width="25"
                                color="#fff"
                                ariaLabel="three-circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            /></div> : 'Update Password'}</button>

                        </p>
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

export default ResetPassword;