namespace LuckyDevFinals.Helpers;

public class AppSettings
{
    public string Secret { get; set; } = string.Empty;
    public string ValidIssuer { get; set; } = string.Empty;
    public string ValidAudience { get; set; } = string.Empty;
}