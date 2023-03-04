using LuckyDevFinals.Entities.DTO.User;

namespace LuckyDevFinals.Entities.DTO;

public class VacancyDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<TagDTO> Tags { get; set; }
    public List<UserResponseDTO> Candidates { get; set; } = new();
    public UserResponseDTO? AcceptedCandidate { get; set; }
}