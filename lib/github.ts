import { Repository } from "@/types";

const GITHUB_API = "https://api.github.com";
const ORG_NAME = "HACODE-SOLUTIONS";

export async function getOrganizationRepos(): Promise<Repository[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `${GITHUB_API}/orgs/${ORG_NAME}/repos?type=public&sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error("GitHub API error:", response.status, response.statusText);
      return [];
    }

    const repos: Repository[] = await response.json();
    return repos.filter((repo) => !repo.fork);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}
