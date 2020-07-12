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
    public class ActorTests
    {
        [Fact]

        public void TestGetActorWhenIdIsCorrect()
        {
            int id = 5;
            var mockRepo = new Mock<IActorRepository>();
            mockRepo.Setup(repo => repo.GetActor(id)).Returns((ActorDTO)null);

            var controller = new ActorsController(mockRepo.Object);

            var result = controller.GetActor(id);

            Assert.IsType<ActionResult<ActorDTO>>(result);
        }

        [Fact]

        public void TestGetActorWhenIdIsNotCorrect()
        {
            int id = 55555;
            var mockRepo = new Mock<IActorRepository>();
            mockRepo.Setup(repo => repo.GetActor(id)).Returns((ActorDTO)null);

            var controller = new ActorsController(mockRepo.Object);

            var result = controller.GetActor(id);

            Assert.Null(result.Value);
        }

        [Fact]

        public void TestGetAllActors()
        {
            int id = 5;
            var mockRepo = new Mock<IActorRepository>();
            mockRepo.Setup(repo => repo.GetActor(id)).Returns((ActorDTO)null);

            var controller = new ActorsController(mockRepo.Object);

            var result = controller.GetActor();

            Assert.NotNull(result.Result);
        }

        [Fact]
        public async void TestInsertActorWhenObjectIsNull()
        {
            int id = 5;
            var mockRepo = new Mock<IActorRepository>();
            mockRepo.Setup(repo => repo.GetActor(id)).Returns((ActorDTO)null);

            var controller = new ActorsController(mockRepo.Object);

            var result = await controller.PostActor(actor: null);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.Result.ToString());
        }

        [Fact]
        public async void TestPutActorWhenObjectIsNull()
        {
            int id = 5;
            var mockRepo = new Mock<IActorRepository>();
            mockRepo.Setup(repo => repo.GetActor(id)).Returns((ActorDTO)null);

            var controller = new ActorsController(mockRepo.Object);

            var result = await controller.PutActor(id, actor: null);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.ToString());
        }

        [Fact]
        public async void TestDeleteGenreWhenIdIsWrong()
        {
            int id = -5;
            var mockRepo = new Mock<IActorRepository>();
            mockRepo.Setup(repo => repo.GetActor(id)).Returns((ActorDTO)null);

            var controller = new ActorsController(mockRepo.Object);

            var result = await controller.DeleteActor(id);

            Assert.Contains(HttpStatusCode.BadRequest.ToString(), result.Result.ToString());
        }
    }
}
