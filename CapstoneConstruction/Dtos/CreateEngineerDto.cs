using System.ComponentModel.DataAnnotations;

namespace CapstoneConstruction.Dtos
{
    public record CreateEngineerDto
    (
        [param: Required(AllowEmptyStrings = false)] string EngineerName,
        [param: Required(AllowEmptyStrings = false)] string EngineerRole
    );
}
