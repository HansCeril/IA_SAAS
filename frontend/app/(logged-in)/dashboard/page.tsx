import EmptySummaries from "@/components/summaries/EmptySummaries";
import SummaryCard from "@/components/summaries/SummaryCard";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const uploadLimit = 5;
  const user = await currentUser();

  if (!user?.id) return redirect("/sign-in");

  const userId = user?.id;
  const summaries = await getSummaries(userId);
  console.log(summaries);
  return (
    <main className="min-h-screen">
      <div className="container mx-auto flex flex-col gapt4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1
                className="text-4xl font-bold tracking-tight bg-linear-to-r
                from-blue-500 to-blue-700 bg-clip-text text-transparent"
              >
                {" "}
                Your Document Summaries{" "}
              </h1>
              <p className="text-gray-600">
                {" "}
                Transform your PDFs into concise, actionable insights{" "}
              </p>
            </div>
            <Button
              variant={"link"}
              className="hover:scale-105 transition-all duration-300 group hover:no-underline"
            >
              <Link href="/upload" className="flex items-center text-white">
                {" "}
                <Plus className="w-5 h-5 mr-2" /> New Resume{" "}
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p>
                {" "}
                You've reached the limite of {uploadLimit} uploads on the Basic
                Plan{" "}
                <Link
                  href="/#pricing"
                  className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
                >
                  {" "}
                  Click here to upgrade to Pro Plan{" "}
                  <ArrowRight className="w-4 h-4 inline-block" />
                </Link>{" "}
                for unlimited uploads
              </p>
            </div>
          </div>

          {summaries.length === 0 ? (
            <EmptySummaries />
          ) : (
            <div
              className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 
            lg:grid-cols-3 sm:px-0"
            >
              {summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
