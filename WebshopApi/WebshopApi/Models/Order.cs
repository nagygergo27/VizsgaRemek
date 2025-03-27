namespace WebshopApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UId { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Item>? Items { get; set; } = new List<Item>();
    }
}
