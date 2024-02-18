import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

function Users() {
    const { id } = useParams()

    const [data, setData] = useState([])
    const [key, setKey] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortField, setSortField] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [key])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteuser/' + id)
            .then(res => {
                console.log(res)
                setKey(prevKey => prevKey + 1)
            })
            .catch(err => console.log(err))
    }

    const handleSort = (field) => {
        if (sortField === field){
            setSortOrder(sortOrder === 'asc'? 'desc':'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center" style={{ width: 'calc(100% - 100px)' }}>
                        <SearchBar 
                            placeholder="Search name"
                            onChange={(e) => {setSearchTerm(e.target.value)}} 
                        />
                        <div className="d-flex align-items-center">
                            <label htmlFor="sortField" className="m-1">Sort:</label>
                            <select 
                                id="sortField" 
                                value={sortField}
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="name">Name</option>
                                <option value="email">Email</option>
                                <option value="age">Age</option>
                            </select>
                        </div>
                        <div className="d-flex m-1">
                            <input 
                                className="m-1" 
                                type="radio" 
                                id="asc" 
                                name="order" 
                                value="asc" 
                                checked={sortOrder === 'asc'}
                                onChange={() => setSortOrder('asc')}
                            />
                            <label for="asc">Asc</label>
                            <input 
                                className="m-1" 
                                type="radio" 
                                id="desc" 
                                name="order" 
                                value="desc" 
                                checked={sortOrder === 'desc'}
                                onChange={() => setSortOrder('desc')}
                            />
                            <label for="desc">Desc</label>
                        </div>
                    </div>
                    <div>
                        <Link to="/create" className="btn btn-success btn-sm">
                            Add +
                        </Link>
                    </div>
                </div>
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
                            data.filter((item) => {
                                return searchTerm.toLowerCase() === ''
                                    ? item 
                                    : item.name.toLowerCase().includes(searchTerm);
                            }).sort((a, b) => {
                                if (!sortField) return 0;
                                const aValue = a[sortField];
                                const bValue = b[sortField];

                                if (sortOrder === 'asc'){
                                    return aValue > bValue ? 1: -1;
                                }else {
                                    return aValue < bValue ? 1: -1;
                                }
                            }).map((user, index) => {
                                return <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
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