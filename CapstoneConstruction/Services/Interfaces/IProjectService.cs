using CapstoneConstruction.Dtos;

namespace CapstoneConstruction.Services.Interfaces
{
    public interface IProjectService
    {
        Task<int> CreateAsync(CreateProjectDto dtos);
        Task<IEnumerable<ReadProjectDto>> GetAllAsync();
        Task<ReadProjectDto?> GetByIdAsync(int id);
        Task<bool> UpdateAsync(int id, UpdateProjectDto dtos);
        Task<bool> DeleteAsync(int id);
    }
}
