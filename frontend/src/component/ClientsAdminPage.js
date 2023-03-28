import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import	axios from "../axios"
import Loading from './Loading';
function ClientsAdminPage() {

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("usres  1                        ",users)

  useEffect(()=>{
    setLoading(true);
    axios.get("/users")
    .then(({data})=>{
      console.log("data 2                         ",data)
      setLoading(false);
      setUsers("hi");
      console.log("users 2                         ",users)
    })
    .catch((e)=>{
      console.log("                 error from catch                 ")

      setLoading(false);
      console.log(e)
    })
  },[])

  if(loading) return <Loading/>
  console.log("users  3                        ",users)

  if(users.length===0) return <h2 className='py-2 text-center'>No users yet</h2>

  return (
    <>

<div>ClientsAdminPage</div>


<Table responsive striped bordered hover>
    <thead>
        <tr>
            <th>Client Id</th>
            <th>Client Name</th>
            <th>Items</th>
            <th>E mail</th>
        </tr>
    </thead>
    <tbody>
        {users.map(user=>(
        <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>

        </tr>))}
    </tbody>
</Table>

    </>


  )
}

export default ClientsAdminPage