using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")] 
    public class BaseApiController : ControllerBase //base MVC Controller
    {
        
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result) //ActionResult is a generic type
        {
            if(result == null) return NotFound(); //404 Not Found
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);   //200 OK
            if (result.IsSuccess && result.Value == null)
                return NotFound();         //404 Not Found
            return BadRequest(result.Error); //400 Bad Request
        }
    }
}