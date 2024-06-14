import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearErrors } from "../../actions/authActions.js";
import styles from "./styles.module.css";
import Image from "../Image/index.jsx";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  let { loading, error, currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(
      signup(values.firstName, values.lastName, values.email, values.password)
    );

    setSubmitting(false);
  };

  useEffect(() => {
    dispatch(clearErrors());
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.signUpSuccess) {
      navigate("/login");
      currentUser.signUpSuccess = !currentUser.signUpSuccess;
    }
  }, [currentUser, navigate, dispatch]);

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <Image path="/assets/brand.jpg" altText="Brand Logo" />
        <div className={styles.right}>
          <h2>Sign Up</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <div className={styles.form_field}>
                  <label htmlFor="name">First Name</label>
                  <Field
                    className={styles.input}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className={styles.form_field}>
                  <label htmlFor="name">Last Name</label>
                  <Field
                    className={styles.input}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className={styles.form_field}>
                  <label htmlFor="name">Email</label>
                  <Field
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className={styles.form_field}>
                  <label htmlFor="name">Password</label>
                  <Field
                    className={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className={styles.form_field}>
                  <label htmlFor="name">Confirm Password</label>
                  <Field
                    className={styles.input}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.error_msg}
                  />
                  {error && (
                    <div className={styles.error_msg}>{error.message}</div>
                  )}
                </div>
                <button
                  className={styles.green_btn}
                  type="submit"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/login">
            <button className={styles.white_btn} type="button">
              Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
