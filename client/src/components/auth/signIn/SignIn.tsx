import React, { useState } from "react";
import "./singin.css";
import Container from "react-bootstrap/Container";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LoginMutation } from "../../../gql/gql_functions";
import useRefreshReduxMe, { Me } from "../../../hooks/useRefreshReduxMe";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [execLogin] = useMutation(LoginMutation, {
    refetchQueries: [
      {
        query: Me,
      },
    ],
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { refetch, updateMe } = useRefreshReduxMe();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const { email, password } = data;
    const result = await execLogin({
      variables: {
        email,
        password,
      },
    });

    // dispatch({ type: "resultMsg", payload: result.data.login });
    refetch();
    updateMe();
    history.push("/");
  };

  //region singInForm
  const signInForm = () => (
    <Container>
      <div id="login-box">
        <div className="first">
          <h3>Log in</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Za-z0-9.]+@[A-Za-z]+.[A-Za-z]{2,3}$/i,
                })}
              />
              <Form.Text className="text-muted">
                {errors.email && <span>This field is required</span>}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
              <Form.Text className="text-muted">
                {errors.password && <span>This field is required</span>}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="second">
          <span className="loginwith">
            Sign in with
            <br />
            social network
          </span>

          <Button className="social-signin facebook">
            Log in with facebook
          </Button>
          <Button className="social-signin twitter">Log in with Twitter</Button>
          <Button className="social-signin google">Log in with Google</Button>
        </div>
        <div className="or">OR</div>
      </div>
    </Container>
  );

  //region return
  return signInForm();
  //endregion
};

export default SignIn;
