using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.DTOS
{
    public class MovieGenreDTO
    {
        public int GenreId { get; set; }
        public GenreDTO Genre { get; set; }
        public int MovieId { get; set; }
        public MovieDTO Movie { get; set; }


        public MovieGenreDTO() { }

        public MovieGenreDTO(int genreId, int movieId, GenreDTO genre, MovieDTO movie)
        {
            this.GenreId = genreId;
            this.MovieId = movieId;
            this.Movie = movie;
            this.Genre = genre;
        }
    }
}
