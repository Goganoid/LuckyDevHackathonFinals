

// how many meals to load when clicking 'Load More' button
export const itemsPerLoad = 6;


export const NUGET_URL_CONFIG = {
    Server:'http://localhost:7003',
    SwaggerDocs: 'http://localhost:7003/swagger'
  };

export type FilterItem = {
    value: string;
    label: string;
}


// helper functions for select-react

export function convertToFilterItem(item: string): FilterItem{
    return { value: item, label: item }
}

export function convertToFilterList(items: string[]): FilterItem[] {
    var list: FilterItem[] = [];
    for (let item of items) {
        list.push({ value: item, label: item });
    }
    return list;
}

export const categoryOptions = [
    'React',
    '.Net',
    'AWS',
    'Azure',
    'Redux',
    'CSS',
    'HTML',
    'tailwind',
    'SASS',
    'LESS',
    'Angular',
    'NestJs',
]