using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.DTOS;
using Server.Models;

namespace Server.Helpers
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<List<MovieActor>, List<MovieActorDTO>>();
            CreateMap<List<MovieActorDTO>, List<MovieActor>>();

            CreateMap<List<MovieGenre>, List<MovieGenreDTO>>();
            CreateMap<List<MovieGenreDTO>, List<MovieGenre>>();

            CreateMap<Movie, MovieDTO>();
            CreateMap<MovieDTO, Movie>();

            CreateMap<Actor, ActorDTO>();
            CreateMap<ActorDTO, Actor>();

            CreateMap<Genre, GenreDTO>();
            CreateMap<GenreDTO, Genre>();
        }
    }
}
