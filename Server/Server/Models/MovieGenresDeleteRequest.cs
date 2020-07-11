using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class MovieGenresDeleteRequest
    {
        public List<Genre> DeletingGenres { get; set; }
    }
}
