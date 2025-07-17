import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [mobile,setMobile]=useState("");
    const [name,setName]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");
    const backendApi=import.meta.env.VITE_BACKEND_URL;
    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${backendApi}/auth/register`,{
                method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                name,password,mobile,email
              })
            });
            if(response.ok){
                setSuccess("Registration successfull!");
                setError("");
                console.log(response);
                navigate("/login");
            }
        }
        catch(err){
            console.error("Registration failed",err);
            setError("Registration failed. Please try again.");
            setSuccess("");
        }
    };
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100  px-4 ">
        <div>{success}</div>
            <form 
            onSubmit={handleRegister}
              className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
              >
               <h2 className="text-2xl font-bold mb-6 text-gray-800 ">Register</h2>

               <div className="mb-4">
                <label className=" block text-gray-700 mb-1">Name</label>
                <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-100  "
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                ></input>
               </div>

               <div className="mb-4">
                <label className=" block text-gray-700 mb-1">Email</label>
                <input
                type="eamil"
                className="w-full px-4 py-2 border rounded-md bg-gray-100  "
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                ></input>
                </div> 
  <div className="mb-4">
                    <label className=" block text-gray-700 mb-1">Mobile</label>
                    <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100  "
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                    required
                    ></input>
                </div>
                <div className="mb-4">
                    <label className=" block text-gray-700 mb-1">Password</label>
                    <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100  "
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    ></input>
                </div>
               <button 
               type="submit"
               className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
               >Register</button>

            </form>
        </div>
    )
    

}