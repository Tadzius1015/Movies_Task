using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class ServerContext : DbContext
    {
        public ServerContext (DbContextOptions<ServerContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieActor>().HasKey(sc => new { sc.ActorId, sc.MovieId });

            modelBuilder.Entity<MovieActor>()
                .HasOne<Movie>(sc => sc.Movie)
                .WithMany(m => m.MovieActor)
                .HasForeignKey(sc => sc.MovieId);

            modelBuilder.Entity<MovieActor>()
                .HasOne<Actor>(sc => sc.Actor)
                .WithMany(m => m.MovieActor)
                .HasForeignKey(sc => sc.ActorId);

            modelBuilder.Entity<MovieGenre>().HasKey(sc => new { sc.GenreId, sc.MovieId });

            modelBuilder.Entity<MovieGenre>()
                .HasOne<Movie>(sc => sc.Movie)
                .WithMany(m => m.MovieGenre)
                .HasForeignKey(sc => sc.MovieId);

            modelBuilder.Entity<MovieGenre>()
                .HasOne<Genre>(sc => sc.Genre)
                .WithMany(m => m.MovieGenre)
                .HasForeignKey(sc => sc.GenreId);
        }

        public DbSet<Server.Models.Actor> Actor { get; set; }

        public DbSet<Server.Models.Genre> Genre { get; set; }

        public DbSet<Server.Models.Movie> Movie { get; set; }

        public DbSet<Server.Models.MovieActor> MovieActor { get; set; }

        public DbSet<Server.Models.MovieGenre> MovieGenre { get; set; }
    }
}
