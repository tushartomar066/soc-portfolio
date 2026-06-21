/**
 * GitHub REST API helper. Fetches a user's public repositories,
 * sorted by stars, for the GitHub Repos section.
 *
 * Runs server-side (called from a Server Component) so an optional
 * GITHUB_TOKEN raises the rate limit without exposing it to the browser.
 */

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

export async function getGitHubRepos(limit = 6): Promise<GitHubRepo[]> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  // No username configured yet — return empty so the UI shows a friendly hint.
  if (!username || username === "your_github_username") {
    return [];
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers,
        // Revalidate hourly so stars/forks stay reasonably fresh.
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos = (await res.json()) as GitHubRepo[];

    return repos
      .filter((r) => !r.fork) // hide forks; show original work
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit);
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return [];
  }
}
