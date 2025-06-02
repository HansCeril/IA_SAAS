// "use client";
// import { useState } from "react";
// import { animated, useSpring } from "@react-spring/web";

// interface FlipbookProps {
//   pages: string[];
// }

// export default function SummaryViewer({ summary }: { summary: string }) {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [direction, setDirection] = useState<"next" | "prev" | null>(null);
//   const [isFlipping, setIsFlipping] = useState(false);

//   const [touchStart, setTouchStart] = useState<number | null>(null);

//   const { transform } = useSpring({
//     transform:
//       direction === "next"
//         ? "perspective(1000px) rotateY(-180deg)"
//         : direction === "prev"
//         ? "perspective(1000px) rotateY(180deg)"
//         : "perspective(1000px) rotateY(0deg)",
//     reset: true,
//     reverse: !isFlipping,
//     config: { mass: 5, tension: 500, friction: 80 },
//     onRest: () => {
//       if (direction === "next" && currentPage < pages.length - 1) {
//         setCurrentPage((prev) => prev + 1);
//       } else if (direction === "prev" && currentPage > 0) {
//         setCurrentPage((prev) => prev - 1);
//       }
//       setIsFlipping(false);
//       setDirection(null);
//     },
//   });

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.touches[0].clientX);
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (!touchStart) return;
//     const touchEnd = e.changedTouches[0].clientX;
//     const diff = touchStart - touchEnd;

//     if (Math.abs(diff) > 50) {
//       if (diff > 0) triggerFlip("next");
//       else triggerFlip("prev");
//     }
//     setTouchStart(null);
//   };

//   const triggerFlip = (dir: "next" | "prev") => {
//     if (
//       isFlipping ||
//       (dir === "next" && currentPage >= pages.length - 1) ||
//       (dir === "prev" && currentPage <= 0)
//     )
//       return;
//     setIsFlipping(true);
//     setDirection(dir);
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-sm sm:max-w-md md:max-w-xl aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/10] relative max-h-[90vh]">
//         <animated.div
//           style={{ transform }}
//           className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden transform-style-3d backface-hidden transition-transform duration-700"
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div className="flex flex-col h-full p-6">
//             <h2 className="text-xl font-bold text-indigo-700 mb-4">
//               Page {currentPage + 1}
//             </h2>
//             <div className="flex-1 overflow-y-auto text-gray-800 prose prose-sm sm:prose lg:prose-lg">
//               {pages[currentPage]}
//             </div>
//             <div className="mt-6 flex justify-between items-center">
//               <button
//                 onClick={() => triggerFlip("prev")}
//                 disabled={currentPage === 0}
//                 className="px-4 py-2 rounded bg-indigo-200 text-indigo-900 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
//               <span className="text-sm font-medium text-gray-600">
//                 {String(currentPage + 1).padStart(2, "0")}/
//                 {String(pages.length).padStart(2, "0")}
//               </span>
//               <button
//                 onClick={() => triggerFlip("next")}
//                 disabled={currentPage === pages.length - 1}
//                 className="px-4 py-2 rounded bg-indigo-200 text-indigo-900 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </animated.div>
//       </div>
//     </div>
//   );
// }
