import type React from "react";

type HeroSectionProps = {};

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />

      {/* Hero content container */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[90vh]">
          {/* Text content */}
          <div className="py-12 lg:py-24 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Transform Your Body,{" "}
              <span className="text-gray-500">Transform Your Life</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-xl">
              Join our premium fitness club and get access to state-of-the-art
              equipment, expert trainers, and a supportive community to help you
              reach your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-bold text-lg">
                Join Now
              </button>
              <button className="px-6 py-3 bg-transparent border border-gray-300 text-white rounded-md font-bold text-lg">
                Book a Tour
              </button>
            </div>
            <div className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={`https://randomuser.me/api/portraits/men/${
                          i + 10
                        }.jpg`}
                        alt={`Member ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-white">500+</span> members
                  already joined
                </p>
              </div>
            </div>
          </div>

          {/* Image section - right side */}
          {/* <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=800&q=80"
              alt="Fitness training"
              className="rounded-lg object-cover w-[600px] h-[800px]"
            />
          </div> */}
        </div>
      </div>

      {/* Background image - visible on all screen sizes */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Gym background"
          className="w-full h-full object-cover object-center brightness-75"
        />
      </div>
    </div>
  );
};

export default HeroSection;
