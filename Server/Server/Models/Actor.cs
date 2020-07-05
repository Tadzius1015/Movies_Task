using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Actor")]
    public class Actor
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The first name field is required")]
        [MinLength(3, ErrorMessage = "The name must be at least 3 characters")]
        [MaxLength(40, ErrorMessage = "The title may not exceed 40 characters")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "The name must contain letters only")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The first name field is required")]
        [MinLength(3, ErrorMessage = "The last name must be at least 3 characters")]
        [MaxLength(40, ErrorMessage = "The last name may not exceed 40 characters")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "The last name must contain letters only")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "The birth date field is required")]
        [Column(TypeName = "date")]
        public DateTime? BirthDate { get; set; }
    }
}
