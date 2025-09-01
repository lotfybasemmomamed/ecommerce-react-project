function Footer() {
  return (
    <footer className="bg-blue-900 text-blue-100 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-white">BlueCircuit</h2>
          <p className="mt-4 text-sm text-blue-200">
            Your trusted store for the latest electronics and gadgets at the
            best prices.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-300">Home</a></li>
            <li><a href="#" className="hover:text-blue-300">Shop</a></li>
            <li><a href="#" className="hover:text-blue-300">Categories</a></li>
            <li><a href="#" className="hover:text-blue-300">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-300">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-300">Returns</a></li>
            <li><a href="#" className="hover:text-blue-300">Shipping Info</a></li>
            <li><a href="#" className="hover:text-blue-300">Track Order</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-sm text-blue-200">
            Subscribe to get special offers, free giveaways, and new launches.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg bg-blue-800 border border-blue-700 focus:outline-none text-sm"
            />
            <button className="bg-blue-400 text-blue-900 font-semibold px-4 py-2 rounded-r-lg hover:bg-blue-500 text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-blue-700 mt-10 pt-6 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} BlueCircuit, All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
