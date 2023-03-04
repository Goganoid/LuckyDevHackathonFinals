using AutoMapper;
using LuckyDevFinals.Entities;
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
        
        CreateMap<CompanyRegisterRequestDTO, Company>();
        CreateMap<Company, CompanyResponseDTO>();
    }
}