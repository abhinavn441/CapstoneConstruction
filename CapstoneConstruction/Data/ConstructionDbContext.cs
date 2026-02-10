using Microsoft.EntityFrameworkCore;
using CapstoneConstruction.Models;

namespace CapstoneConstruction.Data
{
    public class ConstructionDbContext : DbContext
    {
        public ConstructionDbContext(DbContextOptions<ConstructionDbContext> options) : base(options)
        {

        }
        public DbSet<Project> Projects => Set<Project>();
        public DbSet<TaskItem> Tasks => Set<TaskItem>();
        public DbSet<Engineer> Engineers => Set<Engineer>();
    }
}
