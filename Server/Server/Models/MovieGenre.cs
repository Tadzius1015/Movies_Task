using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class MovieGenre
    {
        [ForeignKey("GenreId")]
        public int GenreId { get; set; }
        public Genre Genre { get; set; }

        [ForeignKey("MovieId")]
        public int MovieId { get; set; }
        public Movie Movie { get; set; }


        public MovieGenre() { }

        public MovieGenre(int genreId, int movieId)
        {
            this.GenreId = genreId;
            this.MovieId = movieId;
        }
    }
}
