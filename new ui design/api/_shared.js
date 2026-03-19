const DEFAULT_TIMEOUT_MS = 15000;

function getBackendBaseUrl() {
  const value = process.env.BACKEND_BASE_URL?.replace(/\/$/, '');
  if (!value) {
    throw new Error('BACKEND_BASE_URL is not configured.');
  }
  return value;
}

function buildBackendHeaders(contentType) {
  const headers = {
    Accept: 'application/json',
  };

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (process.env.BACKEND_SHARED_SECRET) {
    headers['X-Shared-Secret'] = process.env.BACKEND_SHARED_SECRET;
  }

  return headers;
}

export async function proxyJson(req, res, path, method) {
  if (req.method !== method) {
    res.status(405).json({ detail: 'Method not allowed.' });
    return;
  }

  try {
    const backendUrl = `${getBackendBaseUrl()}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    const response = await fetch(backendUrl, {
      method,
      headers: buildBackendHeaders(method === 'GET' ? undefined : 'application/json'),
      body: method === 'GET' ? undefined : JSON.stringify(req.body ?? {}),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const text = await response.text();
    const contentType = response.headers.get('content-type') || 'application/json; charset=utf-8';

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', contentType);
    res.status(response.status).send(text);
  } catch {
    res.status(502).json({ detail: 'Unable to reach the tracking service right now.' });
  }
}
