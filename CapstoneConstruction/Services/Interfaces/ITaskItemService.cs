using CapstoneConstruction.Dtos;

namespace CapstoneConstruction.Services.Interfaces
{
    public interface ITaskItemService
    {
        Task<IEnumerable<ReadTaskItemDto>> GetAllAsync();
        Task<ReadTaskItemDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateTaskItemDto dtos);
        Task<bool> UpdateAsync(int id, UpdateTaskItemDto dtos);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<ReadTaskItemDto>> GetByProjectIdAsync(int projectId);
    }
}
