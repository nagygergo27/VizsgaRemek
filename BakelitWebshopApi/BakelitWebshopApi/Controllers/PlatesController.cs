using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakelitWebshopApi.Data;
using BakelitWebshopApi.Models;

namespace BakelitWebshopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatesController : ControllerBase
    {
        private readonly BakelitWebshopApiContext _context;

        public PlatesController(BakelitWebshopApiContext context)
        {
            _context = context;
        }

        // GET: api/Plates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plate>>> GetPlate()
        {
            return await _context.Plate.ToListAsync();
        }

        // GET: api/Plates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plate>> GetPlate(int id)
        {
            var plate = await _context.Plate.FindAsync(id);

            if (plate == null)
            {
                return NotFound();
            }

            return plate;
        }

        // PUT: api/Plates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlate(int id, Plate plate)
        {
            if (id != plate.Id)
            {
                return BadRequest();
            }

            _context.Entry(plate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlateExists(id))
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

        // POST: api/Plates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Plate>> PostPlate(Plate plate)
        {
            _context.Plate.Add(plate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlate", new { id = plate.Id }, plate);
        }

        // DELETE: api/Plates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlate(int id)
        {
            var plate = await _context.Plate.FindAsync(id);
            if (plate == null)
            {
                return NotFound();
            }

            _context.Plate.Remove(plate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlateExists(int id)
        {
            return _context.Plate.Any(e => e.Id == id);
        }
    }
}
