using CapstoneConstruction.Dtos;
using CapstoneConstruction.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneConstruction.Controllers
{
    [ApiController]
    [Route("api/engineers")]
    public class EngineerController : ControllerBase
    {
        private readonly IEngineerService _engineerService;
        public EngineerController(IEngineerService engineerService)
        {
            _engineerService = engineerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var engineers = await _engineerService.GetAllAsync();
            return Ok(engineers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var engineer = await _engineerService.GetByIdAsync(id);
            return engineer == null ? NotFound() : Ok(engineer);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateEngineerDto dto)
        {
            var id = await _engineerService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateEngineerDto dto)
        {
            var updated = await _engineerService.UpdateAsync(id, dto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _engineerService.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
