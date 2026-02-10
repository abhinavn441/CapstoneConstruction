namespace CapstoneConstruction.Dtos
{
    public record ReadProjectDto
    (
        int ProjectId,
        string ProjectName,
        string ProjectDescription,
        DateTime StartDate,
        DateTime? EndDate,
        Status Status,
        int ManagerId,
        string ManagerName,
        decimal EstimatedBudget,
        decimal ActualCost
    );

}
