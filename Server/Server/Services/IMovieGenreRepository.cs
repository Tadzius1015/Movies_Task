using Server.DTOS;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IMovieGenreRepository
    {
        Task<MovieGenreDTO> PostMovieGenre(MovieGenresAddRequest request);

        Task<MovieGenreDTO> DeleteMovieGenre(int id, MovieGenresDeleteRequest request);
    }
}
