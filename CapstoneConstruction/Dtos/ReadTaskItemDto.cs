namespace CapstoneConstruction.Dtos
{
    public record ReadTaskItemDto
    (
        int TaskItemId,
        string TaskName,
        string TaskDescription,
        Status Status,
        int ProjectId,
        int? EngineerId
    );
}
