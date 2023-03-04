import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { UserApi } from '../api/user.service'
import { useEffect, useState } from 'react';

interface UserProfile {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    skillTags: [],
    about: string,
    englishLevel: number,
}

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
    const [userData, setUserProfile] = useState<UserProfile>();

    useEffect(() => {
        Promise.all([UserApi.GetUserInfo('1')]).then(responses => {
            const [UserInfoResponse] = responses;
            setUserProfile({
                id: UserInfoResponse.data.id,
                firstName: UserInfoResponse.data.firstName,
                lastName: UserInfoResponse.data.lastName,
                email: UserInfoResponse.data.email,
                skillTags: UserInfoResponse.data.skillTags,
                about: UserInfoResponse.data.about,
                englishLevel: UserInfoResponse.data.englishLevel,
            })
        })
    }, [])

    return (
    <MDBContainer fluid className='align-items-center justify-content-center w-75'>
        <MDBCard className='MDBCard p-4 m-3'>
            <MDBCardBody>
                <h1 className='display-3'>{`${userData?.firstName} ${userData?.lastName}`}</h1>
                <h4 className='text-secondary lead'>{`${userData?.email}`}</h4>
                <hr className='my-5' />
                <h3 className='display-4 m-3'>About me:</h3>
                <MDBCard>
                    <MDBCardBody>
                        {`${userData?.about}`}
                    </MDBCardBody>
                </MDBCard>
                <h3 className='display-4 m-3 mt-5'>Tags: </h3>
                <MDBCard>
                    <MDBCardBody>
                        {`${userData?.about}`}
                    </MDBCardBody>
                </MDBCard>
                <p className='display-6 m-3 mt-5'>My CV: </p>
                <p className='display-6 m-3'>My English level: {`${LanguageLevel[userData?.englishLevel ? userData?.englishLevel : 0]}`}</p>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    )
}