import axios from "axios";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Router from "next/router";
import api from "../../utils/api";

import styles from "./style.module.css";

interface Values {
  username: string;
  password: string;
}

export default function LoginForm() {
  return (
    <div className={styles.login_box + " p-3"}>
      <h1 className="display-6 mb-3">Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async function (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) {
          await api
            .post("/auth", {
              username: values.username,
              password: values.password,
            })
            .then(({ data: { data } }) => {
              console.log(data);
              alert("Login realizado com sucesso!");
              localStorage.setItem("token", JSON.stringify(data));
              Router.push("/dashboard");
              setSubmitting(false);
            })
            .catch(({ response: { data } }) => {
              console.log(data);
              alert(data.error || "Login failed");
              setSubmitting(false);
            });
        }}
      >
        <Form>
          <div className="mb-3">
            <Field
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              aria-describedby="usernameHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
