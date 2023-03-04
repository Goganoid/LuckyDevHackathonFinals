import { Container, Button, Row } from "reactstrap";
import styled from "styled-components";
import { Footer, LightHeader as Header } from '../components';

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

var Link: string | null = "https://cdnb.artstation.com/p/assets/images/images/050/858/481/large/blake-rottinger-water-copy-web.jpg?1655857899";

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

const Lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const Project = () => {
    return (
        <>
        <Header />
            <Background />
            <Header />
            <Layout>
                {Link === null ? <></> :
                <>
                <ProjectBackground>
                    <img src={Link} alt="" />
                    <div />
                </ProjectBackground>
                <DumbDiv />
                </>}
                <Info>
                    <Title>The best project</Title>
                    <Description>
                        <h5>Description:</h5>
                        <span>{Lorem}</span>
                    </Description>
                    <p><b>Project Creation Date: </b>04.03.2004</p>
                    <p><b>Language: </b>English</p>
                    <Container className="vacancy-list">
                        <h5>Vacancies:</h5>
                        <Row><b>Middle TS React developer</b><span> - tags</span><Button className="purple-btn">Respond!</Button></Row>
                        <Row><b>Middle TS developer</b><span> - tags</span><Button className="purple-btn">Respond!</Button></Row>
                        <Row><b>Middle HTML/CSS developer</b><span> - tags</span><Button className="purple-btn">Respond!</Button></Row>
                    </Container>
                </Info>
            </Layout>
        <Footer />
        </>
    )
};

export default Project;