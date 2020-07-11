using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Server.Data;
using Server.DTOS;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class MovieRepository : IMovieRepository
    {
        private ServerContext _context;
        private IMapper Mapper;
        public MovieRepository(ServerContext context, IMapper mapper)
        {
            _context = context;
            Mapper = mapper;
        }
        public IEnumerable<MovieDTO> GetMovie()
        {
            var moviesFromContext = _context.Movie.Include(act => act.MovieActor).ThenInclude(act => act.Actor).Include(mv => mv.MovieGenre).
                ThenInclude(mv => mv.Genre).ToList();
            List <MovieDTO> movies = new List<MovieDTO>();

            foreach (Movie item in moviesFromContext)
            {
                var movieActors = new List<MovieActorDTO>();
                var movieGenres = new List<MovieGenreDTO>();
                item.MovieActor.ForEach(action =>
                {
                    movieActors.Add(new MovieActorDTO(action.ActorId, action.MovieId, Mapper.Map<Actor, ActorDTO>(action.Actor), Mapper.Map<Movie, MovieDTO>(action.Movie)));
                });
                item.MovieGenre.ForEach(action =>
                {
                    movieGenres.Add(new MovieGenreDTO(action.GenreId, action.MovieId, Mapper.Map<Genre, GenreDTO>(action.Genre), Mapper.Map<Movie, MovieDTO>(action.Movie)));
                });
                movies.Add(new MovieDTO(item.Id, item.Name, item.ReleaseDate, movieActors, movieGenres));
            }
            return movies;
        }

        public MovieDTO GetMovie(int id)
        {
            var movie = _context.Movie.Include(act => act.MovieActor).ThenInclude(act => act.Actor).Include(mv => mv.MovieGenre).
                ThenInclude(mv => mv.Genre).FirstOrDefault(sc => sc.Id == id);

            return Mapper.Map<Movie, MovieDTO>(movie);
        }
        public async Task<MovieDTO> PutMovie(int id, Movie movie)
        {
            if (movie == null)
            {
                return null;
            }

            _context.Entry(movie).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();

            return GetMovie(id);
        }

        public async Task<MovieDTO> PostMovie(Movie movie)
        {
            if (movie == null)
            {
                return null;
            }

            _context.Movie.Add(movie);
            await _context.SaveChangesAsync();

            return GetMovie((int)movie.Id);
        }

        public async Task<MovieDTO> DeleteMovie(int id)
        {
            var movie = _context.Movie.Find(id);
            if (movie == null)
            {
                return null;
            }

            _context.Movie.Remove(movie);
            await _context.SaveChangesAsync();

            return Mapper.Map<Movie, MovieDTO>(movie);
        }

        public IEnumerable<MovieDTO> Search(string pattern, string searchType)
        {
            var movies = GetMovie();
            if (searchType.Equals("name"))
            {
                return movies.Where(mv => mv.Name.Contains(pattern)).ToList();
            }
            else if (searchType.Equals("releaseDate"))
            {
                return movies.Where(mv => mv.ReleaseDate.ToString().Contains(pattern)).ToList();
            }

            return movies.Where(mv => mv.MovieGenre.Any(m => m.Genre.Name.Contains(pattern))).ToList();
        }

        public bool MovieExists(int id)
        {
            return _context.Movie.Any(e => e.Id == id);
        }
    }
}
