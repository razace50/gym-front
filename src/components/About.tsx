import React from "react";

const About = () => {
  return (
    <section className=" bg-slate-900 text-white min-h-screen pt-20 px-4">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Gym</h1>
        <p className="text-lg text-gray-600 mb-6">
          At <span className="font-semibold">Hamro Gym</span>, we believe in
          more than just fitness — we believe in building a lifestyle. Our
          mission is to help you become the strongest, healthiest version of
          yourself through expert training, motivation, and community support.
        </p>
        <img
          src="/assets/gym-hero.jpg"
          alt="Gym Hero"
          className="rounded-2xl shadow-lg mx-auto max-w-3xl"
        />
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Hamro Gym?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-slate-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">
              State-of-the-Art Equipment
            </h3>
            <p className="text-gray-600">
              Our facility is equipped with the latest machines and tools to
              elevate your training experience.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Certified Trainers</h3>
            <p className="text-gray-600">
              Train with nationally certified coaches who are passionate about
              helping you hit your goals.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Inclusive Community</h3>
            <p className="text-gray-600">
              Whether you're a beginner or a pro, you’ll find support and
              encouragement at every step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
