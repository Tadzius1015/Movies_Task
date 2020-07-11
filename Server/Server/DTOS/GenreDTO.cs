using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Server.DTOS
{
    public class GenreDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<MovieGenreDTO> MovieGenre { get; set; }
    }
}