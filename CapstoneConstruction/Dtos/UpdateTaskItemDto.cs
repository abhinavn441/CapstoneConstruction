namespace CapstoneConstruction.Dtos
{
    public record UpdateTaskItemDto
    {
        public string? TaskName { get; init; }
        public string? TaskDescription { get; init; }
        public Status? Status { get; init; }
        public int? EngineerId { get; init; }
    }
}
