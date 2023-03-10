import { AxiosError, type AxiosResponse } from "axios";
import { Tag } from "reactstrap";
import { isLoggedIn, getToken } from "../utils/storage";
import { BaseService } from "./base.service";
import { ProjectInfo } from "./company.service";

export interface Vacancy {
    id: number;
    name: string;
    tags: Tag[];
}
export interface ProjectInformation {
    id: number,
    description: string,
    title: string,
    englishLevel: number,
    vacancies: Vacancy[]
}

// Service that handles all requests connected with user actions
class ProjectService extends BaseService {
    private static _sampleService: ProjectService;
    private static _controller: string = 'Projects';
    private constructor(name: string) {
        super(name);
        if (isLoggedIn())
            this.$http.defaults.headers.common['Authorization'] = `bearer ${getToken()}`;
    }

    public static get Instance(): ProjectService {
        return this._sampleService || (this._sampleService = new this(this._controller));
    }

    public async Ping(): Promise<AxiosResponse<any> | undefined>{
        const url = `ping`;
        try {
            const data = await this.$http.get(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response;
        }
    }

    public async GetProjects(query:string|undefined = undefined): Promise<AxiosResponse<ProjectInfo[]>>{
        const url = `?tagQuery=${query ?? ''}`;
        const data = await this.$http.get<ProjectInfo[]>(url);
        return data;
    }

    public async GetProject(projectId: string): Promise<AxiosResponse<ProjectInfo>>{
        const url = `${projectId}`;
        const data = await this.$http.get<ProjectInfo>(url);
        return data;
    }

    public async GetTags(): Promise<AxiosResponse<any>>{
        const url = `/tags`;
        const data = await this.$http.get<any>(url);
        return data;
    }
}

export const ProjectApi = ProjectService.Instance;
