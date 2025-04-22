import React from "react";

const plans = [
  {
    name: "Basic Plan",
    price: "$29/mo",
    features: [
      "Access to gym equipment",
      "Locker room access",
      "1 group class per week",
    ],
  },
  {
    name: "Standard Plan",
    price: "$49/mo",
    features: [
      "All Basic Plan features",
      "Unlimited group classes",
      "Fitness assessment",
      "1 personal training session/month",
    ],
  },
  {
    name: "Premium Plan",
    price: "$79/mo",
    features: [
      "All Standard Plan features",
      "Weekly personal training sessions",
      "Nutrition consultation",
      "Priority support and scheduling",
    ],
  },
];

const Membership = () => {
  return (
    <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-10">Membership Plans</h1>
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 px-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-indigo-400 text-xl font-bold mb-4">
              {plan.price}
            </p>
            <ul className="text-gray-300 space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
            <button className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 rounded-xl font-semibold">
              Join Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
