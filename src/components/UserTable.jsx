import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';

function UserTable() {
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function getUser() {
      const { data } = await axios(`https://relationbuilder.herokuapp.com/get/users`);
      setUserList(data.users);
    }
    getUser();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      NotificationManager.error("Error Message" , "Please entre Username")
      return
    }
    await axios.post(`https://relationbuilder.herokuapp.com/add/user`, {
      name: user,
    });
    setTimeout(() => {
      setUser("");
    }, 1000);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  return (
    <div>
      <h2>Add User</h2>
      <Form onSubmit={handleSubmit} >
        <Form.Control
          type="text"
          name="user"
          onChange={handleChange}
          placeholder="Add User"
          value={user}
          
          className="input-txt"
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {userList !== []
            ? userList.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
      <NotificationContainer/>
    </div>
  );
}

export default UserTable;
