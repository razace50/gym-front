
const trainers = [
  {
    name: "Alex Johnson",
    specialty: "Strength & Conditioning",
    description:
      "Expert in muscle building and weight training with 10+ years of experience.",
  },
  {
    name: "Samantha Lee",
    specialty: "Yoga & Flexibility",
    description:
      "Certified yoga instructor focusing on holistic wellness and mindfulness.",
  },
  {
    name: "Mike Chen",
    specialty: "HIIT & Cardio",
    description:
      "High-energy trainer who helps clients push limits and burn calories fast.",
  },
];

const Trainers = () => {
  return (
    <div className="bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Meet Our Trainers
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{trainer.name}</h2>
            <p className="text-indigo-400 font-medium">{trainer.specialty}</p>
            <p className="text-gray-300 mt-2">{trainer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
