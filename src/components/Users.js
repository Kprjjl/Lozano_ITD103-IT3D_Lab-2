import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
    const { id } = useParams()

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success btn-sm">
                    Add +
                </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, index) => {
                                return <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                        <button className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;