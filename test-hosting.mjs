import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

test('build produces a worker that serves the Article Guidance page', async () => {
	const build = spawnSync(process.execPath, ['scripts/build-site.mjs'], {
		cwd: new URL('.', import.meta.url),
		encoding: 'utf8',
	});
	assert.equal(build.status, 0, build.stderr);

	const workerUrl = new URL(`./dist/server/index.js?test=${Date.now()}`, import.meta.url);
	const { default: worker } = await import(workerUrl);
	const response = await worker.fetch(new Request('https://example.test/'));
	const html = await response.text();

	assert.equal(response.status, 200);
	assert.match(response.headers.get('content-type'), /text\/html/);
	assert.match(html, /Article guidance/);
	assert.match(html, /Special:NewArticle/);
});
