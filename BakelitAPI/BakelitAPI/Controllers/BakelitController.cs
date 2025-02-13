using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BakelitAPI.Models; 
using BakelitAPI.Data;

namespace BakelitAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BakelitController : ControllerBase
    {
        private readonly ApiContext _context;

        public BakelitController(ApiContext context)
        {
             _context = context;
        }

        [HttpPost]
        public JsonResult CreateEdit(Bakelit bak)
        {
            if (bak.Id == 0)
            {
                _context.Bakelits.Add(bak);
            }else
            {
                var bakInDb = _context.Bakelits.Find(bak.Id);

                if (bakInDb == null)
                    return new JsonResult(NotFound());

                bakInDb = bak;
            }

            _context.SaveChanges();
            
            return new JsonResult(Ok(bak));
        }

        [HttpGet]
        public JsonResult Get(int id)
        {
            var result = _context.Bakelits.Find(id);

            if (result == null)
                return new JsonResult(NotFound());

            return new JsonResult(Ok(result)); 
        }

        [HttpDelete]
        public JsonResult Delete(int id) 
        {
            var result = _context.Bakelits.Find(id);

            if(result == null)
                return new JsonResult(NotFound());
            _context.Bakelits.Remove(result);

            _context.SaveChanges();

            return new JsonResult(Ok(result));
        }
    }
}
