using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;


        public BlogController(BlogContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        //Get blog theo search
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs(string searchString = "")
        {
            var query = _context.Blogs.AsQueryable();
            if (!String.IsNullOrEmpty(searchString))
            {
                query = query.Where(p => p.Title.Contains(searchString));
            }
            return await query.ToListAsync();
        }

        // GET by Id
        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);

            if (blog == null)
            {
                return NotFound();
            }

            return blog;
        }

        //Update blog
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromForm] Blog blog, [FromForm] IFormFile? imageUpload)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }

            if (id != blog.Id)
            {
                return BadRequest();
            }

            if (imageUpload != null)
            {
                blog.Image = SaveImage(imageUpload);
            }

            _context.Entry(blog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //Create Blog
        [HttpPost]
        public async Task<ActionResult<Blog>> CreateBlog([FromForm] Blog blog, [FromForm] IFormFile imageUpload)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }

            if (imageUpload != null)
            {
                blog.Image = SaveImage(imageUpload);
            }

            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlog", new { id = blog.Id }, blog);
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var post = await _context.Blogs.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = new List<Dictionary<string, string>>
            {
                new Dictionary<string, string> { { "Value", "Du lịch" }, { "Text", "Du lịch" } },
                new Dictionary<string, string> { { "Value", "Ẩm thực" }, { "Text", "Ẩm thực" } },
                new Dictionary<string, string> { { "Value", "Giải trí" }, { "Text", "Giải trí" } }
            };

            return Ok(categories);
        }

        [HttpGet("positions")]
        public IActionResult GetPositions()
        {
            var positions = new List<string> { "Việt Nam", "Trung Quốc", "Châu Á", "Châu Âu", "Châu Mỹ" };
            return Ok(positions);
        }

        //Check sự tồn tại của blog
        private bool BlogExists(int id)
        {
            return _context.Blogs.Any(b => b.Id == id);
        }

        private string SaveImage(IFormFile imageUpload)
        {
            string urlImage = "";

            var uploadDirecotroy = "uploads/";
            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, uploadDirecotroy);
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }
            var fileName = imageUpload.FileName;
            var filePath = Path.Combine(uploadPath, fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                imageUpload.CopyTo(fileStream);
            }

            urlImage = "/" + uploadDirecotroy + fileName;

            return urlImage;
        }
    }
}