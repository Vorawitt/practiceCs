using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, 
            IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message); // log the error
                context.Response.ContentType = "application/json"; // set the response type 
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // set the status code

                var response = _env.IsDevelopment()
                    ? new AppExecption(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) // if in development, return the exception message and stack trace
                    : new AppExecption(context.Response.StatusCode, "Server Error"); // if in production, return a generic message
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase}; // set the naming policy
           
                var json = JsonSerializer.Serialize(response, options); // serialize the response
                
                await context.Response.WriteAsync(json); // write the response
            }
        } 
    }
}