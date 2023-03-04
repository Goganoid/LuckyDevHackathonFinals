import { AxiosError, type AxiosResponse } from "axios";
import { isLoggedIn, getToken } from "src/utils/storage";
import { BaseService } from "./base.service";

export interface UserInformation{
        id: number,
        firstName: string,
        lastName: string,
        email: string
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

    public async GetUserInfo(): Promise<AxiosResponse<UserInformation>>{
        const url = `info/`;
        const data = await this.$http.get<UserInformation>(url);
        return data;
    }
}

export const UserApi = UserService.Instance;
