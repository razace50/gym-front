import React from "react";

const services = [
  {
    title: "Personal Training",
    description:
      "One-on-one training sessions tailored to your specific fitness goals with certified trainers.",
  },
  {
    title: "Group Classes",
    description:
      "Join fun and energetic group workouts like Zumba, HIIT, and Bootcamps for all fitness levels.",
  },
  {
    title: "Nutrition Guidance",
    description:
      "Get customized meal plans and dietary advice from certified nutritionists.",
  },
  {
    title: "Fitness Assessment",
    description:
      "Comprehensive fitness evaluation to track your progress and plan your training program.",
  },
  {
    title: "Online Coaching",
    description:
      "Stay on track with remote workout plans and virtual support from your trainer.",
  },
  {
    title: "Recovery & Massage",
    description:
      "Speed up recovery and relieve muscle tension with sports massages and therapy sessions.",
  },
];

const Services = () => {
  return (
    <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
