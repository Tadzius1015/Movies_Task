using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieActorsController : ControllerBase
    {
        private readonly ServerContext _context;

        public MovieActorsController(ServerContext context)
        {
            _context = context;
        }

        // GET: api/MovieActors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieActor>>> GetMovieActor()
        {
            return await _context.MovieActor.ToListAsync();
        }

        // GET: api/MovieActors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieActor>> GetMovieActor(int id)
        {
            var movieActor = await _context.MovieActor.FindAsync(id);

            if (movieActor == null)
            {
                return NotFound();
            }

            return movieActor;
        }

        // PUT: api/MovieActors/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieActor(int id, MovieActor movieActor)
        {
            if (id != movieActor.ActorId)
            {
                return BadRequest();
            }

            _context.Entry(movieActor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieActorExists(id))
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

        // POST: api/MovieActors
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MovieActor>> PostMovieActor([FromBody] MovieActorsAddRequest request)
        {
            foreach (Actor item in request.AddingActors)
            {
                if (!MovieActorExists(item.Id, request.MovieId))
                {
                    _context.MovieActor.Add(new MovieActor(item.Id, request.MovieId));
                }
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return StatusCode(201, request.AddingActors);
        }

        // DELETE: api/MovieActors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieActor>> DeleteMovieActor(int id, [FromBody] MovieActorsDeleteRequest request)
        {
            foreach (Actor actor in request.DeletingActors)
            {
                var movieActor = await _context.MovieActor.Where(el => el.ActorId == actor.Id && el.MovieId == id).FirstOrDefaultAsync();
                _context.MovieActor.Remove(movieActor);
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool MovieActorExists(int id)
        {
            return _context.MovieActor.Any(e => e.ActorId == id);
        }

        private bool MovieActorExists(int actorId, int movieId)
        {
            return _context.MovieActor.Any(e => e.ActorId == actorId && e.MovieId == movieId);
        }
    }
}
