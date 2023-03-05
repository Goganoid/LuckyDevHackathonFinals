import { AxiosError } from 'axios';
import { MDBCard, MDBCardBody, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthApi } from '../../api/auth.service';
import {errorToastOptions, successToastOptions } from '../../config/toastify.config';
import { setUserData } from '../../utils/storage';

export default function RegisterCompany() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword1 = (e: any) => {
    setPassword1(e.target.value);
  };

  const handlePassword2 = (e: any) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.info("Sending request...", successToastOptions);
    if (password1 !== password2) {
      toast.error("Passwords don't match!", errorToastOptions);
    } else {
      AuthApi.RegisterCompany(name, email, password1).then(response => {
        if (response.status === 200) {
          AuthApi.CompanyLogin(email, password1).then(res => {
            setUserData(res.data.token, res.data.id,'company');
            window.location.href = "/";
          })
        }
      }).catch((error: AxiosError<any>) => {
        const errorMessage = error?.response?.data.message;
        const emailErrors = error?.response?.data?.errors?.Email;
        if (emailErrors && emailErrors.length > 0) {
          toast.error(`Error:${emailErrors[0]}`, errorToastOptions);
          return;
        }
        if (errorMessage)
          toast.error(`Error:${errorMessage}`, errorToastOptions);
        else
          toast.error(`Error:${error.code}`, errorToastOptions);
      })
    }
  };
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image mw-300'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='MDBCard w-40 xw-500'>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput onChange={handleName} value={name} wrapperClass='mb-4' label='Your company name' size='lg' id='form1' type='text' />
          <MDBInput onChange={handleEmail} value={email} wrapperClass='mb-4' label='Your Email' size='lg' id='form3' type='email' />
          <MDBInput onChange={handlePassword1} value={password1} wrapperClass='mb-4' label='Password' size='lg' id='form4' type='password' />
          <MDBInput onChange={handlePassword2} value={password2} wrapperClass='mb-4' label='Repeat your password' size='lg' id='form5' type='password' />
          <Button onClick={handleSubmit} className='mb-4 w-100 Auth-Button' size='lg' variant="primary"
            disabled={[name,email,password1,password2].some(value=>value.trim().length===0)}
          >Register</Button>
          <h6 className="text-uppercase text-center mb-5">Already have an account? <Link to="/login">login</Link></h6>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
};