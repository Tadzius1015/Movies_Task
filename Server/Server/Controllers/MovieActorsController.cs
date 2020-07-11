using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieActorsController : ControllerBase
    {
        private IMovieActorRepository _movieActorRepository;

        public MovieActorsController(IMovieActorRepository movieActorRepository)
        {
            _movieActorRepository = movieActorRepository;
        }

        [HttpPost]
        public async Task<ActionResult<MovieActor>> PostMovieActor([FromBody] MovieActorsAddRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            await _movieActorRepository.PostMovieActor(request);

            return StatusCode(201, request.AddingActors);
        }

        // DELETE: api/MovieActors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieActor>> DeleteMovieActor(int id, [FromBody] MovieActorsDeleteRequest request)
        {
            if (id <= 0 || request == null)
            {
                return BadRequest();
            }

            await _movieActorRepository.DeleteMovieActor(id, request);

            return NoContent();
        }
    }
}
