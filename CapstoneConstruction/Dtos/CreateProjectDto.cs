using System.ComponentModel.DataAnnotations;

namespace CapstoneConstruction.Dtos
{
    public record CreateProjectDto
    (
        [param: Required(AllowEmptyStrings = false)] string ProjectName,
        [param: Required(AllowEmptyStrings = false)] string ProjectDescription,
        DateTime StartDate,
        Status Status,
        int ManagerId,
        decimal EstimatedBudget
    );

}
