'use strict';

module.exports = function (projectName) {
	return {
		prompts: [
			{
				name: 'project',
				type: 'input',
				message: 'Project Name',
				default: projectName
			},
			{
				name: 'author',
				type: 'input',
				message: 'Author',
				validate(input) {
					return !!input;
				}
			},
			{
				name: 'desc',
				type: 'input',
				message: 'Project description',
				default: 'A Vue mobile project'
			},
			{
				name: 'keywords',
				type: 'input',
				message: 'Keywords',
				default: 'vue mobile'
			},
			{
				name: 'sitePageTitle',
				type: 'input',
				message: 'Site page title',
				default: 'todo'
			},
			{
				name: 'themeColor',
				type: 'input',
				message: 'Theme color',
				default: '#1d3f72'
			},
			{
				name: 'appName',
				type: 'input',
				message: 'App name',
				default: 'todo'
			},
			{
				name: 'hasErrorMonitor',
				type: 'confirm',
				message: 'Use error monitor?',
				default: true
			},
			{
				name: 'hasSecan',
				type: 'confirm',
				message: 'Use secan?',
				default: false,
				when({ hasErrorMonitor }) {
					return hasErrorMonitor;
				}
			},
			{
				name: 'hasTravis',
				type: 'confirm',
				message: 'Use travis-ci?',
				default: true
			}
		],
		complete(answers) {
			const { hasErrorMonitor, hasTravis, hasSecan } = answers,
				excludes = ['.dulu.js'],
				templates = ['_package.json', 'README.md', '.env', '.env.development', '.env.production', 'vue.config.js', 'src/main.js', 'src/router.js'],
				transform = {
					'_package.json': 'package.json'
				};
			answers.keywords = answers.keywords ? answers.keywords.split(/\s+/) : [];

			if (!hasErrorMonitor) {
				excludes.push('.sentryclirc', 'src/lib/error-collect.js', 'src/lib/load-sentry.js');
			}

			if (!hasSecan) {
				excludes.push('src/lib/guard.js');
			}

			if (!hasTravis) {
				excludes.push('.travis.yml');
			} else {
				templates.push('.travis.yml');
			}

			return {
				excludes,
				templates,
				transform
			};
		}
	};
};
