import React from 'react'
import Header from '../../components/header/Header'
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Header />
     <main className="p-6 bg-gradient-to-b from-gray-50 to-gray-100">
  {/* Hero Section */}
  <section id="home">
  <section className="text-center py-16 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-lg shadow-xl">
    <h1 className="text-5xl font-extrabold mb-4">Welcome to AI Resume Builder</h1>
    <p className="text-lg mb-6">
      Create stunning, professional resumes with the power of AI.
    </p>
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      <img
        src="../../../public/images/HERO.jpeg"
        alt="AI Resume Builder Hero 1"
        className="w-4/5 md:w-2/5 lg:w-1/5 rounded-xl shadow-lg hover:scale-105 transition-transform"
      />
      <img
        src="../../../public/images/HERO2.jpg"
        alt="AI Resume Builder Hero 2"
        className="w-4/5 md:w-2/5 lg:w-1/5 rounded-xl shadow-lg hover:scale-105 transition-transform"
      />
      <img
        src="../../../public/images/HERO3.jpg"
        alt="AI Resume Builder Hero 3"
        className="w-4/5 md:w-2/5 lg:w-1/5 rounded-xl shadow-lg hover:scale-105 transition-transform"
      />
    </div>

    {/* Button added here */}
   <div className="mt-10">
  <Link to="/dashboard">
    <button
      className="
        px-10 py-6
        bg-gradient-to-r from-indigo-600 to-purple-600
        text-white text-lg font-semibold
        rounded-lg
        shadow-lg
        cursor-pointer
        transform transition-transform duration-300
        hover:scale-110
        focus:outline-none focus:ring-4 focus:ring-indigo-400
      "
    >
      Build Your Resume
    </button>
  </Link>
</div>

  </section>
</section>



  {/* Features Section */}
  <section className="py-16 mt-5">
    <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Why Choose Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
        <img 
          src="../../../public/images/featured/6.jpg" 
          alt="Feature One" 
          className="mx-auto w-20 h-20 mb-4 rounded-full"
        />
        <h3 className="text-2xl font-semibold mb-2">AI-Powered</h3>
        <p className="text-gray-600">
          Generate resumes tailored to your needs with cutting-edge AI technology.
        </p>
      </div>
      <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
        <img 
          src="../../../public/images/featured/easy-to-use.png" 
          alt="Feature Two" 
          className="mx-auto w-20 h-20 mb-4 rounded-full"
        />
        <h3 className="text-2xl font-semibold mb-2">Easy to Use</h3>
        <p className="text-gray-600">
          Our intuitive design ensures a seamless experience for everyone.
        </p>
      </div>
      <div className="text-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition">
        <img 
          src="../../../public/images/featured/3.jpg" 
          alt="Feature Three" 
          className="mx-auto w-20 h-20 mb-4 rounded-full"
        />
        <h3 className="text-2xl font-semibold mb-2">Customizable</h3>
        <p className="text-gray-600">
          Personalize your resume with templates and layouts of your choice.
        </p>
      </div>
    </div>
  </section>
  {/* Call-to-Action Section */}
<section className="text-center py-8 bg-gradient-to-r from-indigo-100 to-gray-100 rounded-lg shadow-lg">
  <div className="max-w-3xl mx-auto">
    {/* Optional Image Section */}
    <div className="flex justify-center mb-4">
      <img 
        src="../../../public/images/featured/6.jpg" 
        alt="Resume Builder" 
        className="rounded-lg shadow-lg w-[120px] h-[120px] object-cover"
      />
    </div>
    <h2 className="text-2xl font-extrabold mb-3 text-gray-800 tracking-tight">
      Get Started Today
    </h2>
    <p className="text-sm text-gray-600 mb-4">
      Take the first step towards your dream job with a standout resume.
    </p>
    <div>
  <Link to="/dashboard">
    <Button className="
      px-10 py-6 
      bg-gradient-to-r from-indigo-600 to-purple-600 
      text-white rounded-full text-lg font-semibold 
      shadow-lg 
      cursor-pointer
      transform transition-transform duration-300
      scale-105
    ">
      Build Your Resume
    </Button>
  </Link>
</div>


  </div>
</section>




</main>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p className="mb-2">&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
        <p className="font-bold text-white">Project Lead: Sajib</p>
      </footer>
    </>
  );
}



export default Home