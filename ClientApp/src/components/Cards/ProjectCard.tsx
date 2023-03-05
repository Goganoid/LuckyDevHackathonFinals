import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardWrapper = styled.div`
    width: 100%;
    height: auto;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
    @media all and (max-width: 769px) {
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
    }
`;

const TextWrapper = styled.div`
    max-width: 50%;

    > h6 {
      color: gray;
    }
    @media all and (max-width: 769px) {
      max-width: 100%;
      > h5 {
        font-size: 16px;
      }
    }
`;

export const MoreButton = styled.button`
    width: 140px;
    height: 60px;
    align-self: flex-end;
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #000;

    @media all and (max-width: 769px) {
      width: 80px;
      height: 40px;
    }
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
        <h5>{description.substring(0,200)+"..."}</h5>
    </TextWrapper>
    <Link to={`/project/${id}`}><MoreButton className="purple-btn">More</MoreButton></Link>
  </CardWrapper>
);

export default ProjectCard;