using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The genre name field is required")]
        [MinLength(3, ErrorMessage = "The genre name must be at least 3 characters")]
        [MaxLength(20, ErrorMessage = "The genre name may not exceed 20 characters")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "The genre name must contain letters only")]
        public string Name { get; set; }
    }
}