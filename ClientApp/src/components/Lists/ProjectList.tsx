import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import ProjectCard from '../Cards/ProjectCard';
import { ProjectApi, ProjectInformation } from '../../api/projects.service';
import EmptyContent from '../EmptyContent';
import { ProjectInfo } from '../../api/company.service';
import { Filter } from '../Filter';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 700px;
`
const Left = styled.div`
    flex-basis: 75%;
`
const Right = styled.div`
    flex-basis: 25%;
`

export default function ProjectList() {
    const [projects, setProjects] = useState<ProjectInfo[]>();
    useEffect(() => {
        Promise.all([ProjectApi.GetProjects()]).then(res => {
            console.log(res);
            const [ProjectsInfoResponse] = res;
            setProjects(ProjectsInfoResponse.data);
        });
    }, []);
    const update = (tags: string[])=>{
        let query = tags.join(',');
        console.log(query)
        Promise.all([ProjectApi.GetProjects(query)]).then(res => {
            const [ProjectsInfoResponse] = res;
            setProjects(ProjectsInfoResponse.data);
        });
    }
    if(projects === undefined) return (<div>Loading...</div>);
    const listItems = projects.length === 0 ? <EmptyContent /> :
        projects?.map((project: any, idx: number) => {
            return <ProjectCard key={idx} id={idx + 1} name={project.title} description={project.description} />
        }
        );

    return (
        <Container>
            <Left>
                <MDBContainer fluid className='align-items-center justify-content-center'>
                    <MDBCard className='MDBCard p-4 m-3'>
                        <MDBCardBody>
                            <ul>{listItems}</ul>
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