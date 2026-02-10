using CapstoneConstruction.Dtos;

namespace CapstoneConstruction.Services.Interfaces
{
    public interface IEngineerService
    {
        Task<IEnumerable<ReadEngineerDto>> GetAllAsync();
        Task<ReadEngineerDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateEngineerDto dto);
        Task<bool> UpdateAsync(int id, UpdateEngineerDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
