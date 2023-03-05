import { MDBInput } from 'mdb-react-ui-kit'
import React, { ReactElement, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export type PopupProps = {
    show: boolean,
    handleClose: () => void,
}

export const CreateProjectPopup = ({ show, handleClose }: PopupProps) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [vacancy, setVacancy] = useState([]);
    const [english, setEnglish] = useState<string | null>(null);

    const handleTitle = (e: any) => {
        setTitle(e.target.value);
    };
    const handleDescription = (e: any) => {
        setDescription(e.target.value);
    };
    const handleAddVacancy = () => {
        //setVacancy([]);
    };
    const handleSubmit = (e: any) => {
        console.log(title, description, english);
    };

    return (<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <MDBInput onChange={handleTitle} value={title} wrapperClass='mb-4' label='Your Title' size='lg' id='form1' type='text' />
            <MDBInput onChange={handleDescription} value={description} wrapperClass='mb-4' label='Your Description' size='lg' id='form2' type='text' />

            <Form.Select aria-label="Language level required"
                value={english ?? "0"}
                onChange={(e) => {
                setEnglish(e.target.value);
            }}>
                <option value="0">No English</option>
                <option value="1">Beginner</option>
                <option value="2">Pre-Intermediate</option>
                <option value="3">Intermediate</option>
                <option value="4">Upper-Intermediate</option>
                <option value="5">Advanced</option>
            </Form.Select>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={(e) => {
                console.log(title, description, english);
            }}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>)
}
