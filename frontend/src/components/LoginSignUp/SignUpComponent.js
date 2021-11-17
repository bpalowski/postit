import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import signUpApi from '../../api/signUpApi'
import { FloatingLabel, InputGroup, Card, Form, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import '../../scss/SignUpForm.scss';
import "../../scss/bootstrap.scss";


const SignUpComponent = () => {

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setPasswordCheck] = useState('');


  const [passwordValid, validPassword] = useState(true)

  const [emailValidBool, emailBool] = useState(true)

  const [emailValidMessage, validateEmail] = useState('')

  const [buttonValid, setValidButton] = useState(false)



  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const checkpasswordRef = useRef(null);

  useEffect(() => {
    if (name === '' || email === '' || password === '' || checkPassword === '') {
      setValidButton(true)
    }
  })

  const handleSubmit = async (event) => {
    let obj = {
      name,
      email,
      password,
      checkPassword
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidButton(false)
    }

    if (name !== '' || email !== '' || password !== '' || checkPassword !== '') {
      let url = 'http://localhost:8080/user/signup';
      axios.post(url, obj)
        .then((res) => {
          console.log("line 62", res.data)
        }).catch(err => {
          emailBool(false)
          validateEmail(err.response.data.error)
        })
      setValidated(true);
    }

  }



  const handelChange = (e) => {
    emailBool(true)
    setValidButton(false)
    setName(nameRef.current.value)
    setEmail(emailRef.current.value)
    setPassword(passwordRef.current.value)
    setPasswordCheck(checkpasswordRef.current.value)

    if (passwordRef.current.value.length > 5 && checkpasswordRef.current.value.length > 5) {
      validPassword(passwordRef.current.value === checkpasswordRef.current.value)
    }
  }

  return (
    <div className="formContainer">
      <div className="signUpHeader">
        <h1>SignUp</h1>
      </div>


      <Card className="formCardContainer">

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}>
          <Row >
            <Col md>
              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handelChange} ref={nameRef} required type="text" placeholder="Enter Name" />
                <Form.Control.Feedback type="invalid">
                  Please provide a Name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handelChange} ref={emailRef} required type="email" placeholder="Enter email" />
                <Form.Control.Feedback type="invalid">
                  Please provide a Email
                </Form.Control.Feedback>
                <>
                  {!emailValidBool ?
                    <Form.Text >
                      {<p style={{ color: 'red' }}>{emailValidMessage}</p>}
                    </Form.Text> : ''
                  }
                </>

              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md>
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handelChange} ref={passwordRef} required type="password" placeholder="Enter password" />
                <Form.Control.Feedback type='invalid'>
                  Please enter a password
                </Form.Control.Feedback>


              </Form.Group>
            </Col>

            <Col md>
              <Form.Group className="mb-3" >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control isInvalid={!passwordValid} onChange={handelChange} ref={checkpasswordRef} required type="password" placeholder="Re-Enter password" />

                <Form.Control.Feedback type='invalid'>
                  Passwords do not match
                </Form.Control.Feedback>

              </Form.Group>
            </Col>
          </Row>
          <Button onClick={handleSubmit} disabled={!passwordValid || buttonValid} variant="primary" type="button">
            Submit
          </Button>
        </Form>
        <div className="LoginCardLink ">
          <Link to="/login">Already have an accout? Log In Here</Link>
        </div>
      </Card>




    </div >
  )
}

export default SignUpComponent