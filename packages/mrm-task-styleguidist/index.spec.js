'use strict';

jest.mock('fs');
jest.mock('mrm-core/src/util/log', () => ({
	added: jest.fn(),
}));
jest.mock('mrm-core/src/npm', () => ({
	install: jest.fn(),
}));

const fs = require.requireActual('fs');
const path = require('path');
const { install } = require('mrm-core');
const { omitBy } = require('lodash');
const { getConfigGetter } = require('mrm');
const vol = require('memfs').vol;
const task = require('./index');

const stringify = o => JSON.stringify(o, null, '  ');

afterEach(() => {
	vol.reset();
	install.mockClear();
});

it('should add React Styleguidist', () => {
	vol.fromJSON({
		[`${__dirname}/templates/styleguide.config.js`]: fs.readFileSync(
			path.join(__dirname, 'templates/styleguide.config.js')
		),
		'/package.json': stringify({
			name: 'unicorn',
		}),
	});

	task(getConfigGetter({}));

	expect(omitBy(vol.toJSON(), (v, k) => k.startsWith(__dirname))).toMatchSnapshot();
	expect(install.mock.calls).toEqual([
		[['react', 'react-dom'], { dev: false }],
		[['react-styleguidist', 'webpack']],
	]);
});

it('should use a TypeScript template for a TypeScript project', () => {
	vol.fromJSON({
		[`${__dirname}/templates/styleguide.config.typescript.js`]: fs.readFileSync(
			path.join(__dirname, 'templates/styleguide.config.typescript.js')
		),
		'/package.json': stringify({
			name: 'unicorn',
			devDependencies: {
				typescript: '*',
			},
		}),
	});

	task(getConfigGetter({}));

	expect(vol.toJSON()['/styleguide.config.js']).toMatchSnapshot();
});

it('should not install webpack when used with CRA', () => {
	vol.fromJSON({
		[`${__dirname}/templates/styleguide.config.js`]: fs.readFileSync(
			path.join(__dirname, 'templates/styleguide.config.js')
		),
		'/package.json': stringify({
			name: 'unicorn',
			dependencies: {
				'react-scripts': '*',
			},
		}),
	});

	task(getConfigGetter({}));

	expect(install.mock.calls).toEqual([
		[['react', 'react-dom'], { dev: false }],
		[['react-styleguidist']],
	]);
});
