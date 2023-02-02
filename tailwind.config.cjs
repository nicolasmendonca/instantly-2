const colors = require('tailwindcss/colors');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite/**/*.js'],

	theme: {
		extend: {
			colors: {
				primary: colors.orange,
				danger: colors.red,
				success: colors.green,
				neutral: colors.slate
			}
		}
	},

	plugins: [
		require('flowbite/plugin'),
		require('tailwind-scrollbar-hide'),
		require('@tailwindcss/typography')
	],
	darkMode: 'class'
};

module.exports = config;
