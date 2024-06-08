namespace IdentityAPI.Models
{
    public class University
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Faculty> Faculties { get; set; }
    }
    public class Faculty
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public int UniversityId { get; set; }
        public University University { get; set; }
        public ICollection<Building> Buildings { get; set; }
    }
    public class Building
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }
        public ICollection<Room> Rooms { get; set; }
    }
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BuildingId { get; set; }
        public Building Building { get; set; }
    }
}
