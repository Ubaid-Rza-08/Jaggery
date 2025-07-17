export default function Testimonials() {
  const reviews = [
    {
      name: "Amit Sharma",
      feedback: "Loved the taste! Feels like childhood again.",
    },
    {
      name: "Priya Das",
      feedback: "Superb quality jaggery and beautiful packaging!",
    },
  ];
  return (
    <section className="bg-yellow-50 px-6 py-12">
      <h2 className="text-2xl font-bold text-yellow-800 text-center mb-6">
        What Our Customers Say
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
            <p className="text-gray-600 italic">“{r.feedback}”</p>
            <p className="mt-2 text-right font-semibold">- {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
