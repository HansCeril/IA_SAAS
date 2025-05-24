import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import React, { ReactNode } from "react";

type STEPS = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: STEPS[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your document",
    description: "Dragd an Drop your document then click on upload",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "IA analyse",
    description: "The document is precessed by advanced AI",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get tyour resume",
    description: "Dragd an Drop your document then click on upload",
  },
];

const HowItWorkSection = () => {
  return (
    <section className="relative flex flex-col">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-16">
          <h2 className="font-bold text-xl uppercase mb-4 text-fuchsia-600">
            {" "}
            How it works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Transform any document into a beautiful Resume into 3 Steps
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <div className="relative flex items-stretch">
              <StepItem key={idx} {...step} />
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-blue-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;

function StepItem({ icon, label, description }: STEPS) {
  return (
    <div className="relative p-6 rounded-2xl backdrop-blur-xs border border-white/10 hover:border-blue-500 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div
          className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 
            to-transparent group-hover:from-rose-500/20 transition-colors"
        >
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-col felx-1 gap-1 justify-between">
          <h4 className="text-center font-bold text-xl"> {label} </h4>
          <p className="text-center text-gray-600 text-sm"> {description} </p>
        </div>
      </div>
    </div>
  );
}
