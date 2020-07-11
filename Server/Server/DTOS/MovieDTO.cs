using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Server.DTOS
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public List<MovieActorDTO> MovieActor { get; set; }
        public List<MovieGenreDTO> MovieGenre { get; set; }

        public MovieDTO() { }
        public MovieDTO(int id, string name, DateTime? releaseDate, List<MovieActorDTO> movieActors, List<MovieGenreDTO> movieGenres)
        {
            this.Id = id;
            this.Name = name;
            this.ReleaseDate = releaseDate;
            this.MovieActor = movieActors;
            this.MovieGenre = movieGenres;
        }
    }
}
