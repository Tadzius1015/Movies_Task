using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class MovieGenresAddRequest
    {
        public List<Genre> AddingGenres { get; set; }

        public int MovieId { get; set; }
    }
}
