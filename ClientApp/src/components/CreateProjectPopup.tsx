import { MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select';
import { toast } from 'react-toastify';
import { CompanyApi } from '../api/company.service';
import { ProjectApi } from '../api/projects.service';
import { Tag } from '../api/user.service';
import { convertToFilterList } from '../config/constants';
import { errorToastOptions } from '../config/toastify.config';
import { tags } from './Filter';

export type PopupProps = {
    show: boolean,
    handleClose: () => void,
}

export interface VacancyRequest {
    name: string;
    tags: Tag[];
}
interface IProject {
    title: string;
    description: string;
    englishLevel: number;
    vaccancy: VacancyRequest[];
}

export const CreateProjectPopup = ({ show, handleClose }: PopupProps) => {

    const [allTags, setAllTags] = useState<Tag[]>();
    useEffect(() => {
        Promise.all([ProjectApi.GetTags()]).then(res => {
            const [allTagsRes] = res;
            setAllTags(allTagsRes.data);
        });
    }, [])

    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        vacancyName: '',
        vacancyDescription: '',
        vacancyTags: [],
        englishLevel: ''
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [vacancyName, setVacancyName] = useState('');
    const [vacancyDescription, setVacancyDescription] = useState('');
    const [vacancyTags, setVacancyTags] = useState<Tag[]>();
    const [englishLevel, setEnglishLevel] = useState<string | null>(null);

    const handleTitle = (e: any) => {
        setTitle(e.target.value);
    };
    const handleDescription = (e: any) => {
        setDescription(e.target.value);
    };
    const handleVacancyName = (e: any) => {
        setVacancyName(e.target.value);
    };
    const handleVacancyDescription = (e: any) => {
        setVacancyDescription(e.target.value);
    };

    return (<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <MDBInput onChange={handleTitle} value={title} wrapperClass='mb-4' label='Your Title' size='lg' id='form1' type='text' />
            <MDBInput onChange={handleDescription} value={description} wrapperClass='mb-4' label='Your Description' size='lg' id='form2' type='text' />

            <Form.Select aria-label="Language level required"
                value={englishLevel ?? "0"}
                onChange={(e) => {
                    setEnglishLevel(e.target.value);
            }}>
                <option value="0">No English</option>
                <option value="1">Beginner</option>
                <option value="2">Pre-Intermediate</option>
                <option value="3">Intermediate</option>
                <option value="4">Upper-Intermediate</option>
                <option value="5">Advanced</option>
            </Form.Select>
            <br />
            <br />
            <MDBInput onChange={handleVacancyName} value={vacancyName} wrapperClass='mb-4' label='Your Vacancy' size='lg' id='form3' type='text' />
            <MDBInput onChange={handleVacancyDescription} value={vacancyDescription} wrapperClass='mb-4' label='Vacancy Description' size='lg' id='form4' type='text' />
            <Select
                value={vacancyTags?.length !== 0 ? vacancyTags?.map(t=>{label:t.label,value:t}) : null}
                isMulti
                options={allTags.map(t=>{label:t.label,value:t})}
                isClearable={true}
                isSearchable={true}
                onChange={(newValue, { action }) => {
                    if (action === 'select-option' || action === 'remove-value')
                        setVacancyTags(newValue.map(v=>v.value));
                    if (action === 'clear')
                        setVacancyTags([]);
                }} 
                />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={(e) => {
                console.log(title, description, englishLevel, vacancyName, vacancyDescription, vacancyTags);
                CompanyApi.CreateProject(title, description, englishLevel, vacancyName, vacancyDescription, vacancyTags).then(result => {
                    if (result?.status === 200) {
                        console.log('work');
                        setNewProject({title: '', description: '', vacancyName: '',
                            vacancyDescription: '', vacancyTags: [], englishLevel: ''
                        });
                    }
                    else {
                        const errorMessage = result?.data;
                        if (errorMessage)
                            toast.error(`Error:${errorMessage}`, errorToastOptions);
                        else
                            toast.error(`Error:${result?.status}`, errorToastOptions);
                    }
                    handleClose();
                })
            }}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>)
}
