import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Redirect() {

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image mt-3'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='MDBCard w-40 xw-500 mw-300'>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Choose type of registration</h2>
          <Link to="/user/register"><Button
            className='mb-4 w-100 Auth-Button' size='lg' variant='primary'>As user
          </Button></Link>
          <Link to="/company/register"><Button
            className='mb-4 w-100 Auth-Button' size='lg' variant='primary'>As company
          </Button></Link>
          <h6 className="text-uppercase text-center mb-5">Already have an account? <Link to="/login">login</Link></h6>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
};