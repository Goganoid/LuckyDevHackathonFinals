import { MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select';
import { toast } from 'react-toastify';
import { CompanyApi, NewProjectRequest } from '../api/company.service';
import { ProjectApi } from '../api/projects.service';
import { Tag } from '../api/user.service';
import { convertToFilterList } from '../config/constants';
import { errorToastOptions } from '../config/toastify.config';
import { tags } from './Filter';


export interface SpecialTag{
    label:string
}

export type PopupProps = {
    show: boolean,
    handleClose: () => void,
    refresh: ()=>void
}

export interface VacancyRequest {
    name: string;
    tags: SpecialTag[];
}
interface IProject {
    title: string;
    description: string;
    englishLevel: number;
    vaccancy: VacancyRequest[];
}

export const CreateProjectPopup = ({ show, handleClose,refresh }: PopupProps) => {

    const [allTags, setAllTags] = useState<SpecialTag[]>([]);
    useEffect(() => {
        Promise.all([ProjectApi.GetTags()]).then(res => {
            const [allTagsRes] = res;
            setAllTags(allTagsRes.data.map((t:any) => {return {label:t.label } as SpecialTag} ));
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
    const [vacancies, setVacancies] = useState<VacancyRequest[]>([{
        name: '',
        tags: []
    }]);
    const [englishLevel, setEnglishLevel] = useState<string | null>(null);

    const handleTitle = (e: any) => {
        setTitle(e.target.value);
    };
    const handleDescription = (e: any) => {
        setDescription(e.target.value);
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
            {
                vacancies.map((v, idx) => {
                    return (
                        <div key={idx} className='mb-4'>
                            <MDBInput onChange={(e) => {
                                let newVac = [...vacancies];
                                newVac[idx].name = e.target.value;
                                setVacancies(newVac);
                            }} value={v.name} wrapperClass='mb-1' label='Vacancy name' size='lg' id='form2' type='text' />
                            <Select
                                value={v.tags.length !== 0 ? v.tags.map(t => {
                                    return { label: t.label, value: t }
                                }) : null}
                                isMulti
                                options={allTags.map(t => {
                                    return { label: t.label, value: t }
                                })}
                                isClearable={true}
                                isSearchable={true}
                                onChange={(newValue, { action }) => {

                                    if (action === 'select-option' || action === 'remove-value') {
                                        let newVac = [...vacancies];
                                        newVac[idx].tags = newValue.map(nv => nv.value);
                                        setVacancies(newVac);
                                    }
                                    if (action === 'clear') {
                                        let newVac = [...vacancies];
                                        newVac[idx].tags = newValue.map(nv => nv.value);
                                        setVacancies(newVac);
                                    }
                                }}
                            />
                        </div>
                    )
                })
            }
            <Button onClick={() => {
                setVacancies([...vacancies,{
                    name: '',
                    tags: []
                }])
            }}>Add another vacancy</Button>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={(e) => {
                var request = {
                    description,
                    englishLevel: parseInt(englishLevel ?? '0'),
                    title,
                    vacancies,

                } as NewProjectRequest;
                console.log(request);
                CompanyApi.CreateProject(request).then(result => {
                    if (result?.status === 200) {
                        console.log('work');
                        refresh();
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
