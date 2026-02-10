


namespace CapstoneConstruction.Models
{
    public class TaskItem
    {
        public int TaskItemId { get; set; }
        public string TaskName { get; set; } = string.Empty;
        public string TaskDescription { get; set; } = string.Empty;
        public Status Status { get; set; }
        public int ProjectId {  get; set; }
        public Project? Project { get; set; }
        public int? EngineerId {  get; set; }
        public Engineer? Engineer { get; set; }
    }
}
