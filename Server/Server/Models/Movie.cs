using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Server.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The movie name field is required")]
        [MinLength(2, ErrorMessage = "The movie name must be at least 2 characters")]
        [MaxLength(50, ErrorMessage = "The movie name may not exceed 50 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The release date field is required")]
        [Column(TypeName = "date")]
        public DateTime? ReleaseDate { get; set; }

        [ForeignKey("MovieId")]
        public List<MovieActor> MovieActor { get; set; }

        [ForeignKey("MovieId")]
        public List<MovieGenre> MovieGenre { get; set; }
    }
}
