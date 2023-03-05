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
        CreateMap<CreateReviewDTO, CompanyReview>();
        CreateMap<NewTagDTO, Tag>();
        CreateMap<Invite, InviteDTO>()
            .ForMember(i => i.UserId,
                options => options.MapFrom(i => i.User.Id))
            .ForMember(i=>i.VacancyId,
                options=>options.MapFrom(i=>i.Vacancy.Id));
    }
}