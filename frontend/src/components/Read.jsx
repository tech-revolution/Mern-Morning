import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

async function handleDelete(id){
  const response = await fetch(`http://localhost:5500/${id}`,{
    method:'DELETE'
  });
  const result = await response.json();
  if (!response.ok) {
    // console.log(result.error);
    setError(result.error);
  }
  if (response.ok) {
    
    setError("Deleted Successfully");
    setTimeout(() => {
      getData();
      setError("");
    }, 2000);
  }

}

  async function getData() {
    const response = await fetch("http://localhost:5500/");
    const result = await response.json();
    console.log(result)
    if (!response.ok) {
      // console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2 mt-6" >
      {error && <div class="alert alert-danger">
        {error}
      </div>}
      <h1>All Data</h1>
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-start p-2">Name : {ele.name}</h3>
                <h6 className="card-title text-start p-2">Email : {ele.email}</h6>
                <h6 className="card-subtitle mb-2 p-2 text-start text-body-secondary">Age : {ele.age}</h6>
                <Link className="btn btn-outline-primary mx-3 mt-3" to={`/${ele._id}`}>Edit</Link>
                <Link className="btn btn-outline-danger mx-3 mt-3" onClick={()=>handleDelete(ele._id)}>Delete</Link>
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Read
