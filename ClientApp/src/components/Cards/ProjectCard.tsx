import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardWrapper = styled.div`
    width: 970px;
    height: 230px;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    background-color: #D9D9D9;
    border-radius: 10px;
`;

const TextWrapper = styled.div`
    max-width: 50%;
`;

const MoreButton = styled.button`
    width: 140px;
    height: 60px;
    align-self: flex-end;
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #000;
`;

interface IProjectCard {
  id: number,
  name: string,
  description: string
}

const ProjectCard = ({id, name, description}: IProjectCard): JSX.Element  => (
  <CardWrapper>
    <TextWrapper>
        <h3>{name}</h3>
        <h4>{description}</h4>
    </TextWrapper>
    <Link to={`/project/${id}`}><MoreButton className="purple-btn">More</MoreButton></Link>
  </CardWrapper>
);

export default ProjectCard;