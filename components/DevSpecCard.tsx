import Link from "next/link";
import { DevSpec } from "@/types";

interface DevSpecCardProps {
  spec: DevSpec;
}

export default function DevSpecCard({ spec }: DevSpecCardProps) {
  return (
    <Link
      href={`/devspec/${spec.slug}`}
      className="group block bg-brand-gray rounded border border-brand-border hover:border-gray-600 transition-all p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {spec.isPaid ? (
            <span className="text-xs font-medium text-gray-400">
              ${spec.price}
            </span>
          ) : (
            <span className="text-xs font-medium text-gray-400">
              Free
            </span>
          )}
          {spec.popular && (
            <span className="text-xs text-gray-500">
              Popular
            </span>
          )}
        </div>
        <span className="text-gray-600 text-xs">{spec.fileCount} files</span>
      </div>

      <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors">
        {spec.name}
      </h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{spec.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {spec.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 bg-brand-black border border-brand-border text-gray-500 rounded"
          >
            {tech}
          </span>
        ))}
        {spec.stack.length > 3 && (
          <span className="text-xs px-2 py-1 text-gray-600">
            +{spec.stack.length - 3}
          </span>
        )}
      </div>

      <div className="text-xs text-gray-600">
        {spec.category}
      </div>
    </Link>
  );
}
