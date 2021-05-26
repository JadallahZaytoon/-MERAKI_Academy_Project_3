import {React ,useEffect, useState}  from 'react';
import {BrowserRouter as Router,Switch,Route,Link,useParams} from "react-router-dom";
import axios from "axios";

export default function Register(){


    const [users, setuser] = useState([]);
    
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[age,setage]=useState("");
    const[country,setcountry]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    
    
    const addUser = ()=>{
      setuser([...users,{firstName:firstName,
        lastName:lastName,
        age:age,
        country:country,
        email:email,
        password:password
      }]);

      axios.post("http://localhost:5000/users",{
        firstName,
        lastName,
        age,
        country,
        email,
        password
      })
      .then(()=>{
        console.log(users);
        <div>jajajajjaja</div>

      })
      .catch((err)=>{
        console.log("No");
      })
    };
  
    
    
    return (
      <div className="body">
          <h3>Register</h3>
        <input type="text" placeholder="firstName here" onChange={(e) => {
          setFirstName(e.target.value);
        }}></input>
        <input type="text" placeholder="lastName here" onChange={(e) => {
          setLastName(e.target.value);
          }}></input>
        <input type="text" placeholder="age here" onChange={(e) => {
          setage(e.target.value);
        }}></input>
        <input type="text" placeholder="country here" onChange={(e) => {
            setcountry(e.target.value);
          }}></input>
        <input type="text" placeholder="email here" onChange={(e) => {
            setemail(e.target.value);
          }}></input>
        <input type="password" placeholder="passowrd here" onChange={(e) => {
          setpassword(e.target.value);
        }}></input>
        <button onClick={addUser}>Register</button>
        
      </div>)
  
  };