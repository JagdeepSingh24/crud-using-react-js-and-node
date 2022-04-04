import { memo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { image } from 'fontawesome';
const Dashboard = () => {

  const [openEdit, setOpenEdit] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [show, setShow] = useState(false);
  const [showName, setShowName] = useState("");
  const [showEmail, setShowEmail] = useState("");
  const [showType, setShowType] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const [fname, setFname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [id, setId] = useState("")
  const [account_type, setAccount_type] = useState("")
  const [newpassword, setNewpassword] = useState("")
  const [data, setData] = useState([]);
  const [openFile, setOpenFile] = useState(false);
  const [pic, setPic] = useState("");
  const [imageChange, setImageChange] = useState(false);
  const [imageFile, setImageFile] = useState({
    "image": ""
  });
  let formData = new FormData();
  useEffect(() => {
    check()
  }, [])

  const check = () => {

    axios.post(`http://localhost:3000/manageuser`, {
      email: localStorage.getItem('email')
    })
      .then(async (response) => {
        console.log("while checking", response.data);
        setShowName(response.data[0].fname);
        setShowEmail(response.data[0].email);
        setShowType(response.data[0].account_type);
        setFname(response.data[0].fname);
        setEmail(response.data[0].email);
        setId(response.data[0].Id);
        setAccount_type(response.data[0].account_type);
        let v1 = "http://localhost:3000/";
        let v2 = v1.concat(response.data[0].image);
        console.log("v2", v2);
        setPic(v2);
        console.log("Image.............", response.data[0].image);
        // console.log(">>>>>>>>>>",id)
      })
      .catch(function (error) {
        console.log(error);

      });
  }

  const onDelete = async (Id) => {
    if (window.confirm("Are you sure you want to delete")) {

      await axios.delete(`http://localhost:3000/${Id}`, {})
        .then(async (response) => {

          toast('Successfully Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          await check();
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
    } else if (!fname.match(/^[a-zA-Z]{1,}[a-zA-Z\s]+$/)) {
      
      error["name"] = "Only letters";
      isValid = false;
    }


    if (!email) {
      error["email"] = "Please Enter Email";
      isValid = false;
      
    } else if (typeof email !== undefined) {
      if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        isValid = false;
        error["email"] = "Invalid email";
        
      }
    }
    console.log(error,"<<<")
    setError(prev => ({
      ...prev,
      email: error.email || '',
      name: error.name || '',
    }));
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
    } 
    // else if (newpassword.length < 5) {
    //   error["newpassword"] = "Minimun 5 character required";
    //   isValid = false;
    // }

    if (!confirmPassword) {
      error["confirmPassword"] = "Please Enter Confirm Password";
      isValid = false;
    } else {
      if (confirmPassword !== password) {
        error["confirmPassword"] = "Password and Confirm Password Do not match";
        isValid = false;
      }
    }
    console.log("in password", error)
    setError(prev => ({
      ...prev,
      newpassword: error.newpassword || "",
      password: error.password || "",
      confirmPassword : error.confirmPassword || ""
    }));
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


          // alert("You have successfully updated");
          await check();
          setOpenEdit(false);
          toast('You have successfully updated', {
            position: "top-right",
            autoClose: 5000,
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
            autoClose: 5000,
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
    console.log(openChange);
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
          await check();
          setOpenChange(false);
          toast('You have successfully updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        })
        .catch(function (error) {
          console.log(error);
          toast('Wrong Password', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        });
    }
  }

  const forgotpassword = (email) => {
    console.log("In forgot password");
    email = email

  }

  const uploadfile = async () => {

    console.log("::::::::::::::::::: in uploadfile",imageFile.image);
    // console.log("in uploadFile", imageFile.image.name);
    if (imageChange) {
      formData.append("image", imageFile.image, imageFile.image.name);
      console.log("in upload files")
      axios.put(`http://localhost:3000/image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(async (response) => {
          console.log(response);
          setOpenFile(false)
          setImageChange(false);
          check()
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      setShow(true);
    }

  }
  const changeHandler = (event) => {
    setShow(false)
    console.log(event.target.files[0]);
    console.log(event.target.files);
    console.log(event.target.files[0].name);
    console.log(event.target);
    setImageChange(true);
    setImageFile(prev => ({
      ...prev,
      image: event.target.files[0]
    }));
    console.log(":::::::::::::::::::", imageFile.image);
  }


  return (

    <div>
      <div>
        <div className='text-center h1'>My profile</div><br></br>
        <div className='row'>
          <div className="col-sm-8">
            <div>
              <h1>Name :</h1><h5>{showName}</h5></div>
            <div><h1>Email :</h1><h5>{showEmail}</h5></div>
            <div><h1>Account type:</h1><h5>{showType}</h5></div>
          </div>
          <div className='col-sm-4'>
            <div ><img src={pic} alt="Profile Pic" width="200" height="200"></img></div>
          </div>
        </div>

        <br></br><br></br>
        <div>
          <button className="btn btm-sm btn-primary"
            onClick={() => {
              Edit(id);
              setOpenEdit(true);
            }}>Edit</button><br></br><br></br>
          <button className="btn btm-sm btn-primary" onClick={() => { cpassword(id); }}>change password</button><br></br><br></br>
          <td><button className="btn btm-sm btn-primary"
            onClick={() => {
              setOpenFile(true);
            }}>Update Profile Pic</button></td>
        </div>

      </div>
      <Popup open={openEdit} onClose={() => {
        setValid(false);
        setOpenEdit(false);
        check();
      }}>
        <div className="wrapper bg-info  text-white mt-5  ">
          <div className="form-label h1 text-center mt-5 pt-5 px-5 " > Edit Data </div>
          <div className="content">
            {/* <h2><div>{JSON.stringify(error)}</div></h2> */}
            <form >
              <div className="mb-3 text-center">
                <input type="hidden" id="id" value={id} name="id"></input>
                <label htmlFor="fname" className="form-label h2 text-center mx-5">Name</label><br></br>
                <input type="text" className=" form-label h5 text-center mx-5" id="fname" value={fname} onChange={(e) => { setFname(e.target.value) }} name="fname"></input><br></br>
                {valid
                  && <span style={{ color: "red" }}>{error.name}</span>}
              </div>
              <div className="mb-3 text-center">
                <label htmlFor="email" className="form-label h2 text-center mx-5">Email</label><br></br>
                <input type="text" className=" form-label h5 text-center mx-5" value={email} id="email" onChange={(e) => { setEmail(e.target.value) }} name="email"></input><br></br>
                {valid
                  && <span style={{ color: "red" }}>{error.email}</span>}
              </div>

              <div className="mb-3 text-center">
                <input type="radio" className=" form-label h3 text-center mx-5" id="user" name="account_type" checked={account_type==="user"} value="user" onChange={(e) => { setAccount_type(e.target.value) }}  ></input>
                <label htmlFor="user" className="form-label h2 text-center mx-3">User</label>
                <input type="radio" className=" form-label h3 text-center mx-4" id="admin" name="account_type" value="admin" checked={account_type==="admin"} onChange={(e) => { setAccount_type(e.target.value) }} ></input>
                <label htmlFor="admin" className="form-label h2 text-center mx-2">Admin</label>
              </div>
            </form>
          </div>
          <div className="actions text-center">
            <button type="submit" onClick={async () => {
              await update();
              setValid(true);
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
              <div className="mb-3 text-center">
                <label htmlFor="newpassword" className=" form-label h2 text-center pt-2 mx-5 mx-5" >Old Password</label><br></br>
                <input type="password" value={newpassword} id="newpassword" className=" form-label h5  mx-5" onChange={(e) => { setNewpassword(e.target.value) }} name="newpassword"></input><br></br>
                {valid
                  && <span style={{ color: "red" }}>{error.newpassword}</span>}
              </div>
              <div className="mb-3 text-center">
                <label htmlFor="password" className="form-label h2 text-center pt-2 mx-5 mx-5" >New Password</label><br></br>
                <input type="password" value={password} id="password" className=" form-label h5  mx-5" onChange={(e) => { setPassword(e.target.value) }} name="password"></input><br></br>
                {valid
                  && <span style={{ color: "red" }}>{error.password}</span>}
              </div>

              <div className="mb-3 text-center">
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
        setImageChange(false)
        setShow(false);
      }}>
        <div className='bg-info mx-5 text-center'>
          <form>
            <div className='text-center'>
              <h1>Update your profile pic</h1><br></br>
            </div>
            <div>
              <input type="hidden" id="id" value={id} name="id"></input>
              <input type="file" accept="image/*" id="file" name="file" /* value={imageFile} */ className=" form-label h5  mx-5" onChange={changeHandler} ></input><br></br>
              {show
              && <span style={{ color: "red" }}>Please Select one Image</span>}
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
    </div>
  )
}

export default memo(Dashboard);
