import { proxyJson } from './_shared.js';

export default async function handler(req, res) {
  return proxyJson(req, res, '/track', 'POST');
}
