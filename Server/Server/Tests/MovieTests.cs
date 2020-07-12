using Microsoft.AspNetCore.Mvc;
using Moq;
using Server.Controllers;
using Server.DTOS;
using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace Server.Tests
{
    public class MovieTests
    {
        [Fact]

        public void TestGetMovieWhenIdIsCorrect()
        {
            int id = 5;
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.GetMovie(id);

            Assert.IsType<ActionResult<MovieDTO>>(result);
        }

        [Fact]

        public void TestGetGenreWhenIdIsNotCorrect()
        {
            int id = 5555;
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.GetMovie(id);

            Assert.Null(result.Value);
        }

        [Fact]

        public void TestGetAllMovies()
        {
            int id = 5;
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.GetMovie();

            Assert.NotNull(result.Result);
        }

        [Fact]
        public async void TestInsertMovieWhenObjectIsNull()
        {
            int id = 5;
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = await controller.PostMovie(movie: null);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.Result.ToString());
        }

        [Fact]
        public async void TestPutMovieWhenObjectIsNull()
        {
            int id = 5;
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = await controller.PutMovie(id, movie: null);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.ToString());
        }

        [Fact]
        public async void TestDeleteMovieWhenIdIsWrong()
        {
            int id = -5;
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = await controller.DeleteMovie(id);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.Result.ToString());
        }

        [Fact]
        public void TestMovieSearchByNameTypeAndPatternIsCorrect()
        {
            int id = 5;
            string pattern = "19";
            string type = "name";
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.Search(pattern, type);

            Assert.NotNull(result.Result);
        }

        [Fact]
        public void TestMovieSearchByNameTypeAndPatternIsNotCorrect()
        {
            int id = 5;
            string pattern = "19adasdasd";
            string type = "name";
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.Search(pattern, type);

            Assert.Null(result.Value);
        }

        [Fact]
        public void TestMovieSearchByGenreTypeAndPatternIsCorrect()
        {
            int id = 5;
            string pattern = "War";
            string type = "genre";
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.Search(pattern, type);

            Assert.NotNull(result.Result);
        }

        [Fact]
        public void TestMovieSearchByGenreTypeAndPatternIsNotCorrect()
        {
            int id = 5;
            string pattern = "12345678";
            string type = "genre";
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.Search(pattern, type);

            Assert.Null(result.Value);
        }

        [Fact]
        public void TestMovieSearchByReleaseDateTypeAndPatternIsCorrect()
        {
            int id = 5;
            string pattern = "2020";
            string type = "releaseDate";
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.Search(pattern, type);

            Assert.NotNull(result.Result);
        }

        [Fact]
        public void TestMovieSearchByReleaseDateTypeAndPatternIsNotCorrect()
        {
            int id = 5;
            string pattern = "12345678";
            string type = "releaseDate";
            var mockRepo = new Mock<IMovieRepository>();
            mockRepo.Setup(repo => repo.GetMovie(id)).Returns((MovieDTO)null);

            var controller = new MoviesController(mockRepo.Object);

            var result = controller.Search(pattern, type);

            Assert.Null(result.Value);
        }
    }
}
