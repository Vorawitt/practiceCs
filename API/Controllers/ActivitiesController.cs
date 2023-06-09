using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities() //ActionResult is a generic type
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //localhost:5000/activities/2

        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result =  await Mediator.Send(new Details.Query { Id = id });

            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) //IActionResult is a generic type
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")] //localhost:5000/activities/2
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")] //localhost:5000/activities/2
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}