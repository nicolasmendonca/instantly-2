const colors = require('tailwindcss/colors');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite/**/*.js'],

	theme: {
		extend: {
			colors: {
				primary: colors.purple
			}
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
