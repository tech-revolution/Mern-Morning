import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const {id} = useParams();

  const getSingleData = async ()=>{
    const response = await fetch(`http://localhost:5500/${id}`)
    const result = await response.json();
    
    if (response.ok) {
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  }

  const handleUpdate = async (e)=>{
    e.preventDefault();

    const updateUser = { name, email, age };
    const response = await fetch(`http://localhost:5500/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser)

    })
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      navigate("/all");
    }
  }



  useEffect(()=>{
    getSingleData();
  },[])

  return (
    <div className="container mt-4">
      {error && <div class="alert alert-danger">
        {error}
      </div>}
      <h1>Edit Data</h1>
      <div className="row">
        <div className="col-md-6 m-auto">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Enter Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Enter Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Enter Age</label>
              <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update
