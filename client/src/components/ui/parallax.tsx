import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  children: React.ReactNode;
}

export function Parallax({ 
  speed = 0.1,
  className,
  children,
  ...props
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;
      
      const scrollTop = window.scrollY;
      const elementTop = element.getBoundingClientRect().top + scrollTop;
      const viewportHeight = window.innerHeight;
      
      // Only apply parallax effect when the element is in view
      if (
        elementTop < scrollTop + viewportHeight &&
        elementTop + element.offsetHeight > scrollTop
      ) {
        const offset = (scrollTop - elementTop) * speed;
        element.style.transform = `translateY(${offset}px)`;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);
  
  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  );
}