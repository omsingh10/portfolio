# Command-Line Portfolio - Om Singh

A unique command-line style portfolio website built with HTML, CSS, and JavaScript for Om Singh, Full-Stack & Flutter Developer.

## Features

- Interactive command-line interface
- Responsive design for desktop and mobile
- Easy to customize and update content
- Keyboard navigation with history support
- Command autocomplete with Tab key

## Commands

- `help` - Show available commands
- `about` - Learn about me
- `skills` - My technical skills
- `experience` - My work experience
- `education` - My educational background
- `projects` - View my projects
- `achievements` - My accomplishments
- `contact` - How to reach me
- `social` - My social media profiles
- `resume` - View my resume
- `clear` - Clear the terminal

## Setup for GitHub Pages

1. Create a GitHub repository
2. Push this code to the repository
3. Go to repository settings > Pages
4. Set source branch to `main` or `master` and folder to `/ (root)`
5. Your site will be published at `https://[username].github.io/[repository-name]/`

## How to Update Content

All content is stored in the `terminal.js` file in the `processCommand` function. You can easily update your information by modifying the HTML responses for each command.

To add new commands, add a new case to the switch statement in the `processCommand` function and update the commands array in the autocompleteCommand function.

## Credits

Created for Om Singh - Full-Stack & Flutter Developer

## License

MIT
