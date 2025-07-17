
export default function FilterSidebar({ categories, selectedCategory, setSelectedCategory ,categoryId}) {
 console.log(selectedCategory);
  return (
    <div className="mb-6 md:mb-0">
      <h3 className="text-lg font-bold mb-4">Filter by Category</h3>
      <ul className="space-y-2">
        <li
          onClick={() => setSelectedCategory(0)}
          className={`cursor-pointer ${selectedCategory ===0? "font-bold text-yellow-700" : ""}`}
        >
          All
        </li>
        {categories.map((cat) => (
          <li
          key={cat.id}
           
            onClick={() => setSelectedCategory(cat.id)}
            className={`cursor-pointer ${selectedCategory === cat.id ? "font-bold text-yellow-700" : ""}`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
