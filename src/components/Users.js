import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";

function Users() {
    const { id } = useParams()

    const [data, setData] = useState([])
    
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
                </table>
            </div>
        </div>
    );
}