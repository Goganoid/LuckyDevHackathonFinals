import { MDBCard, MDBCardBody, MDBCheckbox, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthApi } from '../../api/auth.service';
import { errorToastOptions, successToastOptions } from '../../config/toastify.config';
import { setUserData } from '../../utils/storage';

export default function Loginmain() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCompany, setIsCompany] = useState(false);
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.info("Sending request...", successToastOptions);
    console.log(isCompany);
    let loginAction = isCompany ? AuthApi.CompanyLogin(email, password) : AuthApi.Login(email, password);
    loginAction.then(response => {
      setUserData(response.data.token, response.data.id,isCompany? 'company' : 'user');
      window.location.href = "/";
    }).catch(error => {
      const errorMessage = error?.response?.data.message;
      if (errorMessage)
        toast.error(`Error:${errorMessage}`, errorToastOptions);
      else
        toast.error(`Error:${error.code}`, errorToastOptions);
    })

  };
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='MDBCard w-40 xw-500'>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Sign in your account</h2>
          <MDBInput onChange={handleEmail} value={email} wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' />
          <MDBInput onChange={handlePassword} value={password} wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' />
          <MDBCheckbox name='flexCheck' wrapperClass='mb-4' checked={isCompany} onChange={()=>setIsCompany(!isCompany)} id='flexCheckDefault' label='Login as company' />
          <Button onClick={handleSubmit}
            disabled={[email,password].some(value=>value.trim().length===0)}
            className='mb-4 w-100 Auth-Button' size='lg' variant='primary'>Sign in</Button>
          <h6 className="text-uppercase text-center mb-5">Don't have an account? <Link to="/redirect">register</Link></h6>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
};