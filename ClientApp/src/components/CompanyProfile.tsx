import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { getUserId } from '../utils/storage';
import { CompanyApi, CompanyInformation } from '../api/company.service';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CreateProjectPopup } from './CreateProjectPopup';


export default function CompanyProfile() {
    const [companyData, setCompanyData] = useState<CompanyInformation>();
    const company = `${getUserId()}`
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        Promise.all([CompanyApi.GetCompanyInfo(company)]).then(responses => {
            const [CompanyInfoResponse] = responses;
            console.log(CompanyInfoResponse.data);
            setCompanyData(CompanyInfoResponse.data);
        })
    }, [company])

    const refresh = () => {
        Promise.all([CompanyApi.GetCompanyInfo(company)]).then(responses => {
            const [CompanyInfoResponse] = responses;
            console.log(CompanyInfoResponse.data);
            setCompanyData(CompanyInfoResponse.data);
        });
    }

    if (companyData == null) return <div>Loading...</div>;
    return (
        <>
            <MDBContainer fluid className='align-items-center justify-content-center w-80'>
                <MDBCard className='MDBCard p-4 m-3'>
                    <MDBCardBody >
                        <h1 className='display-3'>{`${companyData.name}`}</h1>
                        <h4 className='text-secondary lead'>{`${companyData.email}`}</h4>
                        <hr className='my-5' />
                        <h3 className='display-4 m-3'>About company:</h3>
                        <MDBCard>
                            <MDBCardBody>
                                {`${companyData.about}`}
                            </MDBCardBody>
                        </MDBCard>
                        <h3 className='display-4 m-3 mt-5'>Projects </h3>
                        <MDBCard>
                            {companyData.projects.length === 0
                                ? <p>Start adding projects</p>
                                : companyData.projects.map(project => {
                                    return (
                                        <MDBCard>
                                            <MDBCardBody>
                                                <h2><Link to={`/project/${project.id}`}>{project.title}</Link></h2>
                                                <h6>{new Date(project.publicationDate).toLocaleString("en-US")}</h6>
                                                <p>{project.description}</p>
                                            </MDBCardBody>
                                        </MDBCard>
                                    )
                                })
                            }
                            <Button className='m-3' onClick={handleShow}>Create new project</Button>
                        </MDBCard>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
            <CreateProjectPopup show={show} handleClose={handleClose} refresh={refresh} />
        </>
    )
}