using Server.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;
using Server.DTOS;
using AutoMapper;

namespace Server.Services
{
    public class ActorRepository : IActorRepository
    {
        private ServerContext _context;
        private IMapper Mapper;
        public ActorRepository(ServerContext context)
        {
            _context = context;
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Actor, ActorDTO>();
            });
            Mapper = config.CreateMapper();
        }
        public IEnumerable<ActorDTO> GetActor()
        {
            return _context.Actor.Select(actor => Mapper.Map<Actor, ActorDTO>(actor));
        }

        public ActorDTO GetActor(int id)
        {
            var actor = GetActor().FirstOrDefault(act => act.Id == id);

            return actor;
        }
        public async Task<ActorDTO> PutActor(int id, Actor actor)
        {
            if (actor == null)
            {
                return null;
            }

            _context.Entry(actor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();
            
            return GetActor(id);
        }

        public async Task<ActorDTO> PostActor(Actor actor)
        {
            if (actor == null)
            {
                return null;
            }

            _context.Actor.Add(actor);
            await _context.SaveChangesAsync();

            return GetActor((int) actor.Id);
        }

        public async Task<ActorDTO> DeleteActor(int id)
        {
            var actor = _context.Actor.Find(id);
            if (actor == null)
            {
                return null;
            }

            _context.Actor.Remove(actor);
            await _context.SaveChangesAsync();

            return Mapper.Map<Actor, ActorDTO>(actor);
        }

        public bool ActorExists(int id)
        {
            return _context.Actor.Any(e => e.Id == id);
        }
    }
}
