using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOS;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class MovieActorRepository : IMovieActorRepository
    {
        private ServerContext _context;
        private IMapper Mapper;
        public MovieActorRepository(ServerContext context)
        {
            _context = context;
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<MovieActor, MovieActorDTO>();
            });
            Mapper = config.CreateMapper();
        }

        public async Task<MovieActorDTO> PostMovieActor(MovieActorsAddRequest request)
        {
            foreach (Actor item in request.AddingActors)
            {
                if (!MovieActorExists(item.Id, request.MovieId))
                {
                    _context.MovieActor.Add(new MovieActor(item.Id, request.MovieId));
                }
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            MovieActor lastReturningValue = new MovieActor(request.AddingActors[request.AddingActors.Count - 1].Id, request.MovieId);

            return Mapper.Map<MovieActor, MovieActorDTO>(lastReturningValue);
        }

        public async Task<MovieActorDTO> DeleteMovieActor(int id, MovieActorsDeleteRequest request)
        {
            foreach (Actor actor in request.DeletingActors)
            {
                var movieActor = await _context.MovieActor.Where(el => el.ActorId == actor.Id && el.MovieId == id).FirstOrDefaultAsync();
                _context.MovieActor.Remove(movieActor);
            }
            await _context.SaveChangesAsync();
            MovieActor lastReturningValue = new MovieActor(request.DeletingActors[request.DeletingActors.Count - 1].Id, id);

            return Mapper.Map<MovieActor, MovieActorDTO>(lastReturningValue);
        }

        private bool MovieActorExists(int actorId, int movieId)
        {
            return _context.MovieActor.Any(e => e.ActorId == actorId && e.MovieId == movieId);
        }
    }
}
