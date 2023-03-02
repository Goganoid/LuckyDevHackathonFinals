using AutoMapper;
using LuckyDevFinals.Entities;
using LuckyDevFinals.Entities.DTO.User;

namespace RecipeWiki.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<RegisterRequestDTO, User>();
        CreateMap<UpdateRequestDTO, User>();
        CreateMap<User, UserResponseDTO>();
    }
}