namespace LuckyDevFinals.Entities.DTO;

public class CreateVacancyDTO
{
    public string Name { get; set; }
    public List<NewTagDTO> Tags { get; set; }
}