namespace CapstoneConstruction.Dtos
{
    public record CreateTaskItemDto
    (
        string TaskName,
        string TaskDescription,
        int ProjectId,
        Status Status,
        int? EngineerId
    );
}
