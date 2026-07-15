import { mkdir, readFile, writeFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const worker = `const html = ${JSON.stringify(html)};

export default {
	async fetch(request) {
		const url = new URL(request.url);
		if (request.method !== 'GET' || (url.pathname !== '/' && url.pathname !== '/index.html')) {
			return new Response('Not found', { status: 404 });
		}
		return new Response(html, {
			headers: {
				'content-type': 'text/html; charset=utf-8',
				'cache-control': 'public, max-age=300',
			},
		});
	},
};
`;

const output = new URL('../dist/server/', import.meta.url);
await mkdir(output, { recursive: true });
await writeFile(new URL('index.js', output), worker);
