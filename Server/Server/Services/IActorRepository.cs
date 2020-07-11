using Server.DTOS;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IActorRepository
    {
        IEnumerable<ActorDTO> GetActor();

        ActorDTO GetActor(int id);

        Task<ActorDTO> PutActor(int id, Actor actor);

        Task<ActorDTO> PostActor(Actor actor);

        Task<ActorDTO> DeleteActor(int id);

        bool ActorExists(int id);
    }
}
