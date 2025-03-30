using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebshopApi.Data;
using WebshopApi.Models;

namespace WebshopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly WebshopApiContext _context;

        public OrdersController(WebshopApiContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            return await _context.Order.Include(x => x.Items)
                                       .ThenInclude(i => i.Product)  // Betöltjük a termék adatokat is
                                       .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Order
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)  // Betöltjük a termék adatokat is
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // GET: api/Orders/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUserId(string userId)
        {
            var orders = await _context.Order
                .Where(o => o.UId == userId)  // Feltételezve, hogy a rendelés UId-ja megegyezik a felhasználó azonosítójával
                .Include(o => o.Items)         // Rendeléshez tartozó tételek betöltése
                .ThenInclude(i => i.Product)   // Termékek betöltése az egyes tételekhez
                .ToListAsync();

            if (orders == null || !orders.Any())
            {
                return NotFound();  // Ha nincsenek rendelések, 404-es hibát adunk vissza
            }

            return Ok(orders);  // Ha vannak rendelések, visszaadjuk őket
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Order.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Order.Where(x => x.Id == id).Include(x => x.Items).FirstOrDefaultAsync();
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Orders/clean-invalid-items
        [HttpDelete("clean-invalid-items")]
        public async Task<IActionResult> CleanInvalidItems()
        {
            // Lekérjük az érvénytelen tételeket, amelyek nem kapcsolódnak létező termékhez
            var invalidItems = _context.Item
                .Where(i => !i.ProductId.HasValue || !_context.Product.Any(p => p.Id == i.ProductId))
                .ToList();

            if (!invalidItems.Any())
            {
                // Ha nincsenek érvénytelen tételek
                return Ok("Nincsenek érvénytelen tételek a rendszerben.");
            }

            // Töröljük az érvénytelen tételeket
            _context.Item.RemoveRange(invalidItems);
            await _context.SaveChangesAsync();

            // Értesítjük a felhasználót, hogy sikeresen töröltük az érvénytelen tételeket
            return Ok($"{invalidItems.Count} érvénytelen tétel törlésre került.");
        }

        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.Id == id);
        }
    }
}
