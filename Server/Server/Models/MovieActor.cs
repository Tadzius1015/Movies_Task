using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class MovieActor
    {
        [ForeignKey("ActorId")]
        public int ActorId { get; set; }
        public Actor Actor { get; set; }

        [ForeignKey("MovieId")]
        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        public MovieActor() { }

        public MovieActor(int actorId, int movieId)
        {
            this.ActorId = actorId;
            this.MovieId = movieId;
        }

    }
}
