import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/authActions.js";
import styles from "./styles.module.css";
import Image from "../Image/index.jsx";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(login(values.email, values.password));
    setSubmitting(false);
  };

  useEffect(() => {
    if (currentUser && currentUser.loginSuccess) {
      navigate("/home");
      currentUser.loginSuccess = !currentUser.loginSuccess;
    }
  }, [currentUser, navigate, dispatch]);

  useEffect(() => {
    dispatch(clearErrors());
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <Image path="/assets/brand.jpg" altText="Brand Logo" />
        <div className={styles.right}>
          <h2>Login</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
            className={styles.form_container}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className={styles.form_field}>
                  <label htmlFor="name">Email</label>
                  <Field
                    id="email"
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className={styles.form_field}>
                  <label htmlFor="name">Password</label>
                  <Field
                    className={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
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
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/signup">
            <button className={styles.white_btn} type="button">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
