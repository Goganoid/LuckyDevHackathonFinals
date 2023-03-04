import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { UserApi } from '../../api/user.service'
import { useEffect, useState } from 'react';
import UserCard from '../Cards/UserCard';
import { UserInformation, Tag } from '../../api/user.service';

export default function UserList() {
    const [users, setUsers] = useState <UserInformation[]>([]);
    useEffect(() => {
        Promise.all([UserApi.GetUsers()]).then(res => {
            const [UsersInfoResponse] = res;
            setUsers(UsersInfoResponse.data);
        });
    }, [])

    const listItems = users?.map((user: UserInformation, idx: number) => {
        return <UserCard key={idx} name={user.firstName} skills={user.skillTags.map((e: Tag) => e.label)} />
    }
    );

    return (
    <MDBContainer fluid className='align-items-center justify-content-center w-75'>
        <MDBCard className='MDBCard p-4 m-3'>
            <MDBCardBody>
            <ul>{listItems}</ul>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    )
}