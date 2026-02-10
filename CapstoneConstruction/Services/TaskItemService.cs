using CapstoneConstruction.Data;
using CapstoneConstruction.Dtos;
using CapstoneConstruction.Models;
using CapstoneConstruction.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CapstoneConstruction.Services
{
    public class TaskItemService : ITaskItemService
    {
        private readonly ConstructionDbContext _context;
        public TaskItemService(ConstructionDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ReadTaskItemDto>> GetAllAsync()
        {
            return await _context.Tasks
                .Select(t => new ReadTaskItemDto(
                    t.TaskItemId,
                    t.TaskName,
                    t.TaskDescription,
                    t.Status,
                    t.ProjectId,
                    t.EngineerId
                ))
                .ToListAsync();
        }
        public async Task<ReadTaskItemDto?> GetByIdAsync(int id)
        {
            return await _context.Tasks
                .Where(t => t.TaskItemId == id)
                .Select(t => new ReadTaskItemDto(
                    t.TaskItemId,
                    t.TaskName,
                    t.TaskDescription,
                    t.Status,
                    t.ProjectId,
                    t.EngineerId
                ))
                .FirstOrDefaultAsync();
        }
        public async Task<int> CreateAsync(CreateTaskItemDto dto)
        {
            var taskItem = new TaskItem
            {
                TaskName = dto.TaskName,
                TaskDescription = dto.TaskDescription,
                ProjectId = dto.ProjectId,
                Status = dto.Status,
                EngineerId = dto.EngineerId
            };

            _context.Tasks.Add(taskItem);
            await _context.SaveChangesAsync();

            return taskItem.TaskItemId;
        }
        public async Task<bool> UpdateAsync(int id, UpdateTaskItemDto dto)
        {
            var taskItem = await _context.Tasks.FindAsync(id);
            if (taskItem == null)
                return false;

            if (dto.TaskName != null)
                taskItem.TaskName = dto.TaskName;

            if (dto.TaskDescription != null)
                taskItem.TaskDescription = dto.TaskDescription;

            if (dto.Status.HasValue)
                taskItem.Status = dto.Status.Value;

            if (dto.EngineerId.HasValue)
                taskItem.EngineerId = dto.EngineerId;

            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var taskItem = await _context.Tasks.FindAsync(id);
            if (taskItem == null)
                return false;

            _context.Tasks.Remove(taskItem);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<IEnumerable<ReadTaskItemDto>> GetByProjectIdAsync(int projectId)
        {
            var projectExists = await _context.Projects
                .AnyAsync(p => p.ProjectId == projectId);

            if (!projectExists)
                return Enumerable.Empty<ReadTaskItemDto>();

            return await _context.Tasks
                .Where(t => t.ProjectId == projectId)
                .Select(t => new ReadTaskItemDto(
                    t.TaskItemId,
                    t.TaskName,
                    t.TaskDescription,
                    t.Status,
                    t.ProjectId,
                    t.EngineerId
                ))
                .ToListAsync();
        }
    }
}
