/* Add specific fixes for terminal functionality */

// Helper function to set cursor position at end of contentEditable
function setEndOfContenteditable(contentEditableElement) {
    if (document.createRange) {
        const range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

// Ensure terminal options buttons work properly
document.addEventListener('DOMContentLoaded', function() {
    // Fix terminal input issues immediately
    const commandInput = document.getElementById('command-input');
    const terminalBody = document.getElementById('terminal-body');
    
    // Make sure contentEditable is properly set
    if (commandInput) {
        commandInput.setAttribute('contenteditable', 'true');
        commandInput.style.minWidth = '4px';
        commandInput.style.display = 'inline-block';
        
        // Focus and set cursor at end
        commandInput.focus();
        setEndOfContenteditable(commandInput);
        
        // Ensure terminal receives clicks and focuses input
        document.querySelector('.terminal').addEventListener('click', function(e) {
            if (!e.target.classList.contains('link') && 
                !e.target.classList.contains('tab') && 
                !e.target.classList.contains('theme-option') &&
                !e.target.closest('.terminal-options') &&
                !e.target.closest('.terminal-buttons') &&
                !e.target.closest('.theme-popup')) {
                
                commandInput.focus();
                setEndOfContenteditable(commandInput);
                e.stopPropagation();
            }
        });
    }

    // Wait a short time to ensure other scripts have run
    setTimeout(() => {
        // Fix terminal options buttons
        const settingsButton = document.querySelector('.terminal-options span:first-child');
        const expandButton = document.querySelector('.terminal-options span:last-child');
        
        if (settingsButton) {
            settingsButton.onclick = function(e) {
                e.stopPropagation();
                e.preventDefault();
                
                // Create popup for theme selection
                const themePopup = document.createElement('div');
                themePopup.classList.add('theme-popup');
                themePopup.innerHTML = `
                    <div class="theme-option light" data-theme="light">space Mode</div>
                    <div class="theme-option dark active" data-theme="dark">normal Mode</div>
                `;
                
                // Position the popup
                const rect = this.getBoundingClientRect();
                themePopup.style.position = 'absolute';
                themePopup.style.top = (rect.bottom + 5) + 'px';
                themePopup.style.right = (window.innerWidth - rect.right) + 'px';
                
                // Add to document
                document.body.appendChild(themePopup);
                
                // Handle theme selection
                const themeOptions = themePopup.querySelectorAll('.theme-option');
                themeOptions.forEach(option => {
                    option.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const theme = this.getAttribute('data-theme');
                        document.body.className = theme + '-theme';
                        localStorage.setItem('portfolio-theme', theme);
                        
                        // Remove popup
                        document.body.removeChild(themePopup);
                    });
                });
                
                // Close when clicking outside
                document.addEventListener('click', function closeThemePopup(e) {
                    if (!themePopup.contains(e.target) && e.target !== settingsButton) {
                        if (document.body.contains(themePopup)) {
                            document.body.removeChild(themePopup);
                        }
                        document.removeEventListener('click', closeThemePopup);
                    }
                });
            };
        }
        
        if (expandButton) {
            expandButton.onclick = function(e) {
                e.stopPropagation();
                e.preventDefault();
                
                const terminal = document.querySelector('.terminal');
                
                if (terminal.classList.contains('maximized')) {
                    // Restore
                    terminal.classList.remove('maximized');
                    document.body.style.overflow = '';
                    
                    // Reset inline styles
                    terminal.style.position = '';
                    terminal.style.top = '';
                    terminal.style.left = '';
                    terminal.style.right = '';
                    terminal.style.bottom = '';
                    terminal.style.width = '';
                    terminal.style.height = '';
                    terminal.style.zIndex = '';
                    terminal.style.margin = '';
                } else {
                    // Maximize
                    terminal.classList.add('maximized');
                    document.body.style.overflow = 'hidden';
                    
                    // Set explicit styles
                    terminal.style.position = 'fixed';
                    terminal.style.top = '0';
                    terminal.style.left = '0';
                    terminal.style.right = '0';
                    terminal.style.bottom = '0';
                    terminal.style.width = '100vw';
                    terminal.style.height = '100vh';
                    terminal.style.zIndex = '9999';
                    terminal.style.margin = '0';
                }
                
                // Focus the command input
                setTimeout(function() {
                    const commandInput = document.getElementById('command-input');
                    if (commandInput) {
                        commandInput.focus();
                        setEndOfContenteditable(commandInput);
                    }
                }, 100);
            };
        }
        
        // Add extra check and fix for terminal input
        const commandInput = document.getElementById('command-input');
        if (!commandInput || !commandInput.isContentEditable) {
            console.log("Terminal input not functioning, attempting fix...");
            
            // Try to fix the command input
            const currentLine = document.querySelector('.current-line');
            if (currentLine) {
                // Check if command input exists
                let cmdInput = currentLine.querySelector('#command-input');
                
                if (!cmdInput) {
                    // Create a new one if needed
                    cmdInput = document.createElement('span');
                    cmdInput.id = 'command-input';
                    cmdInput.className = 'command';
                    cmdInput.setAttribute('contenteditable', 'true');
                    cmdInput.setAttribute('spellcheck', 'false');
                    
                    // Add after prompt
                    const prompt = currentLine.querySelector('.prompt');
                    if (prompt) {
                        prompt.insertAdjacentElement('afterend', cmdInput);
                    }
                } else {
                    // Fix existing one
                    cmdInput.setAttribute('contenteditable', 'true');
                }
                
                // Set up click handler
                cmdInput.addEventListener('click', function(e) {
                    e.stopPropagation();
                    setEndOfContenteditable(this);
                });
                
                // Focus it
                cmdInput.focus();
                setEndOfContenteditable(cmdInput);
            }
        }
    }, 1000);
    
    // Additional global event to ensure command input works
    document.addEventListener('keydown', function(e) {
        // If typing anywhere in terminal area and not in another input
        if (!e.target.matches('input, textarea, [contenteditable]')) {
            const commandInput = document.getElementById('command-input');
            if (commandInput) {
                commandInput.focus();
                setEndOfContenteditable(commandInput);
            }
        }
    });
    
    // Fix for command processing when Enter key is pressed
    const cmdInputEl = document.getElementById('command-input');
    if (cmdInputEl) {
        // Add Enter key handler
        cmdInputEl.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = this.textContent.trim();
                
                if (command) {
                    // Process the command
                    processCommandFixed(command, this);
                }
            }
        });
    }
});

