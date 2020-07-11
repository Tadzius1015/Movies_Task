using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Server.Data;
using Server.DTOS;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private IMovieRepository _movieRepository;

        public MoviesController(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        // GET: api/Movies
        [HttpGet]
        public ActionResult<IEnumerable<MovieDTO>> GetMovie()
        {
            return Ok(_movieRepository.GetMovie());
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public ActionResult<MovieDTO> GetMovie(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }

            var movie = _movieRepository.GetMovie(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }
            if (!_movieRepository.MovieExists(id))
            {
                return NotFound();
            }

            return Ok(await _movieRepository.PutMovie(id, movie));
        }

        // POST: api/Movies
        [HttpPost]
        public async Task<ActionResult<MovieDTO>> PostMovie(Movie movie)
        {
            return CreatedAtAction("GetMovie", new { id = movie.Id }, await _movieRepository.PostMovie(movie));
        }

        // DELETE: api/Movies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieDTO>> DeleteMovie(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            await _movieRepository.DeleteMovie(id);

            return NoContent();
        }

        [HttpGet("{pattern}/{searchType}")]
        public ActionResult<IEnumerable<MovieDTO>> Search(string pattern, string searchType)
        {
            if (pattern == "" || searchType == "")
            {
                return BadRequest();
            }

            return Ok(_movieRepository.Search(pattern, searchType));
        }
    }
}
