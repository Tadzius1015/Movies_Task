using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class ActorsContext : DbContext
    {
        public ActorsContext (DbContextOptions<ActorsContext> options)
            : base(options)
        {
        }

        public DbSet<Server.Models.Actor> Actor { get; set; }
    }
}
