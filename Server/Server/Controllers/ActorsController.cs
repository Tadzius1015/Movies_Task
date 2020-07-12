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
    public class ActorsController : ControllerBase
    {
        private IActorRepository _actorRepository;

        public ActorsController(IActorRepository actorsRespository)
        {
            _actorRepository = actorsRespository;
        }

        // GET: api/Actors
        [HttpGet]
        public ActionResult<IEnumerable<ActorDTO>> GetActor()
        {
            return Ok(_actorRepository.GetActor());
        }

        // GET: api/Actors/5
        [HttpGet("{id}")]
        public ActionResult<ActorDTO> GetActor(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }

            var actor = _actorRepository.GetActor(id);

            if (actor == null)
            {
                return NotFound();
            }

            return Ok(actor);
        }

        // PUT: api/Actors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActor(int id, Actor actor)
        {
            if (actor == null || id != actor.Id)
            {
                return BadRequest();
            }
            if (!_actorRepository.ActorExists(id))
            {
                return NotFound();
            }

            return Ok(await _actorRepository.PutActor(id, actor));
        }

        // POST: api/Actors
        [HttpPost]
        public async Task<ActionResult<ActorDTO>> PostActor(Actor actor)
        {
            if (actor == null)
            {
                return BadRequest();
            }

            return CreatedAtAction("GetActor", new { id = actor.Id }, await _actorRepository.PostActor(actor));
        }

        // DELETE: api/Actors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActorDTO>> DeleteActor(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            await _actorRepository.DeleteActor(id);

            return NoContent();
        }
    }
}
