import { MDBCard, MDBCardBody, MDBContainer } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import ProjectCard from '../Cards/ProjectCard';
import { ProjectApi, ProjectInformation } from '../../api/projects.service';
import EmptyContent from '../EmptyContent';

export default function ProjectList() {
    const [projects, setProjects] = useState <ProjectInformation[]>([]);
    useEffect(() => {
        Promise.all([ProjectApi.GetProjects()]).then(res => {
            const [ProjectsInfoResponse] = res;
            setProjects(ProjectsInfoResponse.data);
        });
    }, [])

    const listItems = projects.length === 0 ? <EmptyContent /> :
    projects?.map((project: any, idx: number) => {
        return <ProjectCard key={idx} id={idx+1} name={project.name} description={project.description} />
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