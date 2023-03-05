import { AxiosResponse, AxiosError } from "axios";
import { isLoggedIn, getToken, isCompany } from "../utils/storage";
import { BaseService } from "./base.service";
import { Tag, UserInformation } from "./user.service";

export interface Candidate {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    skillTags: Tag[];
    about: string;
    englishLevel: number;
    cvLink: string;
}

export interface Vacancy {
    id: number;
    name: string;
    tags: Tag[];
    candidates: Candidate[];
    acceptedCandidate?: Candidate;
}

export interface ProjectInfo {
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
    projects: ProjectInfo[];
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
    public async AcceptCandidate(userId: number, vacancyId: number): Promise<AxiosResponse<any>>{
        const url = `accept`;
        const request = {
            userId,
            vacancyId
        };
        const data = await this.$http.post(url, JSON.stringify(request), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data;
    }
}

export const CompanyApi = CompanyService.Instance;