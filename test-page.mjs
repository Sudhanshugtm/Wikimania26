import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('./index.html', import.meta.url);

function loadPage() {
	assert.ok(existsSync(pagePath), 'index.html should exist');
	return readFileSync(pagePath, 'utf8');
}

test('presents the Test Wikipedia prototype context', () => {
	const page = loadPage();
	assert.match(page, /Wikimania 2026/);
	assert.match(page, /Try the prototype/);
	assert.match(page, /Test Wikipedia/);
	assert.match(page, /give it a try/);
	assert.match(page, /tell us what worked/);
	assert.doesNotMatch(page, /A prototype is on its way/);
});

test('uses responsive and accessible document structure', () => {
	const page = loadPage();
	assert.match(page, /name="viewport"/);
	assert.match(page, /<main/);
	assert.match(page, /aria-disabled="true"/);
	assert.match(page, /@media \(min-width:/);
});
