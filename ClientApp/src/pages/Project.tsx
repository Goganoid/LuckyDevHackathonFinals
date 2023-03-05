import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Container, Button, Row, Badge } from "reactstrap";
import styled from "styled-components";
import { Candidate, CompanyApi, ProjectInfo, Vacancy } from "../api/company.service";
import { ProjectApi } from "../api/projects.service";
import { Footer, LightHeader as Header } from '../components';
import { getUserId, isCompany } from "../utils/storage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserApi } from "../api/user.service";
export const Background = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    background-color: #EDF7F8;
`;

export const Layout = styled.div`
    position: relative;
    border-radius: 25px;
    width: 80%;
    max-width: 1000px;
    margin: 40px auto;
    padding 1.5em;
    display: flex;
    flex-direction: column;

    overflow: hidden;
    background-color: #FFFFFF;
`;

const ProjectBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 200px;

    object-fit: cover;
    border-radius: 25px 25px 0 0;

    background-color: #FFFFFF;

    > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 180px;
        z-index: 1;

        object-fit: cover;
    }

    > div {
        position: absolute;
        top: 170px;
        left: -15px;
        height: 60px;
        width: calc(100% + 30px);
        z-index: 2;

        filter: blur(5px);
        background-color: #FFFFFF;
    }
`;
const DumbDiv = styled.div`
    height: 150px;
`;

const Info = styled.div`
    position: relative;
    z-index: 3;
    > p {
        margin: 0 5%;
    }
`;

export const Title = styled.span`
    display: block;
    width: 90%;
    margin: 0 5%;
    font-size: 36px;
    border-bottom: 1px solid #ced4da;
    text-align: center;
`;

const Description = styled.div`
    margin: 20px 0;
    > h5 {
        margin: 0 10%;
    }
    > span {
        display: block;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
    }
`;


var ImgLink: string | null = "https://s.dou.ua/storage-files/shapka_privatbank2.jpg";

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectInfo>();
    const [showCandidates, setShowCandidates] = useState(false)
    const [currentVacancy, setCurrentVacancy] = useState<Vacancy>();
    const handleClose = () => setShowCandidates(false);

    useEffect(() => {
        ProjectApi.GetProject(id!).then(result => {
            console.log(result.data);
            setProject(result.data);
        })
    }, [id])

    const matchLanguage = (level: number) => {
        if (level === 0) return 'No English';
        if (level === 1) return 'Beginner';
        if (level === 2) return 'Pre-Intermediate';
        if (level === 3) return 'Intermediate';
        if (level === 4) return 'Upper-Intermediate';
        if (level === 5) return 'Advanced';
        return 'Unknown';
    }

    const chooseCandidate = (user: Candidate, vacancyId: number) => {
        CompanyApi.AcceptCandidate(user.id, vacancyId).then(response => {
            console.log(response)
            if (response.status === 200) {
                toast.success("Selected the candidate");
                let newVacancies = [...project!.vacancies]
                newVacancies = newVacancies.map(v => {
                    if (v.id === vacancyId) {
                        v.acceptedCandidate = user;
                    }
                    return v;
                })
                setProject({ ...project, vacancies: newVacancies } as ProjectInfo);
                handleClose();
            }
        })
    }
    const respond = (vacancyId: number)=>{
        UserApi.Apply(vacancyId).then(response => {
            if (response?.status === 200) {
                toast.success("Successfully applied!");
            }
            else {
                toast.error(response?.data);
            }
        })
    }
    if (project == null) return <div>Loading...</div>
    return (
        <>
            <Header />
            <Layout>
                {ImgLink === null ? <></> :
                    <>
                        <ProjectBackground>
                            <img src={ImgLink} alt="" />
                            <div />
                        </ProjectBackground>
                        <DumbDiv />
                    </>}
                <Info>
                    <Title>{project.title}</Title>
                    <Description>
                        <h5>Description:</h5>
                        <span>{project.description}</span>
                    </Description>
                    <p><b>Project Creation Date: </b>{new Date(project.publicationDate).toLocaleString("en-US")}</p>
                    <p><b>English: </b>{matchLanguage(project.englishLevel)}</p>
                    <Container className="vacancy-list">
                        <hr style={{width: '94%', margin: "20px 3%"}} />
                        <h5>Vacancies:</h5>
                        {project.vacancies.map(vacancy => {
                            return (
                                <Row className="flex-wrap">
                                    <p className="d-flex justify-content-between px-3"><b>{vacancy.name}</b>
                                        {vacancy.acceptedCandidate != null ? <Link to={`/profile/user/${vacancy.acceptedCandidate.id}`}>{`${vacancy.acceptedCandidate.firstName} ${vacancy.acceptedCandidate.lastName}`}</Link>
                                            : !isCompany()
                                                ? <Button className="purple-btn"
                                                onClick={()=>respond(vacancy.id)}
                                                >Respond!</Button>
                                            : getUserId()==project.companyId? <Button className="purple-btn" onClick={() => {
                                                setCurrentVacancy(vacancy);
                                                setShowCandidates(true);
                                            }}>Show Candidates</Button> : null}</p>
                                    <p>{vacancy.tags.map((skill) => (
                                        <Badge color="secondary" key={skill.id} className='m-2'>
                                            {`${skill.label}`}
                                        </Badge>
                                    ))}</p>
                                    <hr style={{width: '94%', margin: "0 3%"}} />
                                </Row>
                            )
                        })}
                    </Container>
                    <div className="d-flex flex-row-reverse">
                        <Button className="white-btn" href='/projects'>Back</Button>
                    </div>
                </Info>
            </Layout>
            <Footer />
            <Modal show={showCandidates} onHide={handleClose}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Candidates</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {currentVacancy?.candidates.length===0 && <span>No candidates😢</span> }
                        {currentVacancy?.candidates.map(c => {
                            return <Row className={`flex-wrap ${currentVacancy.acceptedCandidate?.id===c.id ? 'text-success' : ''}`}>
                                <p className="d-flex justify-content-between px-3">
                                    <Link to={`/profile/user/${c.id}`}>{`${c.firstName} ${c.lastName}`}</Link>
                                <Button onClick={()=>chooseCandidate(c,currentVacancy.id)}>Choose</Button></p>
                                <p>English: {matchLanguage(c.englishLevel)}</p>
                                <p>{c.skillTags.map((skill) => (
                                        <Badge color="secondary" key={skill.id} className='m-2'>
                                            {`${skill.label}`}
                                        </Badge>
                                    ))}</p>
                            </Row>
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    )
};

export default Project;