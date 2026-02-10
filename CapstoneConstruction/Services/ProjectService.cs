using CapstoneConstruction.Data;
using CapstoneConstruction.Dtos;
using CapstoneConstruction.Models;
using CapstoneConstruction.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CapstoneConstruction.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ConstructionDbContext _context;

        public ProjectService(ConstructionDbContext context)
        {
            _context = context;
        }
        public async Task<int> CreateAsync(CreateProjectDto dto)
        {
            var manager = await _context.Engineers.FindAsync(dto.ManagerId);
            if (manager == null)
                throw new ArgumentException($"Manager ID {dto.ManagerId} not found.");

            var project = new Project
            {
                ProjectName = dto.ProjectName,
                ProjectDescription = dto.ProjectDescription,
                StartDate = DateTime.SpecifyKind(dto.StartDate, DateTimeKind.Utc),
                Status = dto.Status,
                ManagerId = dto.ManagerId,
                ManagerName = manager.EngineerName,
                EstimatedBudget = dto.EstimatedBudget
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project.ProjectId;
        }
        public async Task<IEnumerable<ReadProjectDto>> GetAllAsync()
        {
            return await _context.Projects
                .Select(p => new ReadProjectDto(
                    p.ProjectId,
                    p.ProjectName,
                    p.ProjectDescription,
                    p.StartDate,
                    p.EndDate,
                    p.Status,
                    p.ManagerId,
                    p.ManagerName,
                    p.EstimatedBudget,
                    p.ActualCost
                ))
                .ToListAsync();
        }

        public async Task<ReadProjectDto?> GetByIdAsync(int id)
        {
            return await _context.Projects
                .Where(p => p.ProjectId == id) 
                .Select(p => new ReadProjectDto(
                    p.ProjectId,
                    p.ProjectName,
                    p.ProjectDescription,
                    p.StartDate,
                    p.EndDate,
                    p.Status,
                    p.ManagerId,
                    p.ManagerName,
                    p.EstimatedBudget,
                    p.ActualCost
                ))
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateAsync(int id, UpdateProjectDto dto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            if (dto.ProjectName != null)
                project.ProjectName = dto.ProjectName;

            if (dto.ProjectDescription != null)
                project.ProjectDescription = dto.ProjectDescription;

            if (dto.EndDate.HasValue)
                project.EndDate = DateTime.SpecifyKind(dto.EndDate.Value, DateTimeKind.Utc);

            if (dto.Status.HasValue)
                project.Status = dto.Status.Value;

            if (dto.ActualCost.HasValue)
                project.ActualCost = dto.ActualCost.Value;

            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<bool> DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }
        }
}
