import { Button, Form, Input, Label } from "reactstrap";
import styled from "styled-components";
import { Layout, Title } from './Project';
import { LightHeader as Header } from "../components";

const Block = styled.div`
    margin-top: 30px;
    padding: 0 3%;
`;

const Vacancy = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-bottom: 1px solid #ced4da;
    padding: 0.5em;
    > button {
        width: 20%;
        min-width: 100px;
    }
`;

const CreatedVacancy = styled.div`
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    outline: 1px solid #ced4da;
`;

const TextArea = styled.textarea`
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    appearance: none;
    border-radius: 0.375rem;
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
`;

const Buttons = styled.div`
    display: inline-flex;
    flex-direction: row-reverse;
    width: 100%;
    > button {
        margin: 0 0.5rem;
    }
`;

const CreateProject = () => {
    return (
        <>
            <Header />
            <Layout>
                <Title>Create new project</Title>
                <Form>
                    <Block>
                        <h5>Write the name for your project:</h5>
                        <Input type="text" placeholder="Project name" />
                    </Block>
                    <Block>
                        <h5><b>(Optional)</b> Add a link to the image of what is your project:</h5>
                        <Input type="url" placeholder="Link" />
                    </Block>
                    <Block>
                        <h5>Write a project description:</h5>
                        <TextArea placeholder="Project description" />
                    </Block>
                    <Block>
                        <h5>Choose the required level of English:</h5>
                        <Input type="radio" id="EngLvl1" name="EngLvl" value="1" />
                        <Label for="EngLvl1">NoEnglish</Label> <br />
                        <Input type="radio" id="EngLvl2" name="EngLvl" value="2" />
                        <Label for="EngLvl2">Beginner</Label> <br />
                        <Input type="radio" id="EngLvl3" name="EngLvl" value="3" />
                        <Label for="EngLvl3">PreIntermediate</Label> <br />
                        <Input type="radio" id="EngLvl4" name="EngLvl" value="4" />
                        <Label for="EngLvl4">Intermediate</Label> <br />
                        <Input type="radio" id="EngLvl5" name="EngLvl" value="5" />
                        <Label for="EngLvl5">UpperIntermediate</Label> <br />
                        <Input type="radio" id="EngLvl6" name="EngLvl" value="6" />
                        <Label for="EngLvl6">Advanced</Label> <br />
                    </Block>
                    <Block>
                        <hr />
                        <h3>Vacancies:</h3>
                    </Block>
                    <Block>
                        <Vacancy>
                            <Input type="text" placeholder="Job title" />
                            <TextArea placeholder="A brief description of who you are looking for" />
                            <Button className="purple-btn">Tags</Button>
                        </Vacancy>
                    </Block>
                    <Block>
                        <CreatedVacancy>
                            Vacancy
                        </CreatedVacancy>
                        <CreatedVacancy>
                            Vacancy
                        </CreatedVacancy>
                        <CreatedVacancy>
                            Vacancy
                        </CreatedVacancy>
                        <CreatedVacancy>
                            Vacancy
                        </CreatedVacancy>
                    </Block>
                    <Buttons>
                        <Button className="purple-btn">Submit</Button>
                        <Button>Cancel</Button>
                    </Buttons>
                </Form>
            </Layout>
        </>
    )
};

export default CreateProject;