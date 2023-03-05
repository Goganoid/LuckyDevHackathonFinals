import { Button } from "reactstrap";
import styled from "styled-components";

const MainLayout = styled.div`
    position: fixed;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -2;

    background: linear-gradient(10deg, #7b5be6 0%, #5a75d8 34%, #8639e8 80%);
    > div {
        position: absolute;
        width: 60%;
        height: 60%;
        top: 20%;
        left: 20%;
        display: flex;
        flex-direction: column;
        z-index: -1;
        > * {
            animation-duration: 1s;
            animation-name: slidein;
        }
        @media (max-width: 768px) {
            width: 80%;
            height: 80%;
            top: 10%;
            left: 10%;
        }
    }
`;
const SiteInfo = styled.span`
    display: block;
    max-width: 100%;
    margin: 20px;

    color: white;
    font-size: 32px;
    text-align: center;
    user-select: none;

    @media (max-width: 900px) {
        & {
            font-size: 24px;
        }
    }

    @media (max-width: 768px) {
        & {
            font-size: 18px;
        }
    }
`;

const Buttons = styled.div`
    width: 100%;
    margin-top: 30px;
    padding: 0 15%;
    display: flex;
    justify-content: space-between;
    a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 40%;
        max-width: 400px;
        padding: 10px 0;

        font-size: 24px;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        a{
            width: 100%;
            font-size: 18px;
        }
    }
`;
const Main = () => {
    return (
        <MainLayout>
            <div>
                <SiteInfo>Thanks to LuckyDevFinals, you will be able to find a job with a dream team to work with in a very short time!</SiteInfo>
                <SiteInfo>We guarantee!😉</SiteInfo>
                <Buttons>
                    <Button className="white-btn" href='/users'>Find candidates</Button>
                    <Button className="white-btn" href='/projects'>Find a job</Button>
                </Buttons>
            </div>
        </MainLayout>
    );
}

export default Main;