namespace LuckyDevFinals.Entities.DTO;

public class ProjectDTO
{
    public int Id { get; set; }
    public int CompanyId { get; set; }
    public string Description { get; set; }
    public string Title { get; set; }
    public ProjectHiringStatus ProjectHiringStatus { get; set; }
    public DateTime PublicationDate { get; set; }
    public LanguageLevel EnglishLevel { get; set; }
    public List<VacancyDTO> Vacancies { get; set; }
}