// Process commands function
function processCommandFixed(command, inputElement) {
    const commandHistory = document.getElementById('command-history');
    const terminalBody = document.getElementById('terminal-body');
    
    // Add command to history display
    const commandLine = document.createElement('div');
    commandLine.classList.add('line');
    commandLine.innerHTML = `<span class="prompt">omsingh@portfolio:~$</span> <span class="command-text">${command}</span>`;
    commandHistory.appendChild(commandLine);
    
    // Create response element
    const responseDiv = document.createElement('div');
    responseDiv.classList.add('line', 'response');
    
    // Process different commands
    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ');
    const primaryCmd = args[0];
    
    switch(primaryCmd) {
        case 'help':
            responseDiv.innerHTML = `
                <p>Available commands:</p>
                <ul>
                    <li><span class="highlight">about</span> - About me</li>
                    <li><span class="highlight">skills</span> - My technical skills</li>
                    <li><span class="highlight">projects</span> - View my projects</li>
                    <li><span class="highlight">experience</span> - My work experience</li>
                    <li><span class="highlight">education</span> - My educational background</li>
                    <li><span class="highlight">contact</span> - Contact information</li>
                    <li><span class="highlight">resume</span> - Download my resume</li>
                    <li><span class="highlight">clear</span> - Clear the terminal</li>
                    <li><span class="highlight">theme</span> - Change theme (light/dark)</li>
                    <li><span class="highlight">ascii</span> - Display ASCII art</li>
                    <li><span class="highlight">help</span> - Show this help message</li>
                </ul>
            `;
            break;
        
        case 'about':
            responseDiv.innerHTML = `
                <h2>About Me</h2>
                <p>Hi there! I'm Om Singh, an Associate Software Engineer with a passion for creating innovative solutions.</p>
                <p>I specialize in full-stack development, with expertise in React, Node.js, and various modern web technologies.</p>
                <p>When I'm not coding, you can find me exploring new tech, contributing to open source, or enhancing my skills.</p>
                <p>Type <span class="highlight">skills</span> to see my technical skills or <span class="highlight">projects</span> to view my work.</p>
            `;
            break;
            
        case 'skills':
            responseDiv.innerHTML = `
                <h2>Skills</h2>
                <div class="skills-container">
                    <div class="skill-category">
                        <h3>Programming Languages</h3>
                        <ul>
                            <li>JavaScript (ES6+)</li>
                            <li>TypeScript</li>
                            <li>Python</li>
                            <li>Java</li>
                            <li>HTML5 & CSS3</li>
                            <li>SQL</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h3>Frontend</h3>
                        <ul>
                            <li>React.js</li>
                            <li>Next.js</li>
                            <li>Redux</li>
                            <li>Vue.js</li>
                            <li>Bootstrap</li>
                            <li>Tailwind CSS</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h3>Backend</h3>
                        <ul>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>Django</li>
                            <li>Spring Boot</li>
                            <li>RESTful APIs</li>
                            <li>GraphQL</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h3>Tools & Technologies</h3>
                        <ul>
                            <li>Git & GitHub</li>
                            <li>Docker</li>
                            <li>AWS</li>
                            <li>MongoDB</li>
                            <li>PostgreSQL</li>
                            <li>Jest & Testing Library</li>
                        </ul>
                    </div>
                </div>
            `;
            break;
            
        case 'projects':
            responseDiv.innerHTML = `
                <h2>Projects</h2>
                <div class="projects-container">
                    <div class="project-item">
                        <h3>Portfolio Terminal</h3>
                        <p>An interactive command-line style portfolio website.</p>
                        <p><strong>Tech:</strong> HTML, CSS, JavaScript</p>
                        <p><a href="#" class="link">View Project</a> | <a href="#" class="link">GitHub</a></p>
                    </div>
                    <div class="project-item">
                        <h3>E-Commerce Platform</h3>
                        <p>Full-stack e-commerce application with user authentication, product catalog, and payment processing.</p>
                        <p><strong>Tech:</strong> React, Node.js, Express, MongoDB</p>
                        <p><a href="#" class="link">View Project</a> | <a href="#" class="link">GitHub</a></p>
                    </div>
                    <div class="project-item">
                        <h3>AI Chat Assistant</h3>
                        <p>Intelligent chat application using natural language processing.</p>
                        <p><strong>Tech:</strong> Python, TensorFlow, Flask, React</p>
                        <p><a href="#" class="link">View Project</a> | <a href="#" class="link">GitHub</a></p>
                    </div>
                </div>
                <p>Type <span class="highlight">projects [name]</span> to get more details about a specific project.</p>
            `;
            break;
            
        case 'experience':
            responseDiv.innerHTML = `
                <h2>Work Experience</h2>
    
                <div class="experience-item">
                    <h3>Software Development Intern</h3>
                    <p><strong>Startup Inc.</strong> | Summer 2022</p>
                    <ul>
                        <li>Assisted in developing features for a web application</li>
                        <li>Fixed bugs and improved UI/UX</li>
                        <li>Learned about agile development methodologies</li>
                    </ul>
                </div>
                
            `;
            break;
            
        case 'education':
            responseDiv.innerHTML = `
                <h2>Education</h2>
                <div class="education-item">
                    <h3>Bachelor of Science in Computer Science</h3>
                    <p><strong>University Name</strong> | 2019 - 2023</p>
                    <p>Relevant coursework: Data Structures & Algorithms, Web Development, Database Systems, Artificial Intelligence</p>
                </div>
                <div class="education-item">
                    <h3>Certifications</h3>
                    <ul>
                        <li>AWS Certified Developer - Associate</li>
                        <li>React & Redux Professional Certification</li>
                        <li>Full Stack Web Development Bootcamp</li>
                    </ul>
                </div>
            `;
            break;
            
        case 'contact':
            responseDiv.innerHTML = `
                <h2>Contact Information</h2>
                <ul class="contact-list">
                    <li><i class="fas fa-envelope"></i> <a href="mailto:contact@omsingh.com" class="link">contact@omsingh.com</a></li>
                    <li><i class="fab fa-github"></i> <a href="https://github.com/omsingh" target="_blank" class="link">github.com/omsingh</a></li>
                    <li><i class="fab fa-linkedin"></i> <a href="https://linkedin.com/in/omsingh" target="_blank" class="link">linkedin.com/in/omsingh</a></li>
                    <li><i class="fas fa-globe"></i> <a href="https://omsingh.com" target="_blank" class="link">omsingh.com</a></li>
                </ul>
                <p>Feel free to reach out! I'm always open to new opportunities and collaborations.</p>
            `;
            break;
            
        case 'resume':
            responseDiv.innerHTML = `
                <p>You can download my resume using the link below:</p>
                <p><a href="resources/Om-Singh-Resume.pdf" download class="link"><i class="fas fa-file-download"></i> Download Resume</a></p>
            `;
            break;
            
        case 'clear':
            // Clear the command history
            commandHistory.innerHTML = '';
            // Clear input
            if (inputElement) {
                inputElement.textContent = '';
            }
            return; // Return early without adding response
            
        case 'theme':
            if (args[1] === 'light') {
                document.body.className = 'light-theme';
                responseDiv.innerHTML = `<p>Theme set to light mode.</p>`;
            } else if (args[1] === 'dark') {
                document.body.className = 'dark-theme';
                responseDiv.innerHTML = `<p>Theme set to dark mode.</p>`;
            } else {
                responseDiv.innerHTML = `
                    <p>Usage: theme [light|dark]</p>
                    <p>Current theme: ${document.body.classList.contains('light-theme') ? 'light' : 'dark'}</p>
                `;
            }
            break;
            
        case 'ascii':
            responseDiv.innerHTML = `
                <pre class="ascii-art">
  ___  __  __    ____ ___ _   _  ____ _   _ 
 / _ \\|  \\/  |  / ___|_ _| \\ | |/ ___| | | |
| | | | |\\/| |  \\___ \\| ||  \\| | |  _| |_| |
| |_| | |  | |   ___) | || |\\  | |_| |  _  |
 \\___/|_|  |_|  |____/___|_| \\_|\\____|_| |_|
                                                               
                </pre>
            `;
            break;
            
        default:
            responseDiv.innerHTML = `
                <p>Command not found: ${command}</p>
                <p>Type <span class="highlight">help</span> to see available commands.</p>
            `;
    }
    
    // Add response to terminal
    commandHistory.appendChild(responseDiv);
    
    // Clear input
    if (inputElement) {
        inputElement.textContent = '';
    }
    
    // Scroll to bottom
    if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}
