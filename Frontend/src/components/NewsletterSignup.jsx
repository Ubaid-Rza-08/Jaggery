export default function NewsletterSignup() {
  return (
    <section className="bg-yellow-100 px-6 py-12 text-center">
      <h2 className="text-2xl font-bold text-yellow-800 mb-4">
        Get 10% Off on First Order!
      </h2>
      <p className="mb-4 text-gray-700">Join our newsletter for exclusive offers.</p>
      <form className="flex flex-col md:flex-row justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md border w-full md:w-1/3"
        />
        <button className="bg-yellow-700 text-white px-6 py-2 rounded-md hover:bg-yellow-800">
          Subscribe
        </button>
      </form>
    </section>
  );
}
