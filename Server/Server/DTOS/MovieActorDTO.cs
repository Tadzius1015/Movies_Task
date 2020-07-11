using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.DTOS
{
    public class MovieActorDTO
    {
        public int ActorId { get; set; }
        public ActorDTO Actor { get; set; }
        public int MovieId { get; set; }
        public MovieDTO Movie { get; set; }

        public MovieActorDTO() { }

        public MovieActorDTO(int actorId, int movieId, ActorDTO actor, MovieDTO movie)
        {
            this.ActorId = actorId;
            this.MovieId = movieId;
            this.Actor = actor;
            this.Movie = movie;
        }

    }
}
