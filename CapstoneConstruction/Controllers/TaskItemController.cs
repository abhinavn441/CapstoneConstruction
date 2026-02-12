using CapstoneConstruction.Dtos;
using CapstoneConstruction.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneConstruction.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/taskitem")]
    public class TaskItemController : ControllerBase
    {
        private readonly ITaskItemService _taskItemService;

        public TaskItemController(ITaskItemService taskItemService)
        {
            _taskItemService = taskItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _taskItemService.GetAllAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _taskItemService.GetByIdAsync(id);
            return task == null ? NotFound() : Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(CreateTaskItemDto dto)
        {
            var id = await _taskItemService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetTaskById), new { id }, null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, UpdateTaskItemDto dto)
        {
            var updated = await _taskItemService.UpdateAsync(id, dto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var deleted = await _taskItemService.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        [HttpGet("/api/projects/{projectId}/tasks")]
        public async Task<IActionResult> GetTasksForProject(int projectId)
        {
            var tasks = await _taskItemService.GetByProjectIdAsync(projectId);
            return Ok(tasks);
        }
    }
}
