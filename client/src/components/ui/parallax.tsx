import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  children: React.ReactNode;
}

export function Parallax({ 
  children, 
  speed = 0.5, 
  className,
  ...props 
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementPosition, setElementPosition] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      const rect = element.getBoundingClientRect();
      setElementPosition(rect.top + window.scrollY);
    };
    
    // Initialize
    handleResize();
    
    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Calculate the translateY value for the parallax effect
  const translateY = (() => {
    if (scrollPosition + viewportHeight < elementPosition) return 0;
    if (scrollPosition > elementPosition + (ref.current?.offsetHeight || 0)) return 0;
    
    const relativePosition = scrollPosition + viewportHeight - elementPosition;
    return relativePosition * speed * -1;
  })();
  
  return (
    <div 
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div 
        style={{ 
          transform: `translateY(${translateY}px)`,
          transition: "transform 0.1s linear"
        }}
      >
        {children}
      </div>
    </div>
  );
}