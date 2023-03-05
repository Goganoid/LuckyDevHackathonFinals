import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Badge } from 'reactstrap';
import { UserInformation } from '../api/user.service';
import { MDBInput, MDBTextArea} from 'mdb-react-ui-kit';
import { UserApi } from '../api/user.service';
import { useEffect } from 'react';
import { getUserId } from '../utils/storage';
import Select from 'react-select'


enum LanguageLevel
{
    NoEnglish,
    Beginner,
    PreIntermediate,
    Intermediate,
    UpperIntermediate,
    Advanced
}

const options = [
    { value: 0, label: 'NoEnglish' },
    { value: 1, label: 'Beginner' },
    { value: 2, label: 'PreIntermediate' },
    { value: 3, label: 'Intermediate' },
    { value: 4, label: 'UpperIntermediate' },
    { value: 5, label: 'Advanced' }
]

export default function EditProfilemain() {
    const [userData, setUserProfile] = useState<UserInformation>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [cvLink, setCVLink] = useState('');
    const [englishLevel, setEnglishLevel] = useState('');

    useEffect(() => {
        Promise.all([UserApi.GetUserInfo(`${getUserId()}`)]).then(responses => {
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
            setFirstName(`${UserInfoResponse.data.firstName}`)
            setLastName(`${UserInfoResponse.data.lastName}`)
            setEmail(`${UserInfoResponse.data.email}`)
            setAbout(`${UserInfoResponse.data.about}`)
            setCVLink(`${UserInfoResponse.data.cvLink}`)
            setEnglishLevel(`${UserInfoResponse.data.englishLevel}`)
        })
    }, [])

    if (userData === null) {
        return <div>Text loading...</div>
    }

    const handleFirstName = (e: any) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e: any) => {
        setLastName(e.target.value);
    };

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const handleAbout = (e: any) => {
        setAbout(e.target.value);
    };

    const handleCV = (e: any) => {
        setCVLink(e.target.value);
    };

    const handleEnglishLevel = (e: any) => {
        setEnglishLevel(e.target.value);
        console.log(englishLevel)
    };

    return (
    <MDBContainer fluid className='align-items-center justify-content-center w-75'>
        <MDBCard className='MDBCard p-4 m-3'>
            <MDBCardBody>
                <MDBInput wrapperClass='mb-4' onChange={handleFirstName} value={firstName} placeholder='First name' label='First name' size='lg' id='form1'  />
                <MDBInput wrapperClass='mb-4' onChange={handleLastName} value={lastName} placeholder='Second name' label='Last name' size='lg' id='form2'  />
                <MDBInput wrapperClass='mb-4' onChange={handleEmail} value={email} placeholder='Second name' label='Email' size='lg' id='form3'  />
                <hr className='my-5' />
                <h3 className='display-4 m-3'>About me:</h3>
                <MDBCard>
                    <MDBTextArea onChange={handleAbout} value={about} placeholder='About me' id="form4" />
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
                <MDBInput wrapperClass='mb-4' onChange={handleCV} value={cvLink} placeholder='My CV' size='lg' id='form5'  />
                <p className='display-6 m-3'>My English level: </p>
                <Select options={options} onChange={handleEnglishLevel} />
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    )
}