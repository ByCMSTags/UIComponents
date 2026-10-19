export function createClient({ api, token, owner, repo }) {
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'cmstags-cli',
  };
  async function request(method, path, body) {
    const res = await fetch(`${api}${path}`, {
      method,
      headers: { ...headers, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = { message: text };
    }
    if (!res.ok) {
      const err = new Error(json?.message || `GitHub responded ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return json;
  }
  return {
    owner,
    repo,
    api,
    headers,
    calls: [],
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body),
    patch: (path, body) => request('PATCH', path, body),
  };
}

export function missingRepoMessage(owner, repo) {
  return `Repository ${owner}/${repo} does not exist yet. Create an empty repository at https://github.com/${owner}/${repo} (no README on GitHub), then push the UIComponents/ folder. See UIComponents/README.md. This CLI does not create the repository.`;
}
