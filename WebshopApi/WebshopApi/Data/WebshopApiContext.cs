using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebshopApi.Models;
using WebshopApi.Model;

namespace WebshopApi.Data
{
    public class WebshopApiContext : DbContext
    {
        public WebshopApiContext (DbContextOptions<WebshopApiContext> options)
            : base(options)
        {
        }

        public DbSet<WebshopApi.Models.Item> Item { get; set; } = default!;
        public DbSet<WebshopApi.Models.Order> Order { get; set; } = default!;
        public DbSet<WebshopApi.Model.Product> Product { get; set; } = default!;
    }
}
