using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BakelitWebshopApi.Models;

namespace BakelitWebshopApi.Data
{
    public class BakelitWebshopApiContext : DbContext
    {
        public BakelitWebshopApiContext (DbContextOptions<BakelitWebshopApiContext> options)
            : base(options)
        {
        }

        public DbSet<BakelitWebshopApi.Models.Item> Item { get; set; } = default!;
        public DbSet<BakelitWebshopApi.Models.Order> Order { get; set; } = default!;
        public DbSet<BakelitWebshopApi.Models.Plate> Plate { get; set; } = default!;
    }
}
