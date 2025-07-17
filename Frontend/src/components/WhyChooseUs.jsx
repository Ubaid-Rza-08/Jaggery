export default function WhyChooseUs() {
  const points = [
    { title: "100% Natural", desc: "No preservatives, just pure jaggery" },
    { title: "Farm Direct", desc: "Sourced directly from farmers" },
    { title: "Eco Friendly", desc: "Plastic-free, biodegradable packaging" },
    { title: "Certified Quality", desc: "Lab-tested for purity & safety" },
  ];
  return (
    <section className="px-6 py-12 bg-white">
      <h2 className="text-2xl font-bold text-center text-yellow-800 mb-8">
        Why Choose JaggeryFarm?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {points.map((p, i) => (
          <div key={i} className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-yellow-700 mb-2">{p.title}</h3>
            <p className="text-gray-600">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
