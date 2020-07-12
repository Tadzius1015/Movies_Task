using Moq;
using Server.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Services;
using Xunit;
using Server.Models;
using Server.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Server.Tests
{
    public class GenreTests
    {
        [Fact]

        public void TestGetGenreWhenIdIsCorrect()
        {
            int id = 5;
            var mockRepo = new Mock<IGenreRepository>();
            mockRepo.Setup(repo => repo.GetGenre(id)).Returns((GenreDTO)null);

            var controller = new GenresController(mockRepo.Object);

            var result = controller.GetGenre(id);

            Assert.IsType<ActionResult<GenreDTO>>(result);
        }

        [Fact]

        public void TestGetGenreWhenIdIsNotCorrect()
        {
            int id = 5555;
            var mockRepo = new Mock<IGenreRepository>();
            mockRepo.Setup(repo => repo.GetGenre(id)).Returns((GenreDTO)null);

            var controller = new GenresController(mockRepo.Object);

            var result = controller.GetGenre(id);

            Assert.Null(result.Value);
        }

        [Fact]

        public void TestGetAllGenres()
        {
            int id = 5;
            var mockRepo = new Mock<IGenreRepository>();
            mockRepo.Setup(repo => repo.GetGenre(id)).Returns((GenreDTO)null);

            var controller = new GenresController(mockRepo.Object);

            var result = controller.GetGenre();

            Assert.NotNull(result.Result);
        }

        [Fact]
        public async void TestInsertGenreWhenObjectIsNull()
        {
            int id = 5;
            var mockRepo = new Mock<IGenreRepository>();
            mockRepo.Setup(repo => repo.GetGenre(id)).Returns((GenreDTO)null);

            var controller = new GenresController(mockRepo.Object);

            var result = await controller.PostGenre(genre: null);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.Result.ToString());
        }

        [Fact]
        public async void TestPutGenreWhenObjectIsNull()
        {
            int id = 5;
            var mockRepo = new Mock<IGenreRepository>();
            mockRepo.Setup(repo => repo.GetGenre(id)).Returns((GenreDTO)null);

            var controller = new GenresController(mockRepo.Object);

            var result = await controller.PutGenre(id, genre: null);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.ToString());
        }

        [Fact]
        public async void TestDeleteGenreWhenIdIsWrong()
        {
            int id = -5;
            var mockRepo = new Mock<IGenreRepository>();
            mockRepo.Setup(repo => repo.GetGenre(id)).Returns((GenreDTO)null);

            var controller = new GenresController(mockRepo.Object);

            var result = await controller.DeleteGenre(id);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.Result.ToString());
        }
    }
}
