using IdentityAPI.Data;
using IdentityAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IdentityAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BuildingController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Building/Faculty/{facultyId}
        [HttpGet("Faculty/{facultyId}")]
        public async Task<ActionResult<IEnumerable<Building>>> GetBuildings(int facultyId)
        {
            return await _context.Buildings.Where(b => b.FacultyId == facultyId).Include(b => b.Rooms).ToListAsync();
        }

        // POST: api/Building
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Building>> CreateBuilding(Building building)
        {
            _context.Buildings.Add(building);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBuildings), new { facultyId = building.FacultyId }, building);
        }

        // PUT: api/Building/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateBuilding(int id, Building building)
        {
            if (id != building.Id)
            {
                return BadRequest();
            }

            _context.Entry(building).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BuildingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Building/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBuilding(int id)
        {
            var building = await _context.Buildings.FindAsync(id);
            if (building == null)
            {
                return NotFound();
            }

            _context.Buildings.Remove(building);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BuildingExists(int id)
        {
            return _context.Buildings.Any(e => e.Id == id);
        }
    }


}
