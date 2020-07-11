using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieGenresController : ControllerBase
    {
        private readonly ServerContext _context;

        public MovieGenresController(ServerContext context)
        {
            _context = context;
        }

        // GET: api/MovieGenres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieGenre>>> GetMovieGenre()
        {
            return await _context.MovieGenre.ToListAsync();
        }

        // GET: api/MovieGenres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieGenre>> GetMovieGenre(int id)
        {
            var movieGenre = await _context.MovieGenre.FindAsync(id);

            if (movieGenre == null)
            {
                return NotFound();
            }

            return movieGenre;
        }

        // PUT: api/MovieGenres/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieGenre(int id, MovieGenre movieGenre)
        {
            if (id != movieGenre.GenreId)
            {
                return BadRequest();
            }

            _context.Entry(movieGenre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieGenreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MovieGenres
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Obsolete]
        public async Task<ActionResult<MovieGenre>> PostMovieGenre([FromBody] MovieGenresAddRequest request)
        {
            foreach (Genre item in request.AddingGenres)
            {
                if(!MovieGenreExists(item.Id, request.MovieId))
                {
                    _context.MovieGenre.Add(new MovieGenre(item.Id, request.MovieId));
                }
            }
            _context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Genre ON");
            try
            {
                await _context.SaveChangesAsync();
                _context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Genre OFF");
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return StatusCode(201, request.AddingGenres);
        }

        // DELETE: api/MovieGenres/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieGenre>> DeleteMovieGenre(int id, [FromBody] MovieGenresDeleteRequest request)
        {
            foreach (Genre genre in request.DeletingGenres)
            {
                var movieGenre = await _context.MovieGenre.Where(el => el.GenreId == genre.Id && el.MovieId == id).FirstOrDefaultAsync();
                _context.MovieGenre.Remove(movieGenre);
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieGenreExists(int id)
        {
            return _context.MovieGenre.Any(e => e.GenreId == id);
        }

        private bool MovieGenreExists(int genreId, int movieId)
        {
            return _context.MovieGenre.Any(e => e.GenreId == genreId && e.MovieId == movieId);
        }
    }
}
