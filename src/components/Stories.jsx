import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";
import { stories as storiesData } from "../data/mock";

export const Stories = ({ onStoryClick }) => {
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Reset progress when switching stories
  const switchToStory = useCallback((index) => {
    if (index >= 0 && index < storiesData.length) {
      setCurrentStory(index);
      setProgress(0);
    }
  }, []);

  // Go to next story
  const nextStory = useCallback(() => {
    if (currentStory < storiesData.length - 1) {
      switchToStory(currentStory + 1);
    } else {
      closeStories();
    }
  }, [currentStory, switchToStory]);

  // Go to previous story
  const prevStory = useCallback(() => {
    if (currentStory > 0) {
      switchToStory(currentStory - 1);
    }
  }, [currentStory, switchToStory]);

  // Open stories at specific index
  const openStories = useCallback((index = 0) => {
    setCurrentStory(index);
    setProgress(0);
    setIsOpen(true);
    setIsPaused(false);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close stories
  const closeStories = useCallback(() => {
    setIsOpen(false);
    setCurrentStory(0);
    setProgress(0);
    setIsPaused(false);
    document.body.style.overflow = 'unset';
  }, []);

  // Progress timer
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextStory();
          return 0;
        }
        return prev + 2; // 2% every 60ms = 3 seconds total
      });
    }, 60);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, nextStory]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextStory();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevStory();
          break;
        case 'Escape':
          e.preventDefault();
          closeStories();
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextStory, prevStory, closeStories]);

  const StoriesPreview = () => (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide md:flex md:max-w-none md:justify-center md:gap-6">
      {storiesData.map((story, index) => (
        <button
          key={story.id}
          onClick={() => openStories(index)}
          className="group relative flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f69700]/20 to-[#e8860a]/20 p-1 hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          <div className="relative w-32 aspect-[4/5] md:w-24 md:aspect-square rounded-xl overflow-hidden bg-white">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-white text-xs font-bold leading-tight drop-shadow-lg block">
                {story.title}
              </span>
            </div>
            <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                <Play size={12} className="text-white ml-0.5" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const StoriesViewer = () => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
          {storiesData.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{
                  width: index < currentStory ? '100%' : 
                         index === currentStory ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            onClick={closeStories}
            className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Story content */}
        <div className="w-full max-w-md h-full bg-black flex items-end relative mx-4">
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${storiesData[currentStory]?.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl" />
          
          <div className="relative z-10 w-full p-6 pb-8">
            <h2 className="text-white text-2xl font-bold mb-3 drop-shadow-lg">
              {storiesData[currentStory]?.title}
            </h2>
            <p className="text-white/90 text-base leading-relaxed mb-4 drop-shadow-md">
              {storiesData[currentStory]?.content}
            </p>
            
            {/* Special action for "Акции" story */}
            {storiesData[currentStory]?.title === "Акции" && (
              <button
                onClick={() => {
                  closeStories();
                  onStoryClick?.();
                }}
                className="px-6 py-3 bg-[#f69700] text-white rounded-xl hover:bg-[#e8860a] transition-colors font-semibold shadow-lg"
              >
                Смотреть акции
              </button>
            )}
          </div>

          {/* Navigation areas - IMPROVED */}
          {currentStory > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                prevStory();
              }}
              className="absolute left-0 top-12 bottom-12 w-1/3 flex items-center justify-start pl-4 text-transparent hover:text-white/80 transition-colors z-20"
              aria-label="Previous story"
            >
              <ChevronLeft size={32} className="drop-shadow-lg" />
            </button>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              nextStory();
            }}
            className="absolute right-0 top-12 bottom-12 w-1/3 flex items-center justify-end pr-4 text-transparent hover:text-white/80 transition-colors z-20"
            aria-label="Next story"
          >
            <ChevronRight size={32} className="drop-shadow-lg" />
          </button>

          {/* Simple tap areas for mobile - IMPROVED */}
          {currentStory > 0 && (
            <div
              className="absolute left-0 top-16 bottom-16 w-1/2 cursor-pointer z-15"
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                prevStory();
              }}
            />
          )}
          <div
            className="absolute right-0 top-16 bottom-16 w-1/2 cursor-pointer z-15"
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              nextStory();
            }}
          />
        </div>

        {/* Story indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {storiesData.map((_, index) => (
            <button
              key={index}
              onClick={() => switchToStory(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentStory 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <StoriesPreview />
      <StoriesViewer />
    </>
  );
};