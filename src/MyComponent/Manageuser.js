import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMemo } from 'react';
import Pagination from './Pagination';
import Search from './Search';
import TableHeader from './Header';
import axios from 'axios'
import Popup from 'reactjs-popup';
import { memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormData from 'form-data';
const Manageuser = () => {
    const [data, setData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openChange, setOpenChange] = useState(false);
    const [valid, setValid] = useState(false);
    const [error, setError] = useState("");
    const [fname, setFname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [id, setId] = useState("")
    const [account_type, setAccount_type] = useState("")
    const [newpassword, setNewpassword] = useState("")
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 4;
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [openFile, setOpenFile] = useState(false);
    const [imageFile, setImageFile] = useState({
        "image": ""
    });
    let formData = new FormData();
    useEffect(() => {
        get();
    }, []);


    const get = async () => {
        await axios.get('http://localhost:3000/data', {})
            .then((response) => {
                setData(response.data);
                console.log("Data", response.data.length)
                setTotalItems(response.data.length);

            })
    }

    const onDelete = async (Id) => {
        if (window.confirm("Are you sure you want to delete")) {

            await axios.delete(`http://localhost:3000/${Id}`, {})
                .then(async (response) => {
                    console.log(response);
                    toast('Successfully Deleted', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    await get();
                })
        }
    }

    const Edit = async (Id) => {
        setOpenEdit(true);

        await axios.get(`http://localhost:3000/${Id}`, {})
            .then(async (response) => {

                setFname(response.data[0].fname);
                setEmail(response.data[0].email);
                setId(response.data[0].Id);
                setAccount_type(response.data[0].account_type);
            })


    }

    useEffect(() => {
        let error = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            newpassword: ""
        }
        setError(error);

        return () => {
            let error = {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                newpassword: ""
            }
            setError(error);

        }
    }, []);

    useEffect(() => {
        validation();
        passwordValidation();
    }, [fname, email, password, confirmPassword, newpassword]);


    const validation = () => {
        let isValid = true;
        let error = {};
        if (!fname) {
            error["name"] = "Please Enter name";
            isValid = false;
        } else {
            if (!fname.match(/^[a-zA-Z]+$/)) {
                isValid = false;
                error["name"] = "Only letters";
            }
        }


        if (!email) {
            error["email"] = "Please Enter Email";
            isValid = false;
        } else {
            if (typeof email !== undefined) {
                if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
                    isValid = false;
                    error["email"] = "Invalid email";
                }
            }
        }




        setError(error)
        return isValid;
    }

    const passwordValidation = () => {
        let isValid = true;
        let error = {};
        if (!password) {
            error["password"] = "Please Enter password";
            isValid = false;
        } else if (password.length < 5) {
            error["password"] = "Minimun 5 character required";
        }

        if (!newpassword) {
            error["newpassword"] = "Please Enter password";
            isValid = false;
        } else if (newpassword.length < 5) {
            error["newpassword"] = "Minimun 5 character required";
        }

        if (!confirmPassword) {
            error["confirmPassword"] = "Please Enter Confirm Password";
        } else {
            if (confirmPassword.length < 5) {
                error["confirmPassword"] = "Minimun 5 character required";
            } else if (confirmPassword !== password) {
                error["confirmPassword"] = "Password and Confirm Password Do not match";
            }
        }
        setError(error)
        return isValid;
    }

    const update = () => {
        if (validation()) {

            axios.put(`http://localhost:3000/${id}`, {
                fname: fname,
                email: email,
                account_type: account_type
            })
                .then(async (response) => {
                    console.log(response);

                    // alert("You have successfully updated");
                    await get();
                    setOpenEdit(false);
                    toast('You have successfully updated', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                })
                .catch(function (error) {
                    console.log(error);
                    toast('Retry again. Some error occur', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                });
        }
    }

    const cpassword = (id) => {


        setId(id);
        setOpenChange(true);

    }

    const updatePassword = () => {

        if (passwordValidation()) {


            axios.put(`http://localhost:3000/password/${id}`, {
                password: newpassword,
                newpassword: password
            })
                .then(async (response) => {
                    console.log(response);

                    // alert("You have successfully updated");
                    await get();
                    setOpenChange(false);
                    toast('You have successfully updated', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                })
                .catch(function (error) {
                    console.log(error);
                    toast('Retry again. Some error occur', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                });
        }
    }

    
    const uploadfile = async () => {

        console.log("::::::::::::::::::: in uploadfile", imageFile.image);
        console.log("in uploadFile", imageFile.image.name);
        formData.append("image", imageFile.image, imageFile.image.name);

        axios.put(`http://localhost:3000/image/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(async (response) => {
                console.log(response);
                setOpenFile(false)
                get();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const changeHandler = (event) => {
        console.log(event.target.files[0]);
        console.log(event.target.files);
        console.log(event.target.files[0].name);
        console.log(event.target);
        setImageFile(prev => ({
            ...prev,
            image: event.target.files[0]
        }));
        console.log(":::::::::::::::::::", imageFile.image);
    }
    const headers = [
        { name: "Name", field: "fname", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Account type", field: "account_type", sortable: false },
        {name: "Image" ,field:"image", sortable: false}
    ];
    const commentsData = useMemo(() => {
        let computedData = data;

        if (search) {
            computedData = computedData.filter(
                data =>
                    data.fname.toLowerCase().includes(search.toLowerCase()) ||
                    data.email.toLowerCase().includes(search.toLowerCase()) ||
                    data.account_type.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedData = computedData.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        setTotalItems(computedData.length);
        return computedData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
    }, [currentPage, data, search, sorting])

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
                <div className="col-md-6 d-flex flex-row-reverse">
                    <Search
                        onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>
            <table className='table  table-hover table-bordered text-center'>

                <TableHeader
                    headers={headers}
                    onSorting={(field, order) =>
                        setSorting({ field, order })
                    }
                />
                <tbody>


                    {commentsData.map((data, idx) => {

                        return <tr key={`manage-user-${idx}`}>
                            <td className='text-white'>{data.fname}</td>
                            <td className='text-white'>{data.email}</td>
                            <td className='text-white'>{data.account_type}</td>
                            <td className='text-white'><img src={`http://localhost:3000/${data.image}`} alt="profile pic" width="100" height="100"></img></td>
                            <td><button className="btn btm-sm btn-danger"
                                onClick={() => {
                                    onDelete(data.Id);
                                }}>Delete</button></td>
                            <td><button className="btn btm-sm btn-primary"
                                onClick={() => {
                                    Edit(data.Id);
                                    setOpenEdit(true);
                                }}>Edit</button></td>
                            <td><button className="btn btm-sm btn-primary"
                                onClick={() => {
                                    cpassword(data.Id);
                                }}>change password</button></td>
                            <td><button className="btn btm-sm btn-primary"
                                onClick={() => {
                                    setId(data.Id);
                                    setOpenFile(true);
                                }}>Photo upload</button></td></tr>
                    })}

                </tbody>

            </table>


            <Popup open={openEdit} onClose={() => {
                setValid(false);
                setFname("");
                setOpenEdit(false);
                setEmail("");
                setAccount_type("");
                setId("");
            }}>
                <div className="wrapper bg-info  text-white mt-5  ">
                    <div className="form-label h1 text-center mt-5 pt-5 px-5 " > Edit Data </div>
                    <div className="content">
                        <form >
                            <div className="mb-3">
                                <input type="hidden" id="id" value={id} name="id"></input>
                                <label htmlFor="fname" className="form-label h2 text-center mx-5">Name</label><br></br>
                                <input type="text" className=" form-label h5 text-center mx-5" id="fname" value={fname} onChange={(e) => { setFname(e.target.value) }} name="fname"></input><br></br>
                                {valid
                                    && <span style={{ color: "red" }}>{error.name}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label h2 text-center mx-5">Email</label><br></br>
                                <input type="text" className=" form-label h5 text-center mx-5" value={email} id="email" onChange={(e) => { setEmail(e.target.value) }} name="email"></input><br></br>
                                {valid
                                    && <span style={{ color: "red" }}>{error.email}</span>}
                            </div>

                            <div className="mb-3">
                                <input type="radio" className=" form-label h3 text-center mx-5" id="user" name="account_type" value="user" onChange={(e) => { setAccount_type(e.target.value) }}  ></input>
                                <label htmlFor="user" className="form-label h2 text-center mx-3">User</label>
                                <input type="radio" className=" form-label h3 text-center mx-4" id="admin" name="account_type" value="admin" onChange={(e) => { setAccount_type(e.target.value) }} ></input>
                                <label htmlFor="admin" className="form-label h2 text-center mx-2">Admin</label>
                            </div>
                        </form>
                    </div>
                    <div className="actions text-center">
                        <button type="submit" onClick={async () => {
                            update();
                            setValid(true);
                            setOpenEdit(false);
                        }} className="btn btn-sn btn-success mx-5 h4">Submit</button>
                        <button className="btn btn-sn btn-danger mx-5 h4" onClick={() => { setOpenEdit(false) }}>close</button>
                    </div>
                </div>
            </Popup>

            <Popup open={openChange} onClose={() => {
                setValid(false)
                setOpenChange(false)
                setId("");
                setConfirmPassword("");
                setNewpassword("");
                setPassword("");
            }}>
                <div className="wrapper bg-info  text-white   ">
                    <div className="form-label h1 text-center pt-5 px-5" > Change Password </div>
                    <div className="frame">
                        <form >
                            <input type="hidden" id="id" value={id} name="id"></input><br></br>
                            <div >
                                <label htmlFor="newpassword" className=" form-label h2 text-center pt-2 mx-5 mx-5" >Old Password</label><br></br>
                                <input type="password" value={newpassword} id="newpassword" className=" form-label h5  mx-5" onChange={(e) => { setNewpassword(e.target.value) }} name="newpassword"></input><br></br>
                                {valid
                                    && <span style={{ color: "red" }}>{error.newpassword}</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="form-label h2 text-center pt-2 mx-5 mx-5" >New Password</label><br></br>
                                <input type="password" value={password} id="password" className=" form-label h5  mx-5" onChange={(e) => { setPassword(e.target.value) }} name="password"></input><br></br>
                                {valid
                                    && <span style={{ color: "red" }}>{error.password}</span>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="form-label h2 text-center pt-2 mx-5 mx-5">Confirm Password</label><br></br>
                                <input type="password" value={confirmPassword} id="confirmPassword" className=" form-label h5  mx-5" onChange={(e) => { setConfirmPassword(e.target.value) }} name="confirmPassword"></input><br></br>
                                {valid
                                    && <span style={{ color: "red" }}>{error.confirmPassword}</span>}<br></br><br></br>
                            </div>

                        </form>
                    </div>
                    <div className="actions">
                        <button type="submit" onClick={async () => {
                            await updatePassword();
                            setValid(true);
                        }} className="btn btn-sn btn-success mb-3  mx-5">Submit</button>
                        <button className="btn btn-sn btn-danger mb-3 mx-5" onClick={() => { setOpenChange(false) }}>close</button>
                    </div>
                </div>
            </Popup>

            <Popup open={openFile} onClose={() => {
                setOpenFile(false)
            }}>
                <div className='bg-info mx-5 text-center'>
                    <form>
                        <div className='text-center'>
                            <h1>Update your profile pic</h1><br></br>
                        </div>
                        <div>
                            <input type="hidden" id="id" value={id} name="id"></input>
                            <input type="file" accept="image/*" id="file" name="file" /* value={imageFile} */ className=" form-label h5  mx-5" onChange={changeHandler} ></input>

                        </div>

                        <div><br></br>
                            <button type="button" className='button-success mx-5' onClick={() => { uploadfile();  }}>Submit</button>
                            <button type="button" className='button-danger mx-5' onClick={() => { setOpenFile(false) }}>Close</button>
                        </div>
                    </form>

                </div>
            </Popup>

            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* {loader} */}
        </div>
    )
}

export default memo(Manageuser);
