import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { UserApi } from '../api/user.service'
import { useEffect, useState } from 'react';
import { Badge } from 'reactstrap';
import { UserInformation } from '../api/user.service';
import { useParams } from 'react-router-dom';
import { getUserId, isCompany } from '../utils/storage';
import { MoreButton } from './Cards/UserCard';
import { Link } from 'react-router-dom';


enum LanguageLevel
{
    NoEnglish,
    Beginner,
    PreIntermediate,
    Intermediate,
    UpperIntermediate,
    Advanced
}

export default function Profilemain() {
    const [userData, setUserProfile] = useState<UserInformation>();
    const { id } = useParams();
    

    useEffect(() => {
        Promise.all([UserApi.GetUserInfo(`${id}`)]).then(responses => {
            const [UserInfoResponse] = responses;
            setUserProfile({
                id: UserInfoResponse.data.id,
                firstName: UserInfoResponse.data.firstName,
                lastName: UserInfoResponse.data.lastName,
                email: UserInfoResponse.data.email,
                skillTags: UserInfoResponse.data.skillTags,
                about: UserInfoResponse.data.about,
                englishLevel: UserInfoResponse.data.englishLevel,
                cvLink: UserInfoResponse.data.cvLink
            })
        })
    }, [])

    return (
    <MDBContainer fluid className='align-items-center justify-content-center w-75'>
        <MDBCard className='MDBCard p-4 m-3'>
            <MDBCardBody>
                <h1 className='display-3 d-inline'>{`${userData?.firstName} ${userData?.lastName}`}</h1>
                {
                    id == getUserId() && !isCompany() ? 
                    <Link to='/edit-profile'><MoreButton className="purple-btn mx-3">Edit</MoreButton></Link> : <></>
                }
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