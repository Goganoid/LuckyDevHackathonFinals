import { AxiosError, type AxiosResponse } from "axios";
import { isLoggedIn, getToken } from "../utils/storage";
import { BaseService } from "./base.service";

export interface ProjectInformation {
    id: number,
    description: string,
    title: string,
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

    public async GetProjects(): Promise<AxiosResponse<ProjectInformation[]>>{
        const url = ``;
        const data = await this.$http.get<ProjectInformation[]>(url);
        return data;
    }
}

export const ProjectApi = ProjectService.Instance;
