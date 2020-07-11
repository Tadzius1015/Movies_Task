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
    public class MovieGenreRepository : IMovieGenreRepository
    {
        private ServerContext _context;
        private IMapper Mapper;
        public MovieGenreRepository(ServerContext context)
        {
            _context = context;
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<MovieGenre, MovieGenreDTO>();
            });
            Mapper = config.CreateMapper();
        }

        public async Task<MovieGenreDTO> PostMovieGenre(MovieGenresAddRequest request)
        {
            foreach (Genre item in request.AddingGenres)
            {
                if (!MovieGenreExists(item.Id, request.MovieId))
                {
                    _context.MovieGenre.Add(new MovieGenre(item.Id, request.MovieId));
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

            MovieGenre lastReturningValue = new MovieGenre(request.AddingGenres[request.AddingGenres.Count - 1].Id, request.MovieId);

            return Mapper.Map<MovieGenre, MovieGenreDTO>(lastReturningValue);
        }

        public async Task<MovieGenreDTO> DeleteMovieGenre(int id, MovieGenresDeleteRequest request)
        {
            foreach (Genre genre in request.DeletingGenres)
            {
                var movieGenre = await _context.MovieGenre.Where(el => el.GenreId == genre.Id && el.MovieId == id).FirstOrDefaultAsync();
                _context.MovieGenre.Remove(movieGenre);
            }
            await _context.SaveChangesAsync();
            MovieGenre lastReturningValue = new MovieGenre(request.DeletingGenres[request.DeletingGenres.Count - 1].Id, id);

            return Mapper.Map<MovieGenre, MovieGenreDTO>(lastReturningValue);
        }

        private bool MovieGenreExists(int genreId, int movieId)
        {
            return _context.MovieGenre.Any(e => e.GenreId == genreId && e.MovieId == movieId);
        }
    }
}
