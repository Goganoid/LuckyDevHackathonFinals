import type { FunctionComponent } from 'react';
import styled from 'styled-components';

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

const CustomButton = styled.button`
    width: 140px;
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 1px solid #000;
`

const MessageCard: FunctionComponent = () => (
  <CardWrapper>
    <TextWrapper>
        <h3>Senders name</h3>
        <h4>Text</h4>
        <CustomButton>Accept</CustomButton>
        <CustomButton>Decline</CustomButton>
    </TextWrapper>
    <MoreButton>Read more</MoreButton>
  </CardWrapper>
);

export default MessageCard;