import styled from 'styled-components';

const EmptyComponent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    > h1, h4 {
        display: block;
        width: 100%;
        text-align: center;
    }
    > div {
        width: 90%;
        display: flex;
        justify-content: center;
        margin: 5%;
        > img {
            width: 500px;
        }
    }
`;
const EmptyContent = () => {
    return (
        <EmptyComponent>
            <div><img src={require('../assets/sad-cloud.png')} alt='' /></div>
            <h1>Unfortunately, there is nothing here😢</h1>
            <h4>Try to add something here.</h4>
            <h4>If the problem persists, contact the administrators.</h4>
        </EmptyComponent>
    )
};

export default EmptyContent;