// ASCII Art animations
const asciiArts = [
    // Original Om Singh text
    `  ___  __  __    ____ ___ _   _  ____ _   _ 
 / _ \\|  \\/  |  / ___|_ _| \\ | |/ ___| | | |
| | | | |\\/| |  \\___ \\| ||  \\| | |  _| |_| |
| |_| | |  | |   ___) | || |\\  | |_| |  _  |
 \\___/|_|  |_|  |____|___|_| \\_|\\____|_| |_|`,

    // Hacker ASCII Art
    ` _   _    _    ____ _  _______ ____  
| | | |  / \\  / ___| |/ / ____|  _ \\ 
| |_| | / _ \\| |   | ' /|  _| | |_) |
|  _  |/ ___ \\ |___| . \\| |___|  _ < 
|_| |_/_/   \\_\\____|_|\\_\\_____|_| \\_\\`,

    // Computer ASCII Art
    `  ____  _____     _______ _____ ____  
 / ___|| ____|   / / ____|_   _/ ___| 
| |    |  _|    / /|  _|   | | \\___ \\ 
| |___ | |___  / / | |___  | |  ___) |
 \\____||_____|/_/  |_____| |_| |____/ `,

    // Dragon ASCII Art
    `     __        _                
    / _\\_ __  (_)_ __   __ _  
   /\\ \\\\ '_ \\ | | '_ \\ / _\` | 
  / _\\ \\ | | || | | | | (_| | 
 /_/  \\_\\_| |_|/ |_| |_|\\__, | 
            |__/        |___/ `,

    // Fox ASCII Art
    `   __                  
  / _| _____  __     
 | |_ / _ \\ \\/ /     
 |  _| (_) >  <      
 |_|  \\___/_/\\_\\     
                    `
];

// Current animation index
let currentAsciiIndex = 0;

// Function to change the ASCII art
function changeAsciiArt() {
    const asciiArtElement = document.querySelector('.ascii-art');
    if (asciiArtElement) {
        currentAsciiIndex = (currentAsciiIndex + 1) % asciiArts.length;
        asciiArtElement.innerHTML = asciiArts[currentAsciiIndex];
        
        // Set data-text attribute for glitch effect
        const dataTexts = ["OMSINGH", "HACKER", "CODER", "DRAGON", "FOX", "LOVER"];
        asciiArtElement.setAttribute('data-text', dataTexts[currentAsciiIndex]);
    }
}

// Change ASCII art every 1 seconds
setInterval(changeAsciiArt, 5000);

// Initial ASCII art change after page load
document.addEventListener('DOMContentLoaded', function() {
    // This will run after the main terminal.js has loaded
    setTimeout(function() {
        const asciiArtElement = document.querySelector('.ascii-art');
        if (asciiArtElement) {
            asciiArtElement.innerHTML = asciiArts[0]; // Start with the original art
        }
    }, 500);
});
