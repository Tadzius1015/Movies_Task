using Server.DTOS;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IMovieActorRepository
    {
        Task<MovieActorDTO> PostMovieActor(MovieActorsAddRequest request);

        Task<MovieActorDTO> DeleteMovieActor(int id, MovieActorsDeleteRequest request);
    }
}
