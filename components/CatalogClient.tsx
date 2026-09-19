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
      <div className="flex gap-3 mb-10 justify-center">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2 rounded text-xs font-medium transition-colors ${
            filter === "all"
              ? "bg-white text-black"
              : "border border-brand-border hover:border-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("free")}
          className={`px-5 py-2 rounded text-xs font-medium transition-colors ${
            filter === "free"
              ? "bg-white text-black"
              : "border border-brand-border hover:border-gray-600"
          }`}
        >
          Free
        </button>
        <button
          onClick={() => setFilter("paid")}
          className={`px-5 py-2 rounded text-xs font-medium transition-colors ${
            filter === "paid"
              ? "bg-white text-black"
              : "border border-brand-border hover:border-gray-600"
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
        <div className="text-center py-16 text-gray-600 text-sm">
          No DevSpecs found for this filter.
        </div>
      )}
    </>
  );
}
