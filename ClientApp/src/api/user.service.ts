import { CompanyInformation } from './company.service';
import { AxiosError, type AxiosResponse } from "axios";
import { isLoggedIn, getToken } from "../utils/storage";
import { BaseService } from "./base.service";

export interface UserInformation {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    skillTags: Tag[],
    about: string,
    englishLevel: number,
    cvLink: string | "",
}

export interface Tag {
    id: number,
    label: string,
}

export interface Invite{
    id: number;
    message: string;
    company: CompanyInformation;
    vacancyId: number;
    status: number;
    userId: number;
}
export interface Application{
    id: number;
    name: string;
    status: number;
}

// Service that handles all requests connected with user actions
class UserService extends BaseService {
    private static _sampleService: UserService;
    private static _controller: string = 'Users';
    private constructor(name: string) {
        super(name);
        if (isLoggedIn())
            this.$http.defaults.headers.common['Authorization'] = `bearer ${getToken()}`;
    }

    public static get Instance(): UserService {
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

    public async GetUserInfo(userId: string): Promise<AxiosResponse<UserInformation>>{
        const url = `${userId}`;
        const data = await this.$http.get<UserInformation>(url);
        return data;
    }

    public async GetUsers(query:string|undefined = undefined): Promise<AxiosResponse<UserInformation[]>>{
        const url = `?tagQuery=${query ?? ''}`;
        const data = await this.$http.get<UserInformation[]>(url);
        return data;
    }

    public async Apply(vacancyId: number): Promise<AxiosResponse<any>|undefined>{
        const url = `apply/${vacancyId}`;
        try {
            const data = await this.$http.post(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response;
        }
    }
    public async GetInvites(): Promise<AxiosResponse<Invite[]>>{
        const url = `invites`;
        const data = await this.$http.get<Invite[]>(url);
        return data;
    }
    public async GetApplications(): Promise<AxiosResponse<Application[]>>{
        const url = `applications`;
        const data = await this.$http.get<Application[]>(url);
        return data;
    }
    public async Accept(inviteId: number): Promise<AxiosResponse<any>|undefined>{
        const url = `invites/accept/${inviteId}`;
        try {
            const data = await this.$http.put(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response;
        }
    }
    public async Decline(inviteId: number): Promise<AxiosResponse<any>|undefined>{
        const url = `invites/decline/${inviteId}`;
        try {
            const data = await this.$http.put(url);
            return data;
        }
        catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response;
        }
    }
}

export const UserApi = UserService.Instance;
