import React, { useState ,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Table } from "react-bootstrap"
import {NotificationContainer, NotificationManager } from 'react-notifications';

function Relation() {
  const [relation, setRelation] = useState({
    userName1: "",
    userName2: "",
    relation: "",
  });

  const [relationList , setRelationList] = useState([]);


  useEffect(() => {
    async function getRelations() {
      const { data } = await axios(`https://relationbuilder.herokuapp.com/all/relations`);
      console.log(data)
      setRelationList(data.users);
    }
    getRelations();
  }, [relation]);

  const handleRelation = async (e) => {
    e.preventDefault();
    if(!relation.userName1 || !relation.userName2 || !relation.relation){
        NotificationManager.error("Error Message" , "Please Fill All Fields")
        return
      }
    const { data } = await axios.post(
      `https://relationbuilder.herokuapp.com/user/relation`,
      relation
    );
    setTimeout(() => {
      NotificationManager.success('Success message', 'Relation Added successfully');
      console.log(data);
      setRelation({
        userName1: "",
        userName2: "",
        relation: "",
      })
    }, 1000);
  };

  const handleChangeRelation = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setRelation({
      ...relation,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      <h1>Add Relation</h1>
      <Form onSubmit={handleRelation} className="form">
        <Form.Control
          type="text"
          name="userName1"
          onChange={handleChangeRelation}
          placeholder="Add User"
          value={relation.userName1}
          className="input-txt"
        />
        <Form.Control
          type="text"
          name="userName2"
          onChange={handleChangeRelation}
          placeholder="Add User"
          value={relation.userName2}
          className="input-txt"
        />
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Relation</Form.Label>
          <Form.Control
            as="select"
            name="relation"
            onChange={handleChangeRelation}
          >
            <option>Select</option>
            <option value="Brother">Brother</option>
            <option value="Friend">Friend</option>
            <option value="Son">SOn</option>
            <option value="Grand Father">Grand Father</option>
            <option value="Sister">Sister</option>
            <option value="Mother">Mother</option>
            <option value="Sister">Sister</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Relations</th>
          </tr>
        </thead>
        <tbody>
          {relationList !== []
            ? relationList.map((user, index) => (
                <tr key={index}>
                  <td style={{color:"white"}}>{`${user.userName1} is ${user.relation} of ${user.userName2}`}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
      <NotificationContainer />
    </div>
  );
}

export default Relation;
