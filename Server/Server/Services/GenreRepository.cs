using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Server.Data;
using Server.DTOS;
using Server.Models;

namespace Server.Services
{
    public class GenreRepository : IGenreRepository
    {
        private ServerContext _context;
        private IMapper Mapper;
        public GenreRepository(ServerContext context)
        {
            _context = context;
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Genre, GenreDTO>();
            });
            Mapper = config.CreateMapper();
        }
        public IEnumerable<GenreDTO> GetGenre()
        {
            return _context.Genre.Select(genre => Mapper.Map<Genre, GenreDTO>(genre));
        }

        public GenreDTO GetGenre(int id)
        {
            var genre = GetGenre().FirstOrDefault(gen => gen.Id == id);

            return genre;
        }
        public async Task<GenreDTO> PutGenre(int id, Genre genre)
        {
            if (genre == null)
            {
                return null;
            }

            _context.Genre.Update(genre);
            await _context.SaveChangesAsync();

            return GetGenre(id);
        }

        public async Task<GenreDTO> PostGenre(Genre genre)
        {
            if (genre == null)
            {
                return null;
            }

            _context.Genre.Add(genre);
            await _context.SaveChangesAsync();

            return GetGenre((int)genre.Id);
        }

        public async Task<GenreDTO> DeleteGenre(int id)
        {
            var genre = _context.Genre.Find(id);
            if (genre == null)
            {
                return null;
            }

            _context.Genre.Remove(genre);
            await _context.SaveChangesAsync();

            return Mapper.Map<Genre, GenreDTO>(genre);
        }

        public bool GenreExists(int id)
        {
            return _context.Genre.Any(e => e.Id == id);
        }

        public bool GenreExists(string name)
        {
            if (_context.Genre.Where(e => e.Name.ToLower().Equals(name.ToLower())).FirstOrDefault() != null)
            {
                return true;
            }

            return false;
        }
    }
}
