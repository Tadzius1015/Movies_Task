using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOS;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private IGenreRepository _genreRepository;

        public GenresController(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        // GET: api/Genres
        [HttpGet]
        public ActionResult<IEnumerable<GenreDTO>> GetGenre()
        {
            return Ok(_genreRepository.GetGenre());
        }

        // GET: api/Genres/5
        [HttpGet("{id}")]
        public ActionResult<GenreDTO> GetGenre(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }

            var genre = _genreRepository.GetGenre(id);

            if (genre == null)
            {
                return NotFound();
            }

            return Ok(genre);
        }

        // PUT: api/Genres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGenre(int id, Genre genre)
        {
            if (id != genre.Id)
            {
                return BadRequest();
            }
            if (!_genreRepository.GenreExists(id))
            {
                return NotFound();
            }

            return Ok(await _genreRepository.PutGenre(id, genre));
        }

        // POST: api/Genres
        [HttpPost]
        public async Task<ActionResult<GenreDTO>> PostGenre(Genre genre)
        {
            if (_genreRepository.GenreExists(genre.Name))
            {
                return BadRequest("Genre exists in system!");
            }

            return CreatedAtAction("GetGenre", new { id = genre.Id }, await _genreRepository.PostGenre(genre));
        }

        // DELETE: api/Genres/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GenreDTO>> DeleteGenre(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            await _genreRepository.DeleteGenre(id);

            return NoContent();
        }
    }
}
