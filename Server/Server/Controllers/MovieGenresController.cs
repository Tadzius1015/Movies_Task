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
using Server.DTOS;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieGenresController : ControllerBase
    {
        private IMovieGenreRepository _movieGenreRepository;

        public MovieGenresController(ServerContext context, IMovieGenreRepository movieGenreRepository)
        {
            _movieGenreRepository = movieGenreRepository;
        }

        // POST: api/MovieGenres
        [HttpPost]
        [Obsolete]
        public async Task<ActionResult<MovieGenreDTO>> PostMovieGenre([FromBody] MovieGenresAddRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }
            await _movieGenreRepository.PostMovieGenre(request);

            return StatusCode(201, request.AddingGenres);
        }

        // DELETE: api/MovieGenres/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieGenreDTO>> DeleteMovieGenre(int id, [FromBody] MovieGenresDeleteRequest request)
        {
            if (id <= 0 || request == null) 
            {
                return BadRequest();
            }

            await _movieGenreRepository.DeleteMovieGenre(id, request);

            return NoContent();
        }       
    }
}
