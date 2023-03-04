using AutoMapper;
using LuckyDevFinals.Entities;
using LuckyDevFinals.Entities.DTO;
using LuckyDevFinals.Entities.DTO.Company;
using LuckyDevFinals.Entities.DTO.User;

namespace LuckyDevFinals.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<UserRegisterRequestDTO, User>();
        CreateMap<UserUpdateRequestDTO, User>();
        CreateMap<User, UserResponseDTO>();


        CreateMap<Tag, TagDTO>();
        CreateMap<TagDTO, Tag>();
        CreateMap<CompanyRegisterRequestDTO, Company>();
        CreateMap<Company, CompanyResponseDTO>();
        CreateMap<CompanyReview, CompanyReviewDTO>();
        CreateMap<Project, ProjectDTO>();
        CreateMap<Vacancy, VacancyDTO>();
        CreateMap<CreateVacancyDTO,Vacancy>();
        CreateMap<CreateProjectRequestDTO, Project>();
    }
}