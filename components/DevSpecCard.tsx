import Link from "next/link";
import { DevSpec } from "@/types";

interface DevSpecCardProps {
  spec: DevSpec;
}

export default function DevSpecCard({ spec }: DevSpecCardProps) {
  return (
    <Link
      href={`/devspec/${spec.slug}`}
      className="group block bg-brand-gray rounded-xl p-6 hover:bg-brand-gray/80 border border-transparent hover:border-brand-purple transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          {spec.isPaid ? (
            <span className="inline-block bg-brand-purple px-3 py-1 rounded-full text-xs font-semibold mb-2">
              ${spec.price}
            </span>
          ) : (
            <span className="inline-block bg-green-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              FREE
            </span>
          )}
          {spec.popular && (
            <span className="inline-block bg-purple-600/30 border border-purple-500 px-3 py-1 rounded-full text-xs font-semibold ml-2 mb-2">
              POPULAR
            </span>
          )}
        </div>
        <span className="text-gray-400 text-sm">{spec.fileCount} files</span>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-purple transition-colors">
        {spec.name}
      </h3>
      <p className="text-gray-400 text-sm mb-4">{spec.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {spec.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 bg-brand-darker rounded border border-brand-gray"
          >
            {tech}
          </span>
        ))}
        {spec.stack.length > 3 && (
          <span className="text-xs px-2 py-1 text-gray-400">
            +{spec.stack.length - 3} more
          </span>
        )}
      </div>

      <div className="text-sm text-gray-400">
        <span className="font-semibold text-white">{spec.whoFor.split(" ")[0]}</span>
        {" "}{spec.whoFor.split(" ").slice(1).join(" ")}
      </div>
    </Link>
  );
}
