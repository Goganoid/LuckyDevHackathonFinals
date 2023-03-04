import { Button } from "reactstrap";
import styled from "styled-components";

const MainLayout = styled.div`
    position: absolute;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -2;

    background: linear-gradient(10deg, #6D5BDA 30%, #644FE7, #8639E8 80%);
    > div {
        position: absolute;
        width: 60%;
        height: 60%;
        top: 25%;
        left: 20%;
        display: flex;
        flex-direction: column;
        z-index: -1;
        > * {
            animation-duration: 1s;
            animation-name: slidein;
        }
    }
`;
const SiteInfo = styled.span`
    display: block;
    width: 100%;
    margin: 20px;

    color: white;
    font-size: 32px;
    text-align: center;
    user-select: none;
`;

const Buttons = styled.div`
    width: 100%;
    margin-top: 30px;
    padding: 0 15%;
    display: flex;
    justify-content: space-between;
    > button {
        color: black;
        background-color: white;
        font-size: 24px;
        width: 40%;
    }
`;

const Main = () => {
    return (
        <MainLayout>
            <div>
                <SiteInfo>Thanks to LuckyDevFinals, you will be able to find a dream team to work for in a very short time!</SiteInfo>
                <SiteInfo>We guarantee!😉</SiteInfo>
                <Buttons>
                    <Button>Create project</Button>
                    <Button>Find a job</Button>
                </Buttons>
            </div>
        </MainLayout>
    );
}

export default Main;