import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {NotificationManager} from 'react-notifications';

function Result() {
  const [userName, setUserName] = useState({
    userName1: "",
    userName2: "",
    relation: "",
  });

  const [result, setResult] = useState(null);

  const handleChangeResult = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUserName({
      ...userName,
      [e.target.name]: value,
    });
  };

  const handleResult = async (e) => {
    e.preventDefault();
    console.log(userName.userName2)
    if(!userName.userName1 || !userName.userName2){
        NotificationManager.error("Error Message" , "Please entre Username")
        return
    }
    const { data } = await axios.post(
      `https://relationbuilder.herokuapp.com/find/degree`,
      userName
    );
    
    setTimeout(() => {
        if(data.StatusCode === 500){
            NotificationManager.error("Error Message" , "No Relation Found")
            return
        }
      setResult(data);
    }, 1000);
  };

  return (
    <div>
      <h1>Result</h1>
      <Form onSubmit={handleResult} className="form">
        <Form.Control
          type="text"
          name="userName1"
          onChange={handleChangeResult}
          placeholder="Add User"
          value={userName.userName1}
          className="input-txt"
        />
        <Form.Control
          type="text"
          name="userName2"
          onChange={handleChangeResult}
          placeholder="Add User"
          value={userName.userName2}
          className="input-txt"
        />
        <Button variant="primary" type="submit" className="btn">
          Submit
        </Button>
      </Form>
        <div style={{display:"flex"}}>
        <div style={{ display: "flex" ,flexDirection:"column" }}>
        <h3>Result 1</h3>
        {result !== null
          ? result.finalResult1.map((result, index) => (
              <h4 className="result" key={index}>{result}</h4>
            ))
          : null}
      </div>

        </div>
    </div>
  );
}

export default Result;
