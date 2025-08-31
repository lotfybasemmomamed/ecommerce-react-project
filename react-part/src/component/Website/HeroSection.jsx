function HeroSection() {
  return (
    <div className="h-[100vh] flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 bg-gradient-to-r from-blue-50 to-blue-100">
      
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left mt-8 lg:mt-0">
        <p className="text-blue-600 font-semibold uppercase tracking-wide">
          Flat 30% Off
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Explore <span className="text-blue-700">MacBook Pro</span> & Experience the Future
        </h1>
        <button className="mt-6 px-8 py-3 bg-blue-50 border border-blue-700 text-blue-700 font-medium rounded-2xl shadow-lg hover:bg-blue-700 hover:text-white transition">
          Shop Now
        </button>
      </div>

      <div className=" w-full lg:w-1/2 flex justify-center">

        <img
          src="/assets/macbook_pro.png"  
          alt="Macbook Pro"
          className="relative z-10 w-[300px] md:w-[450px] lg:w-[550px] object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

export default HeroSection;
