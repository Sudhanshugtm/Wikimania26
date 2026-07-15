import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('./index.html', import.meta.url);

function loadPage() {
	assert.ok(existsSync(pagePath), 'index.html should exist');
	return readFileSync(pagePath, 'utf8');
}

test('presents the Article Guidance invitation', () => {
	const page = loadPage();
	assert.match(page, /Wikimania 2026/);
	assert.match(page, /Article guidance/);
	assert.match(page, /helps newer editors/);
	assert.match(page, /href="https:\/\/test\.wikipedia\.org\/wiki\/Special:NewArticle"/);
	assert.match(page, />Try it on Test Wikipedia</);
	assert.match(page, /<ul class="steps">/);
	assert.match(page, /Enter an article title/);
	assert.match(page, /Choose the type of article/);
	assert.match(page, /Follow relevant guidance/);
	assert.match(page, /href="https:\/\/www\.mediawiki\.org\/wiki\/Article_guidance"/);
	assert.match(page, />Read about the Article guidance project</);
	assert.doesNotMatch(page, /Early results show fewer deletions/);
});

test('uses responsive and accessible document structure', () => {
	const page = loadPage();
	assert.match(page, /name="viewport"/);
	assert.match(page, /<main/);
	assert.match(page, /<article class="card" aria-labelledby="page-title">/);
	assert.match(page, /\.card\s*\{/);
	assert.match(page, /border: 1px solid #a2a9b1/);
	assert.match(page, /@media \(min-width:/);
	assert.doesNotMatch(page, /Georgia|radial-gradient/);
	assert.doesNotMatch(page, /<dialog/);
});
