import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import logoutImg from '';
import styled from 'styled-components';

const ImgWrapper = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    @media screen and (max-width: 420px) {
        &{
            width: 100%;
        }
    }
`;

export default function Logoutmain() {
    const returnHome = () => {
        window.location.href='/';
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        returnHome();
    };

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='MDBCard'>
            <MDBCardBody className='px-5'>
            <ImgWrapper src={logoutImg} alt="logout picture" />
            <h3 className="text-uppercase text-center mb-5">Oh no! You are leaving... Are you sure?</h3>
            <Button onClick={returnHome} className='mb-4 w-100 Auth-Button' size='lg' variant='primary'>Naah, Just Kidding</Button>
            <Button onClick={logout} className='mb-4 w-100 Logout-Button' size='lg' variant='primary'>Yes, Log Me Out</Button>
            </MDBCardBody>
        </MDBCard>
        </MDBContainer>
    )
};