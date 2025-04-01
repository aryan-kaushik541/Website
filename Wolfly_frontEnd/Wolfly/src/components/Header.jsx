import React from 'react'
import { NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext,useEffect } from 'react';
import {Appstate} from '../App'
import { getToken,deleteToken } from '../services/LocalStorageToken';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const useAppState = useContext(Appstate);
  const [storeToken,setToken]=useState('')
  const { access_token } = getToken();
  const navigate = useNavigate();
  
  useEffect(() =>{
    const f1 = ()=>{
      // get number of item in cart
      const numberCartItem=JSON.parse(localStorage.getItem('products'))
    
      if (numberCartItem){
        useAppState.setAddCart(numberCartItem.length)

      }
  
      
    }
    f1();
    

  },[])
 
  useEffect(()=>{
    setToken(access_token);
  },[props.auth])
  
  const handleLogout = () => {
    deleteToken();
    setToken(''); // Clear the state
    navigate("/")
  };
  
  return (
    <>
   
      <header className='flex flex-col min-w-56 md:sticky md:-top-1 z-10 '>
      
        <section className='p-5 flex md:justify-between md:flex-row flex-col bg-white'>
          <div >
            <span className='border-2 border-dark-teal font-mono  p-2 font-bold'><span className='mx-1 p-1 bg-dark-teal text-teal-100'>Wolfly</span><span></span></span>
          </div>
          <nav className='md:my-0 my-2'>
              <ul className='flex gap-x-5 gap-y-5 items-center text-xl justify-between flex-wrap'>
                <li>
                  <NavLink to="/" style={({ isActive }) => ({
                            fontWeight:  isActive ? "bold" : ""
                        })} className="group transition duration-300">
                    Home
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-dark-teal"></span>
                  </NavLink>
                </li>
                
                <li>
                  <NavLink to="/about" style={({ isActive }) => ({
                            fontWeight:  isActive ? "bold" : ""
                        })} className="group transition duration-300">
                  About
                  <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-dark-teal'></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/product" style={({ isActive }) => ({
                            fontWeight:  isActive ? "bold" : ""
                        })} className="group transition duration-300">
                  Product
                  <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-dark-teal'></span>
                  </NavLink>

                </li>
                
                <li>
                  <NavLink to="/contact" style={({ isActive }) => ({
                            fontWeight:  isActive ? "bold" : ""
                        })} className="group transition duration-300">
                  Contact
                  <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-dark-teal'></span>
                  </NavLink>
                </li>
              
               { 
               storeToken?
                <li>
                <button onClick={handleLogout}  className="group transition duration-300">
                  Logout
                  <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-dark-teal'></span>
                  </button>
                </li>
                :
                <li>
                <NavLink to="/login" style={({ isActive }) => ({
                            fontWeight:  isActive ? "bold" : ""
                        })} className="group transition duration-300">
                  Login
                  <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-dark-teal'></span>
                  </NavLink>
                </li>
                }
                <li>
                  <NavLink to={access_token?`/Checkout`:`/login`} className="flex  bg-dark-teal text-teal-100 justify-center px-5 py-1 text-sm rounded-md">
                      <ShoppingCartIcon/>
                      <p className='pl-2 text-lg'>{useAppState.addCart}</p>
                  </NavLink>
                </li>
              </ul>
          </nav>
        </section>
      </header>
    </>
  )
}

export default Header