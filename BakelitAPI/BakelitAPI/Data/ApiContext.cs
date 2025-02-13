using Microsoft.EntityFrameworkCore;
using BakelitAPI.Models;

namespace BakelitAPI.Data
{
    public class ApiContext : DbContext
    {
        public DbSet<Bakelit> Bakelits { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options ):base(options) {

        }
    }
}
