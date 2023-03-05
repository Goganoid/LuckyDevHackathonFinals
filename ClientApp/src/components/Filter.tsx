import { useState } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";

export const FilterMenu = styled.div`
    position: sticky;
    right: 1.5%;
    top: calc(50% - 100px);
    width: 90%;
    max-width: 350px;
    min-height: 200px;
    display: flex;
    justify-content: flex-start;
    padding: 30px 20px;

    background-color: #8539e8dd;
    color: white;
    border-radius: 10px;
    outline: 3px solid white;

    > form {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    } 
`;


export type FilterProps = {
    updateList: (tags: string[]) => void
}


export const tags = [
    "JS",
    "React.js",
    ".NET",
    "ASP.NET",
    "WPF",
    "Angular",
    "Vue",
    "Redux",
    "REST",
    "HTML",
    "CSS",
    "PHP"
]
export type FilterItem = {
    value: string;
    label: string;
}
export function convertToFilterItems(item: string): FilterItem {
    return { value: item, label: item }
}
export function convertToFilterList(items: string[]): FilterItem[] {
    var list: FilterItem[] = [];
    for (let item of items) {
        list.push({ value: item, label: item });
    }
    return list;
}

export function Filter({ updateList }: FilterProps) {
    const [filterTags, setFilterTags] = useState<string[]>([]);
    return (
        <FilterMenu>
            <form className='w-100'>
                <h5>Tags:</h5>
                <Select
                    className='filter-item text-dark'
                    value={filterTags.length !== 0 ? convertToFilterList(filterTags) : null}
                    options={convertToFilterList(tags)}
                    isClearable={true}
                    isSearchable={true}
                    isMulti
                    onChange={(newValue, { action }) => {
                        if (action === 'select-option' || action === 'remove-value')
                            setFilterTags(newValue.map(v=>v.value));
                        if (action === 'clear')
                            setFilterTags([]);
                    }} />
                <Button className='d-flex mt-4 mx-auto w-90% white-btn' variant="success" onClick={() => {
                    updateList(filterTags);
                }}>Apply</Button>
            </form>
        </FilterMenu>
    )
}
