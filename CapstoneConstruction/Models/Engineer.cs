using System.ComponentModel.DataAnnotations;

namespace CapstoneConstruction.Models
{
    public class Engineer
    {
        public int EngineerId { get; set; }
        public required string EngineerName { get; set; }
        public string EngineerRole { get; set; }=String.Empty;

       public ICollection<TaskItem> Tasks { get; set; }=new List<TaskItem>();
    }
}
