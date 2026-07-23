import React, { useEffect, useState } from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { Fade } from 'react-awesome-reveal';

const slides = [
  { id: 1, image: '/slide-11.jpg'},
  { id: 2, image: '/slide-12.jpg'},
  { id: 3, image: '/slide-13.jpg'},
];

// Dummy data for Featured Groups
const featuredGroups = [
  { id: 1, name: 'Photography Enthusiasts', description: 'Capture moments, share tips.', imageUrl: 'https://i.ibb.co/ps6Kb3Q/photography.jpg' },
  { id: 2, name: 'Book Club Readers', description: 'Dive into new worlds, one book at a time.', imageUrl: 'https://i.ibb.co/27hyjWNB/book-club.jpg' },
  { id: 3, name: 'Coding Wizards', description: 'Learn to code, build cool stuff.', imageUrl: 'https://i.ibb.co/svGRGmPv/coding.jpg' },
  { id: 4, name: 'Fitness Fanatics', description: 'Stay active, stay healthy.', imageUrl: 'https://i.ibb.co/B5BQQwzG/fitness.jpg' },
  { id: 5, name: 'Gardening Gurus', description: 'Green thumbs unite!', imageUrl: 'https://i.ibb.co/HLBXwqKh/gardening.jpg' },
  { id: 6, name: 'Cooking Crew', description: 'Whip up delicious dishes.', imageUrl: 'https://i.ibb.co/vv1ZmR7b/cooking.jpg' },
];

const Home = () => {
  // --- START: Typewriter Hook ---
    const [text] = useTypewriter({
        words: ['Connect with Hobbies', 'Build Communities', 'Explore New Passions'],
        loop: {}, // Loop infinitely
        typeSpeed: 70,
        deleteSpeed: 50,
        delaySpeed: 1000,
    });
    // --- END: Typewriter Hook ---
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    // This main div acts as the overall container for the Home page content
    <div className="w-full">
      {/* Banner/Slider Section */}
      <div className="relative w-full aspect-[16/7] overflow-hidden shadow-lg">
        {/* Static Content Overlaying Carousel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center text-white p-4  bg-opacity-40 max-w-md w-11/12 md:max-w-xl">
          <h1 className="text-4xl font-bold text-center my-8">
                <Fade triggerOnce>
                    Welcome to HobbyHub!
                </Fade>
            </h1>
          
           <div className="text-3xl md:text-5xl font-extrabold text-center text-violet-600 mb-8 h-20 md:h-24 flex items-center justify-center">
                <span className="inline-block">{text}</span>
                <Cursor cursorStyle='|' /> {/* <--- The blinking cursor */}
            </div>

          <button className="px-6 py-3 bg-violet-600 text-white rounded-md text-lg hover:bg-violet-700 transition shadow-lg">
            Explore Groups
          </button>
        </div>

        {/* Carousel Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out
              ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Dark overlay for readability of slide title */}
            <div className="w-full h-full bg-black/40 flex items-center justify-center text-white">
              <p className="text-2xl sm:text-4xl font-bold drop-shadow-md">{slide.title || ''}</p>
            </div>
          </div>
        ))}

        {/* Slide Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ease-in-out
                ${i === currentSlide ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* --- Featured Groups Section --- */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Featured Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer">
              <img src={group.imageUrl} alt={group.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm">{group.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition shadow-md">
            View All Groups
          </button>
        </div>
      </div>

      {/* --- Static Section 1 --- */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Join Hobby Hub?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Connect with like-minded individuals, explore new interests, and deepen your existing passions. Hobby Hub is your go-to platform for building communities around shared interests. From beginner workshops to advanced projects, find your tribe and start creating, learning, and sharing today!
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <button className="px-6 py-3 border-2 border-violet-600 text-violet-600 rounded-md text-lg hover:bg-violet-600 hover:text-white transition shadow-md">
              Learn More
            </button>
            <button className="px-6 py-3 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition shadow-md">
              Find Your Hobby
            </button>
          </div>
        </div>
      </div>

      {/* --- Static Section 2 --- */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover Your Next Adventure</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Whether you're into extreme sports, quiet crafts, or anything in between, Hobby Hub offers a diverse range of groups. Our intuitive search and recommendation engine helps you discover new passions you never knew you had.
            </p>
            <button className="px-8 py-3 bg-red-500 text-white rounded-md text-lg hover:bg-red-600 transition shadow-md">
              Start Exploring Now
            </button>
          </div>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            {/* Placeholder for an image or illustration */}
            <img 
              src="https://i.ibb.co/0yPcrS3d/hobbies.png" 
              alt="Hobby Exploration" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;