import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Badge } from 'reactstrap';
import { UserInformation } from '../api/user.service';
import { MDBInput } from 'mdb-react-ui-kit';


enum LanguageLevel
{
    NoEnglish,
    Beginner,
    PreIntermediate,
    Intermediate,
    UpperIntermediate,
    Advanced
}

export default function EditProfilemain() {
    const [userData, setUserProfile] = useState<UserInformation>();

    return (
    <MDBContainer fluid className='align-items-center justify-content-center w-75'>
        <MDBCard className='MDBCard p-4 m-3'>
            <MDBCardBody>
                <MDBInput wrapperClass='mb-4' label='First name' size='lg' id='form2' type='email' />
                <h1 className='display-3 d-inline'>{`${userData?.firstName} ${userData?.lastName}`}</h1>
                <h4 className='text-secondary lead'>{`${userData?.email}`}</h4>
                <hr className='my-5' />
                <h3 className='display-4 m-3'>About me:</h3>
                <MDBCard>
                    <MDBCardBody>
                        {`${userData?.about}`}
                    </MDBCardBody>
                </MDBCard>
                <h3 className='display-4 m-3 mt-5'>My skills: </h3>
                <MDBCard>
                    <MDBCardBody>
                        {userData?.skillTags.map((skill) => (
                            <Badge color="secondary" key={skill.id} className='m-2'>
                                <p className='h3'>{`${skill.label}`}</p>
                            </Badge>
                        ))}
                    </MDBCardBody>
                </MDBCard>
                <p className='display-6 m-3 mt-5'>My CV: {`${userData?.cvLink}`}</p>
                <p className='display-6 m-3'>My English level: {`${LanguageLevel[userData?.englishLevel ? userData?.englishLevel : 0]}`}</p>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    )
}