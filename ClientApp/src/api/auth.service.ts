import type { AxiosResponse } from "axios";
import { BaseService } from "./base.service";
import { AxiosError } from "axios";
import { getToken, isLoggedIn } from "../utils/storage";

// This service is responsible for Login and Register actions

export type LoginResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export interface UserUpdate {
    firstName?: string;
    lastName?: string;
    email?: string;
    tagIds?: number[];
    cvLink?: string;
    englishLevel?: number;
    about?: string;
    password?: string;
}

class AuthService extends BaseService {
    private static _sampleService: AuthService;
    private static _controller: string = 'Auth';
    
    private constructor(name: string) {
        super(name);
        if (isLoggedIn())
            this.$http.defaults.headers.common['Authorization'] = `bearer ${getToken()}`;
    }
  
    public static get Instance(): AuthService {
      return this._sampleService || (this._sampleService = new this(this._controller));
    }

    public async Login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        const url = `user/login`;
        const request = {
            email,
            password
        }
        const data  = await this.$http.post<LoginResponse>(url,JSON.stringify(request), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }
    public async CompanyLogin(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        const url = `company/login`;
        const request = {
            email,
            password
        }
        const data  = await this.$http.post<LoginResponse>(url,JSON.stringify(request), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }
    public async Register(firstName:string,lastName:string,email: string, password: string): Promise<AxiosResponse<any>> {
        const url = `user/register`;
        const request = {
            firstName,
            lastName,
            email,
            password
        }
        const data  = await this.$http.post(url,JSON.stringify(request), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }
    public async RegisterCompany(name:string,email: string, password: string): Promise<AxiosResponse<any>> {
        const url = `company/register`;
        const request = {
            name,
            email,
            password
        }
        console.log(request);
        const data  = await this.$http.post(url,JSON.stringify(request), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    }

    public async UpdateUser(newuser: UserUpdate): Promise<AxiosResponse<any>|undefined>{
        const url = `user/update/`;
        try {
            const data = await this.$http.put(url,JSON.stringify(newuser), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return data;
        } catch (error: any | AxiosError) {
            const err = error as AxiosError;
            return err.response
        }

        
    }
  }
  
export const AuthApi = AuthService.Instance;
