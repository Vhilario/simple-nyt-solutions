"use client";

import { useState, useRef, useEffect } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import WordleSection from "@/components/sections/WordleSection";
import ConnectionsSection from "@/components/sections/ConnectionsSection";
import StrandsSection from "@/components/sections/StrandsSection";
import LetterBoxedSection from "@/components/sections/LetterBoxedSection";
import SpellingBeeSection from "@/components/sections/SpellingBeeSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSwipeable } from "react-swipeable"

type TabbedLayoutProps = {
  wordleData: any;
  connectionsData: any;
  strandsData: any;
  spellingBeeData: any;
  letterBoxedData: any;
};

type GameTab = {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  component: React.ReactNode;
};

export default function TabbedLayout({
  wordleData,
  connectionsData,
  strandsData,
  spellingBeeData,
  letterBoxedData,
}: TabbedLayoutProps) {
  const [activeTab, setActiveTab] = useState("about");
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateTabs('next'),
    onSwipedRight: () => navigateTabs('prev'),
  })

  // Scroll to active tab when it changes
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTabElement = tabsContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
      if (activeTabElement) {
        const container = tabsContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();
        
        // Calculate if tab is off-screen
        const isOffScreen = tabRect.left < containerRect.left || tabRect.right > containerRect.right;
        
        if (isOffScreen) {
          activeTabElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const navigateTabs = (direction: 'prev' | 'next') => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    }
    
    setActiveTab(tabs[newIndex].id);
  };

  const tabs: GameTab[] = [
    {
      id: "about",
      name: "About",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      component: <AboutSection />,
    },
    {
      id: "wordle",
      name: "Wordle",
      bgColor: "bg-[#e3e3e1]",
      textColor: "text-gray-800",
      component: <WordleSection wordleData={wordleData} />,
    },
    {
      id: "connections",
      name: "Connections",
      bgColor: "bg-[#b4a8fe]",
      textColor: "text-gray-800",
      component: <ConnectionsSection connectionsData={connectionsData} />,
    },
    {
      id: "letterboxed",
      name: "Letter Boxed",
      bgColor: "bg-[#fc716c]",
      textColor: "text-white",
      component: <LetterBoxedSection letterBoxedData={letterBoxedData} />,
    },
    {
      id: "spellingbee",
      name: "Spelling Bee",
      bgColor: "bg-[#f8da22]",
      textColor: "text-gray-800",
      component: <SpellingBeeSection spellingBeeData={spellingBeeData} />,
    },
    {
      id: "strands",
      name: "Strands",
      bgColor: "bg-[#c0ddd9]",
      textColor: "text-gray-800",
      component: <StrandsSection strandsData={strandsData} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" {...handlers}>
      {/* Tab Navigation - Hidden on Mobile */}
      <div className={`sticky top-0 z-50 hidden md:block ${
        tabs.find(tab => tab.id === activeTab)?.bgColor || 'bg-gray-100'
      }`} {...handlers}>
        <div className="flex justify-center">
          <div ref={tabsContainerRef} className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-shrink-0 px-6 py-6 sm:px-8 sm:py-6 text-base sm:text-lg transition-colors duration-300 min-w-[100px] sm:min-w-[140px] font-extrabold relative ${
                  activeTab === tab.id
                    ? `${tab.bgColor} text-black border-b-3 border-black`
                    : `${tab.bgColor} text-black opacity-60 hover:opacity-90 active:opacity-100`
                }`}
              >
                <span className="relative z-10">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[calc(100vh-80px)] absolute top-0 left-0 w-full">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>

      {/* Bottom Navigation Arrows - Mobile Only */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-4 py-2">
          <button
            onClick={() => navigateTabs('prev')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Previous tab"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <span className="text-sm font-medium text-gray-700 px-2">
            {tabs.find(tab => tab.id === activeTab)?.name}
          </span>
          
          <button
            onClick={() => navigateTabs('next')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Next tab"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
} 