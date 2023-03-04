import { AxiosResponse, AxiosError } from "axios";
import { isLoggedIn, getToken, isCompany } from "../utils/storage";
import { BaseService } from "./base.service";
import { Tag, UserInformation } from "./user.service";


export interface Vacancy {
    id: number;
    name: string;
    tags: Tag[];
    candidates: any[];
    acceptedCandidate?: any;
}

export interface Project {
    id: number;
    companyId: number;
    description: string;
    title: string;
    projectHiringStatus: number;
    publicationDate: string;
    englishLevel: number;
    vacancies: Vacancy[];
}

export interface Review {
    id: number;
    userId: number;
    companyId: number;
    content: string;
}

export interface CompanyInformation {
    name: string;
    id: number;
    email: string;
    about: string;
    projects: Project[];
    reviews: Review[];
}



class CompanyService extends BaseService {
    private static _sampleService: CompanyService;
    private static _controller: string = 'Company';
    private constructor(name: string) {
        super(name);
        if (isLoggedIn() && isCompany())
            this.$http.defaults.headers.common['Authorization'] = `bearer ${getToken()}`;
    }

    public static get Instance(): CompanyService {
        return this._sampleService || (this._sampleService = new this(this._controller));
    }

    public async GetCompanyInfo(companyId: string): Promise<AxiosResponse<CompanyInformation>>{
        const url = `${companyId}`;
        const data = await this.$http.get<CompanyInformation>(url);
        return data;
    }
}

export const CompanyApi = CompanyService.Instance;