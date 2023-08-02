import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  //console.log(logdata);

  const adddata = (e) => {
    const{name,value} = e.target;

    setData(()=>{
        return {
            ...logdata,
            [name]:value
        }
    })

  }

  const senddata = async(e)=>{
    e.preventDefault();

    const {email,password} = logdata;

    const res = await fetch("/login" , {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    });

    const data = await res.json();
    console.log(data);

    if(res.status === 400 || !data){
      console.log("invalid details");
      toast.warn('Invalid Details', {
        position: "top-center",
        theme: "colored",})
    }else{
      console.log("data valid");
      toast.success('User Logged In Succesfully', {
        position: "top-center",
        theme: "colored",})
      setData({...logdata,email:"",password:""});
    }
  }


  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-in</h1>
              <div className="form_data">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  onChange={adddata}
                  value={logdata.email}
                  name="email"
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={adddata}
                  value={logdata.password}
                  placeholder="At least 8 Characters"
                  id="password"
                />
              </div>
              <button className="signin_btn" onClick={senddata}>Continue</button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New to Amazon</p>

            <NavLink to="/register">
              <button>Create Your Amazon Account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Sign_in;
