import { ChefHat, Utensils, ClipboardList } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <div className="text-center animate-slide-up">
        <div className="mb-8">
          {/* Animated cooking icons */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce-gentle">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <div
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce-gentle"
              style={{ animationDelay: "0.2s" }}
            >
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce-gentle"
              style={{ animationDelay: "0.4s" }}
            >
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="font-sofia text-4xl md:text-5xl text-white mb-4">
            Cooking up your recipe...
          </h2>
          <p className="font-nunito text-lg text-white/90 mb-8">
            Our AI is carefully parsing your recipe URL and organizing all the
            delicious details!
          </p>
        </div>

        {/* Progress bar animation */}
        <div className="max-w-md mx-auto">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white/80 rounded-full loading-bar"></div>
          </div>
        </div>
      </div>

      <style>{`
        .loading-bar {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          animation: loading 2s infinite;
        }
        
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
