import { Calendar, ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "www/components/ui/button";

const Analysis = () => {
  return (
    <div className=" flex flex-col w-full h-full ">
      <main className="flex-1 flex flex-col ">Analyze page</main>
      <div className=" flex justify-end">
        {" "}
      
          <Button variant={'default'} className="relative pe-12 mb-4">
            Next
            <span className="pointer-events-none absolute inset-y-0 end-0 flex w-9 items-center justify-center ">
              <ChevronRight className="opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
            </span>
          </Button>
        
      </div>
    </div>
  );
};

export default Analysis;
