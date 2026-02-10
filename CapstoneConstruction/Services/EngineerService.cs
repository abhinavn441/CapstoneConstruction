using CapstoneConstruction.Data;
using CapstoneConstruction.Dtos;
using CapstoneConstruction.Models;
using CapstoneConstruction.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CapstoneConstruction.Services
{
    public class EngineerService : IEngineerService
    {
        private readonly ConstructionDbContext _context;

        public EngineerService(ConstructionDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ReadEngineerDto>> GetAllAsync()
        {
            return await _context.Engineers
                .Select(e => new ReadEngineerDto(
                    e.EngineerId,
                    e.EngineerName,
                    e.EngineerRole
                ))
                .ToListAsync();
        }
        public async Task<ReadEngineerDto?> GetByIdAsync(int id)
        {
            return await _context.Engineers
                .Where(e => e.EngineerId == id)
                .Select(e => new ReadEngineerDto(
                    e.EngineerId,
                    e.EngineerName,
                    e.EngineerRole
                ))
                .FirstOrDefaultAsync();
        }
        public async Task<int> CreateAsync(CreateEngineerDto dto)
        {
            var engineer = new Engineer
            {
                EngineerName = dto.EngineerName,
                EngineerRole = dto.EngineerRole
            };

            _context.Engineers.Add(engineer);
            await _context.SaveChangesAsync();

            return engineer.EngineerId;
        }
        public async Task<bool> UpdateAsync(int id, UpdateEngineerDto dto)
        {
            var engineer = await _context.Engineers.FindAsync(id);
            if (engineer == null)
                return false;

            if (dto.EngineerName != null)
                engineer.EngineerName = dto.EngineerName;

            if (dto.EngineerRole != null)
                engineer.EngineerRole = dto.EngineerRole;

            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var engineer = await _context.Engineers.FindAsync(id);
            if (engineer == null)
                return false;

            _context.Engineers.Remove(engineer);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
