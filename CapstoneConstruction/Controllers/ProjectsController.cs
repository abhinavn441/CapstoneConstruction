using CapstoneConstruction.Data;
using CapstoneConstruction.Dtos;
using CapstoneConstruction.Models;
using CapstoneConstruction.Services;
using CapstoneConstruction.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CapstoneConstruction.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/projects")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProjectDto dto)
        {
            var id = await _projectService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var project = await _projectService.GetAllAsync();
            return Ok(project);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var project = await _projectService.GetByIdAsync(id);
            return (project == null) ? NotFound() : Ok(project);
        }

        [HttpPut("{id}") ]
        public async Task<IActionResult> UpdateById(int id, UpdateProjectDto dto)
        {
            var updated = await _projectService.UpdateAsync(id, dto);
            return (updated) ? NoContent() : NotFound();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var deleted = await _projectService.DeleteAsync(id);
            return (deleted) ? NoContent() : NotFound();
        }
    }
}
