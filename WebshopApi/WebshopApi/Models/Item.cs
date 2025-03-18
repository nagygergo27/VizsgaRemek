namespace WebshopApi.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Piece { get; set; }
        public int Price { get; set; }
    }
}
