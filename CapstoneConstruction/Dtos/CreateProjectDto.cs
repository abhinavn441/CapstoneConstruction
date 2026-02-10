namespace CapstoneConstruction.Dtos
{
    public record CreateProjectDto
    (
        string ProjectName,
        string ProjectDescription,
        DateTime StartDate,
        Status Status,
        int ManagerId,
        decimal EstimatedBudget
    );

}
