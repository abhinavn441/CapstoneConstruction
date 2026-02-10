public enum Status
{
    Planned,
    InProgress,
    OnHold,
    Completed,
    Cancelled
}


namespace CapstoneConstruction.Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public string ProjectDescription { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public Status Status { get; set; }

        public int ManagerId { get; set; }
        public string ManagerName { get; set; } = string.Empty;

        public decimal EstimatedBudget { get; set; }
        public decimal ActualCost { get; set; }

        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();

        //public DateTime CreatedAt { get; set; }
        //public DateTime UpdatedAt { get; set; }
    }

}
