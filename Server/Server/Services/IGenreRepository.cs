using Server.DTOS;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IGenreRepository
    {
        IEnumerable<GenreDTO> GetGenre();

        GenreDTO GetGenre(int id);

        Task<GenreDTO> PutGenre(int id, Genre genre);

        Task<GenreDTO> PostGenre(Genre genre);

        Task<GenreDTO> DeleteGenre(int id);

        bool GenreExists(int id);

        bool GenreExists(string name);
    }
}
