import { MDBContainer } from 'mdb-react-ui-kit';
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
        <h1 className='display-3'>{`${userData?.firstName} ${userData?.lastName}`}</h1>
        <h3 className='text-secondary'>{`${userData?.email}`}</h3>
        <h1 className='display-3 mt-5'>My projects:</h1>


    </MDBContainer>
    )
}