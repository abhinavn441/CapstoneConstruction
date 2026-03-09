using System.ComponentModel.DataAnnotations;

namespace CapstoneConstruction.Dtos
{
    public record CreateTaskItemDto
    (
        [param: Required(AllowEmptyStrings = false)] string TaskName,
        [param: Required(AllowEmptyStrings = false)] string TaskDescription,
        int ProjectId,
        Status Status,
        int? EngineerId
    );
}
