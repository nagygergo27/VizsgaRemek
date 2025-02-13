using System.Runtime.CompilerServices;

namespace BakelitAPI.Models
{
    public class Bakelit
    {
        public int Id { get; set; }
        public string name {  get; set; }
        public string artist { get; set; }
        public int price { get; set; }
        public string genre { get; set; }
        public DateTime release_date { get; set; }
    }
}
