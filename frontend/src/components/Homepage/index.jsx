import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/authActions.js";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  let userDetails;
  const { allUsers, currentUser } = useSelector((state) => state.auth);
  if (currentUser) {
    let { payload: user } = currentUser;
    if (user && user.length) {
      userDetails = user[0];
    }
  }

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            Welcome home {userDetails?.firstname}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to="/login">
                <span>Logout</span>
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.payload &&
            allUsers.payload.map(({ id, firstname, lastname, email }) => (
              <tr>
                <td>{id}</td>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{email}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Homepage;
