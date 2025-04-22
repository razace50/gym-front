import React from "react";

const gymClasses = [
  {
    title: "Yoga",
    description:
      "Improve flexibility, balance, and mindfulness with our relaxing yoga sessions suitable for all levels.",
  },
  {
    title: "HIIT",
    description:
      "High-Intensity Interval Training to burn fat and build endurance in a short amount of time.",
  },
  {
    title: "Strength Training",
    description:
      "Build muscle and improve overall strength with guided weight training workouts.",
  },
  {
    title: "Zumba",
    description:
      "Get your cardio in with our fun, dance-based Zumba classes that keep you moving.",
  },
  {
    title: "Pilates",
    description:
      "Enhance your core strength, posture, and flexibility through controlled Pilates exercises.",
  },
];

const Classes = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Classes</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {gymClasses.map((gymClass, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{gymClass.title}</h2>
            <p className="text-gray-300">{gymClass.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
