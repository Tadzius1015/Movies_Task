using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class MovieActorsAddRequest
    {
        public List<Actor> AddingActors { get; set; }

        public int MovieId { get; set; }
    }
}
