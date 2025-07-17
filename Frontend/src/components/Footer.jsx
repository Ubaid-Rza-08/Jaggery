export default function Footer() {
  return (
    <footer className="bg-yellow-800 text-white px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg">JaggeryFarm</h3>
          <p className="text-sm mt-2">Pure jaggery from Indian villages</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <ul className="space-y-1 text-sm">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-6 text-sm">© 2025 JaggeryFarm. All rights reserved.</p>
    </footer>
  );
}
