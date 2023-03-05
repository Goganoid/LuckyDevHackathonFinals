import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { Application, Invite, UserApi } from '../api/user.service'
import { useEffect, useState } from 'react';
import { Badge } from 'reactstrap';
import { UserInformation } from '../api/user.service';
import { useParams } from 'react-router-dom';
import { getUserId, isCompany } from '../utils/storage';
import { MoreButton } from './Cards/UserCard';
import { Link } from 'react-router-dom';
import { Button, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';


enum LanguageLevel {
    NoEnglish,
    Beginner,
    PreIntermediate,
    Intermediate,
    UpperIntermediate,
    Advanced
}
interface Inbox {
    invites: Invite[],
    applications: Application[],
}
export default function Profilemain() {
    const [userData, setUserProfile] = useState<UserInformation>();
    const [inbox, setInbox] = useState<Inbox>();
    const { id } = useParams();
    const [key, setKey] = useState('profile');

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
        });
        Promise.all([UserApi.GetInvites(), UserApi.GetApplications()]).then(responses => {
            const [invites, applications] = responses;
            setInbox({
                applications: applications.data,
                invites: invites.data,
            })
        })
    }, [id])


    const accept = (inviteId: number) => {
        UserApi.Accept(inviteId).then(response => {
            if (response?.status === 200) {
                setInbox({
                    ...inbox, invites: inbox!.invites.map(invite => {
                        if (invite.id == inviteId) {
                            invite.status = 0
                        };
                        return invite;
                    })
                } as Inbox)
            }
            else {
                toast.error(response?.status)
            }
        })
    }
    const decline = (inviteId: number) => {
        UserApi.Decline(inviteId).then(response => {
            if (response?.status === 200) {
                setInbox({
                    ...inbox, invites: inbox!.invites.map(invite => {
                        if (invite.id == inviteId) {
                            invite.status = 1
                        };
                        return invite;
                    })
                } as Inbox)
            }
            else {
                toast.error(response?.status)
            }
        })
    }

    const checkStatus = (status: number) => {
        if (status == 0) return 'Accepted';
        if (status == 1) return 'Declined';
        if (status == 2) return 'Unresponded';
        return '???';
    }
    return (
        <MDBContainer fluid className='align-items-center justify-content-center w-75'>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k!)}
                className="mb-3"
            >
                <Tab eventKey="profile" title="Profile">
                <MDBCard className='MDBCard p-4 m-3'>
            <MDBCardBody>
                <h1 className='display-3 d-inline'><b>{`${userData?.firstName} ${userData?.lastName}`}</b></h1>
                {
                    id == getUserId() && !isCompany() ?
                    <Link to='/edit-profile'><MoreButton className="purple-btn mx-3">Edit</MoreButton></Link> : <></>
                }
                <h4 className='text-secondary lead'>{`${userData?.email}`}</h4>
                <hr className='my-5' />
                <h3 className='display-4 m-3'><b>About me:</b></h3>
                <MDBCard>
                    <MDBCardBody>
                        {`${userData?.about}`}
                    </MDBCardBody>
                </MDBCard>
                <h3 className='display-4 m-3 mt-5'><b>My skills:</b></h3>
                <MDBCard>
                    <MDBCardBody>
                        {userData?.skillTags.map((skill) => (
                            <Badge color="secondary" key={skill.id} className='m-2'>
                                <p className='h3'>{`${skill.label}`}</p>
                            </Badge>
                        ))}
                    </MDBCardBody>
                </MDBCard>
                {userData?.cvLink !== "" ?
                (<p className='display-6 m-3 mt-5'><b>My CV:</b> {`${userData?.cvLink}`}</p>) :
                (<p className='display-6 m-3 mt-5'><b>My CV:</b> Not loaded</p>)}
                <p className='display-6 m-3'><b>My English level:</b> {`${LanguageLevel[userData?.englishLevel ? userData?.englishLevel : 0]}`}</p>
            </MDBCardBody>
        </MDBCard>
                </Tab>
                <Tab eventKey="inbox" title="Inbox" disabled={getUserId()!==id || isCompany()}>
                    <h2>Invites</h2>
                    {inbox?.invites.map((invite, idx) => {
                        return (
                            <div key={idx} className='d-flex flex-column justify-content-between align-items-center'>
                                <div >
                                    <h4>{invite.company.name}</h4>
                                    <p>{invite.message}</p>
                                </div>
                                <div>
                                    Status: {checkStatus(invite.status)}
                                </div>
                                {invite.status == 2 && <div>
                                    <Button variant="success" className='m-2' onClick={()=>accept(invite.id)}>Accept</Button>
                                    <Button variant="danger" className='m-2'  onClick={()=>decline(invite.id)}>Decline</Button>
                                </div>}
                            </div>
                        )
                    })}
                    <h2>Applications</h2>

                    <Table striped bordered hover>
                        <tbody>
                            {inbox?.applications.map((application, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td >
                                            <h6>{application.name}</h6>
                                        </td>
                                        <td>
                                            Status: {checkStatus(application.status)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>

        </MDBContainer>
    )
}