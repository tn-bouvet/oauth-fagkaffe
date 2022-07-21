using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Text;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/FavouriteColour")]
    public class FavouriteNumberController : ControllerBase
    {
        [HttpGet]
        public String Get()
        {
            var username = User.Identity?.Name ?? "";
            var value = Encoding.ASCII.GetBytes(username);
            var seed = 1;
            foreach (var v in value) {
                seed = (seed + v) % int.MaxValue;
            }
            var rng = new Random(seed);
            return $"rgb({rng.Next(0,255)},{rng.Next(0, 255)},{rng.Next(0, 255)})";
        }
    }
}