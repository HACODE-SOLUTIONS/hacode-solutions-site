"use client";

import { useState } from "react";
import DevSpecCard from "@/components/DevSpecCard";
import { devSpecs } from "@/data/devspecs";

export default function CatalogClient() {
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all");

  const filteredSpecs =
    filter === "all"
      ? devSpecs
      : filter === "free"
      ? devSpecs.filter((s) => !s.isPaid)
      : devSpecs.filter((s) => s.isPaid);

  return (
    <>
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === "all"
              ? "bg-brand-purple"
              : "bg-brand-gray hover:bg-brand-gray/80"
          }`}
        >
          All DevSpecs
        </button>
        <button
          onClick={() => setFilter("free")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === "free"
              ? "bg-green-600"
              : "bg-brand-gray hover:bg-brand-gray/80"
          }`}
        >
          Free
        </button>
        <button
          onClick={() => setFilter("paid")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === "paid"
              ? "bg-brand-purple"
              : "bg-brand-gray hover:bg-brand-gray/80"
          }`}
        >
          Premium
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecs.map((spec) => (
          <DevSpecCard key={spec.id} spec={spec} />
        ))}
      </div>

      {filteredSpecs.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No DevSpecs found for this filter.
        </div>
      )}
    </>
  );
}
