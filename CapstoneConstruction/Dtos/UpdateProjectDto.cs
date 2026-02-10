namespace CapstoneConstruction.Dtos
{
    public record UpdateProjectDto
    {
        public string? ProjectName {  get; init; }
        public string? ProjectDescription { get; init; }
        public DateTime? EndDate { get; init; }
        public Status? Status { get; init; }
        public decimal? ActualCost { get; init; }
    }
}
