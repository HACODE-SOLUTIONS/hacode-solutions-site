import { getOrganizationRepos } from "@/lib/github";
import { generateSEO } from "@/lib/seo";
import Link from "next/link";

export const metadata = generateSEO({
  title: "Repositories",
  description:
    "Explore our open-source DevSpec repositories on GitHub. Free specification packs for AI coding agents to build Next.js applications, Stripe integrations, authentication systems, and more.",
  path: "/repositories",
});

export const revalidate = 3600;

export default async function RepositoriesPage() {
  const repos = await getOrganizationRepos();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Open Source Repositories
      </h1>
      <p className="text-xl text-gray-400 mb-12 max-w-3xl">
        All our free DevSpec packs are open source and available on GitHub.
        Clone, fork, and use them in your AI coding projects.
      </p>

      {repos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">
            No repositories found. Please check back later.
          </p>
          <Link
            href="https://github.com/HACODE-SOLUTIONS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-purple hover:text-purple-400"
          >
            Visit our GitHub organization →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {repos.map((repo) => (
            <Link
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-brand-gray rounded-xl p-6 hover:bg-brand-gray/80 border border-transparent hover:border-brand-purple transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold hover:text-brand-purple transition-colors">
                  {repo.name}
                </h2>
                {repo.language && (
                  <span className="px-3 py-1 bg-brand-darker rounded text-xs">
                    {repo.language}
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="text-gray-400 mb-4">{repo.description}</p>
              )}

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-1 bg-brand-darker rounded border border-brand-gray"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  ⭐ {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  🔀 {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  📅{" "}
                  {new Date(repo.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="https://github.com/HACODE-SOLUTIONS"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand-gray hover:bg-brand-gray/80 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <span>View All on GitHub</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
