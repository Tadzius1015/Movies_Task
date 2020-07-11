using Server.DTOS;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IMovieRepository
    {
        IEnumerable<MovieDTO> GetMovie();

        MovieDTO GetMovie(int id);

        Task<MovieDTO> PutMovie(int id, Movie movie);

        Task<MovieDTO> PostMovie(Movie movie);

        Task<MovieDTO> DeleteMovie(int id);

        IEnumerable<MovieDTO> Search(string pattern, string searchType);

        bool MovieExists(int id);
    }
}
