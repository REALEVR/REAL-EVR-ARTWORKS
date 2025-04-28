import { mediumTypes } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface GalleryFiltersProps {
  selectedMedium: string;
  setSelectedMedium: (medium: string) => void;
}

const GalleryFilters = ({ selectedMedium, setSelectedMedium }: GalleryFiltersProps) => {
  return (
    <div className="flex gap-2">
      {/* Mobile Dropdown for Medium Filter */}
      <div className="md:hidden w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              {selectedMedium}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem 
              onClick={() => setSelectedMedium("All")}
              className={selectedMedium === "All" ? "bg-accent text-white" : ""}
            >
              All
            </DropdownMenuItem>
            {mediumTypes.map((medium) => (
              <DropdownMenuItem 
                key={medium} 
                onClick={() => setSelectedMedium(medium)}
                className={selectedMedium === medium ? "bg-accent text-white" : ""}
              >
                {medium}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Filter Pills */}
      <div className="hidden md:flex items-center space-x-2 flex-wrap">
        <Button 
          variant={selectedMedium === "All" ? "default" : "ghost"} 
          size="sm" 
          className="px-3 py-1 text-sm font-accent rounded-full hover:bg-white hover:shadow transition-all"
          onClick={() => setSelectedMedium("All")}
        >
          All
        </Button>
        
        {/* Only show a few medium types in the main view */}
        {mediumTypes.slice(0, 4).map((medium) => (
          <Button 
            key={medium}
            variant={selectedMedium === medium ? "default" : "ghost"} 
            size="sm" 
            className="px-3 py-1 text-sm font-accent rounded-full hover:bg-white hover:shadow transition-all"
            onClick={() => setSelectedMedium(medium)}
          >
            {medium}
          </Button>
        ))}
        
        {/* Show remaining medium types in dropdown */}
        {mediumTypes.length > 4 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-3 py-1 text-sm font-accent rounded-full hover:bg-white hover:shadow transition-all"
              >
                More
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {mediumTypes.slice(4).map((medium) => (
                <DropdownMenuItem 
                  key={medium} 
                  onClick={() => setSelectedMedium(medium)}
                  className={selectedMedium === medium ? "bg-accent text-white" : ""}
                >
                  {medium}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default GalleryFilters;
