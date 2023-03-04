namespace LuckyDevFinals.Entities.DTO;

public class CreateProjectRequestDTO
{
    public string Description { get; set; }
    public string Title { get; set; }
    public LanguageLevel EnglishLevel { get; set; }
    public List<CreateVacancyDTO> Vacancies { get; set; }
}