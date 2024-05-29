import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";


const Create = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  console.log(name, email, age)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age };
    console.log(addUser)
    const response = await fetch("http://localhost:5500/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser)

    })
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setName("");
      setEmail("");
      setAge("");
      setError("");
      navigate("/all");
    }

  }

  return (
    <div className="container mt-4">
      {error && <div class="alert alert-danger">
        {error}
      </div>}
      <h1>Enter Data</h1>
      <div className="row">
        <div className="col-md-6 m-auto">
          <form onSubmit={handleSubmit}>
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

export default Create

