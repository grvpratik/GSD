// Interfaces for API responses and parameters
interface SearchOptions {
	language?: string;
	minStars?: number;
}

interface RepositoryListOptions {
	type?: "all" | "owner" | "public" | "private" | "member";
	sort?: "created" | "updated" | "pushed" | "full_name";
	direction?: "asc" | "desc";
}

interface Repository {
	name: string;
	description: string | null;
	stars: number;
	forks: number;
	url: string;
	language: string | null;
}

interface UserInfo {
	name: string | null;
	username: string;
	bio: string | null;
	publicRepos: number;
	followers: number;
	following: number;
	location: string | null;
	email: string | null;
	profileUrl: string;
	avatarUrl: string;
}

interface RepositoryDetails extends Repository {
	openIssues: number;
	createdAt: Date;
	lastUpdated: Date;
	defaultBranch: string;
	visibility: string;
}

interface ContributionStats {
	totalContributions: number;
	eventTypes: Record<string, number>;
	recentRepositories: string[];
}

class GitHubAPIExplorer {
	private accessToken: string;
	private baseUrl: string;
	private headers: Record<string, string>;

	constructor(
		accessToken: string = ""
	) {
		this.accessToken = accessToken;
		this.baseUrl = "https://api.github.com";
		this.headers = {
			Accept: "application/vnd.github.v3+json",
			...(accessToken && { Authorization: `token ${accessToken}` }),
		};
	}

	async searchRepositories(
		query: string,
		options: SearchOptions = {}
	): Promise<Repository[]> {
		const { language, minStars } = options;
		let searchQuery = query;

		if (language) {
			searchQuery += ` language:${language}`;
		}
		if (minStars) {
			searchQuery += ` stars:>${minStars}`;
		}

		try {
			const response = await fetch(
				`${this.baseUrl}/search/repositories?q=${encodeURIComponent(searchQuery)}`,
				{
					method: "GET",
					headers: this.headers,
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data.items.slice(0, 10).map((repo: any) => ({
				name: repo.full_name,
				description: repo.description,
				stars: repo.stargazers_count,
				forks: repo.forks_count,
				url: repo.html_url,
				language: repo.language,
			}));
		} catch (error) {
			console.error("Error searching repositories:", error);
			return [];
		}
	}

	async getUserInfo(username: string): Promise<UserInfo | null> {
		try {
			const response = await fetch(`${this.baseUrl}/users/${username}`, {
				method: "GET",
				headers: this.headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const user = await response.json();
			return {
				name: user.name,
				username: user.login,
				bio: user.bio,
				publicRepos: user.public_repos,
				followers: user.followers,
				following: user.following,
				location: user.location,
				email: user.email,
				profileUrl: user.html_url,
				avatarUrl: user.avatar_url,
			};
		} catch (error) {
			console.error("Error fetching user info:", error);
			return null;
		}
	}

	async getRepositoryDetails(
		owner: string,
		repo: string
	): Promise<RepositoryDetails | null> {
		try {
			const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`, {
				method: "GET",
				headers: this.headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const repoDetails = await response.json();
			return {
				name: repoDetails.full_name,
				description: repoDetails.description,
				language: repoDetails.language,
				stars: repoDetails.stargazers_count,
				forks: repoDetails.forks_count,
				openIssues: repoDetails.open_issues_count,
				createdAt: new Date(repoDetails.created_at),
				lastUpdated: new Date(repoDetails.updated_at),
				defaultBranch: repoDetails.default_branch,
				visibility: repoDetails.visibility,
				url: repoDetails.html_url,
			};
		} catch (error) {
			console.error("Error fetching repository details:", error);
			return null;
		}
	}

	async listUserRepositories(
		username: string,
		options: RepositoryListOptions = {}
	): Promise<Repository[]> {
		const { type = "all", sort = "updated", direction = "desc" } = options;

		try {
			const response = await fetch(
				`${this.baseUrl}/users/${username}/repos?type=${type}&sort=${sort}&direction=${direction}`,
				{
					method: "GET",
					headers: this.headers,
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const repositories = await response.json();
			return repositories.slice(0, 20).map((repo: any) => ({
				name: repo.full_name,
				description: repo.description,
				language: repo.language,
				stars: repo.stargazers_count,
				forks: repo.forks_count,
				url: repo.html_url,
			}));
		} catch (error) {
			console.error("Error listing user repositories:", error);
			return [];
		}
	}

	async getUserContributions(
		username: string
	): Promise<ContributionStats | null> {
		try {
			const response = await fetch(`${this.baseUrl}/users/${username}/events`, {
				method: "GET",
				headers: this.headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const events = await response.json();
			const contributionStats: ContributionStats = {
				totalContributions: events.length,
				eventTypes: {},
				recentRepositories: [],
			};

			events.forEach((event: any) => {
				contributionStats.eventTypes[event.type] =
					(contributionStats.eventTypes[event.type] || 0) + 1;

				if (!contributionStats.recentRepositories.includes(event.repo.name)) {
					contributionStats.recentRepositories.push(event.repo.name);
				}
			});

			return contributionStats;
		} catch (error) {
			console.error("Error fetching user contributions:", error);
			return null;
		}
	}
}

// Example usage remains the same
async function demonstrateGitHubAPI(): Promise<void> {
	// ... rest of the demonstration code remains unchanged
	// Create an instance (unauthenticated)
	const explorer = new GitHubAPIExplorer();

	// Authenticated version (uncomment and replace with your token)
	// const explorer = new GitHubAPIExplorer('YOUR_GITHUB_PERSONAL_ACCESS_TOKEN');

	try {
		// Search repositories
		console.log("Searching for JavaScript machine learning repositories:");
		const mlRepos = await explorer.searchRepositories("machine learning", {
			language: "javascript",
			minStars: 100,
		});
		mlRepos.forEach((repo) =>
			console.log(`- ${repo.name}: ${repo.description}`)
		);

		// Get user information
		console.log("\nFetching user information for octocat:");
		const userInfo = await explorer.getUserInfo("octocat");
		console.log(userInfo);

		// Get repository details
		console.log("\nRepository Details:");
		const repoDetails = await explorer.getRepositoryDetails(
			"octocat",
			"Hello-World"
		);
		console.log(repoDetails);

		// List user repositories
		console.log("\nUser Repositories:");
		const userRepos = await explorer.listUserRepositories("github");
		userRepos.forEach((repo) =>
			console.log(`- ${repo.name}: ${repo.language}`)
		);

		// Get user contributions
		console.log("\nUser Contributions:");
		const contributions = await explorer.getUserContributions("octocat");
		console.log(contributions);
	} catch (error) {
		console.error("Error in GitHub API demonstration:", error);
	}
}

demonstrateGitHubAPI();
