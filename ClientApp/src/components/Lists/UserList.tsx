import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { UserApi } from '../../api/user.service'
import { useEffect, useState } from 'react';
import UserCard from '../Cards/UserCard';
import { UserInformation, Tag } from '../../api/user.service';
import EmptyContent from '../EmptyContent';
import styled from 'styled-components';
import { Filter } from '../Filter';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 700px;
    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
`;
const Left = styled.div`
    flex-basis: 75%;
`;
const Right = styled.div`
    flex-basis: 25%;
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
    }
`;

export default function UserList() {
    const [users, setUsers] = useState<UserInformation[]>();
    useEffect(() => {
        Promise.all([UserApi.GetUsers()]).then(res => {
            const [UsersInfoResponse] = res;
            setUsers(UsersInfoResponse.data);
        });
    }, [])
    const update = (tags: string[])=>{
        let query = tags.join(',');
        console.log(query)
        Promise.all([UserApi.GetUsers(query)]).then(res => {
            const [UsersInfoResponse] = res;
            setUsers(UsersInfoResponse.data);
        });
    }
    const listItems = users===undefined ? <div>Loading...</div>: users.length === 0 ? <EmptyContent /> :
        users?.map((user: UserInformation, idx: number) => {
            return <UserCard key={idx} id={user.id} name={user.firstName} skills={user.skillTags.map((e: Tag) => e.label)} />
        }
        );

    return (
        <Container>
            <Left>
                <MDBContainer fluid className='align-items-center justify-content-center'>
                    <MDBCard className='MDBCard p-4 m-3'>
                        <MDBCardBody className='d-flex flex-column-reverse'>
                            {listItems}
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </Left>
            <Right>
                <Filter updateList={update} />
            </Right>
        </Container>
    )
}