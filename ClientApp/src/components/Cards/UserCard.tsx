import styled from 'styled-components';

const CardWrapper = styled.div`
    width: 100%;
    height: auto;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
`;

const TextWrapper = styled.div`
    max-width: 50%;

    > h6 {
      color: gray;
    }
`;

const MoreButton = styled.button`
    width: 140px;
    height: 60px;
    align-self: flex-end;
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #000;
`;

interface IUserCard {
  name: string,
  skills: string[],
}

const UserCard = ({name, skills}: IUserCard): JSX.Element => {
  const userSkills = skills.join(', ');
  return (
    <CardWrapper>
      <TextWrapper>
          <h3>{name}</h3>
          <h6>{userSkills}</h6>
      </TextWrapper>
      <MoreButton className="purple-btn">More</MoreButton>
    </CardWrapper>
  );
}

export default UserCard;