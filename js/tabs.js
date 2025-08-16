// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const commandHistory = document.getElementById('command-history');
    const commandInput = document.getElementById('command-input');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Add a little animation effect to the terminal
            const terminal = document.querySelector('.terminal');
            terminal.style.transform = 'scale(0.98)';
            setTimeout(() => {
                terminal.style.transform = 'scale(1)';
            }, 200);
            
            // Change terminal content based on tab
            const tabTitle = this.textContent;
            const terminalTitle = document.querySelector('.terminal-title');
            terminalTitle.textContent = `omsingh@portfolio: ~/${tabTitle}`;
            
            // Show specific content based on tab
            if (tabTitle === 'projects.js') {
                // Clear existing content and show projects
                clearTerminalContent();
                displayProjects();
            } else if (tabTitle === 'skills.py') {
                // Clear existing content and show skills
                clearTerminalContent();
                displaySkills();
            } else if (tabTitle === 'contact.md') {
                // Clear existing content and show contact info
                clearTerminalContent();
                displayContact();
            } else {
                // For main.sh, just clear and show welcome message
                clearTerminalContent();
                displayWelcome();
            }
        });
    });
    
    // Function to clear terminal content
    function clearTerminalContent() {
        // Clear command history but keep the welcome line at the top
        commandHistory.innerHTML = '';
        
        // Also clear the command input
        if (commandInput) {
            commandInput.textContent = '';
        }
    }
    
    // Function to display projects
    function displayProjects() {
        const projectsContent = document.createElement('div');
        projectsContent.classList.add('line', 'response');
        projectsContent.innerHTML = `
        <h3 class="highlight">Projects</h3>
        <div class="project-item">
            <p class="project-title">MeetDesk - Team Collaboration App</p>
            <p>A collaborative platform designed for team productivity and communication.</p>
            <p>Features: Chat functionality, task boards, scheduling tools, real-time synchronization, notifications.</p>
            <p>Tech: Flutter, Firebase Authentication, Cloud Firestore</p>
            <p><span class="link" onclick="window.open('https://github.com/omsingh10/meetdesk-app', '_blank')">GitHub</span></p>
        </div>
        <div class="project-item">
            <p class="project-title">Web Music Player with AI Chatbot</p>
            <p>Music player application with integrated AI chatbot for enhanced user experience.</p>
            <p>Features: Music playback controls, playlist management, AI-powered song recommendations.</p>
            <p>Tech: Python, Django, SQL, AI/ML Libraries</p>
            <p><span class="link" onclick="window.open('https://github.com/omsingh10/music-ai-app', '_blank')">GitHub</span></p>
        </div>
        <div class="project-item">
            <p class="project-title">BMI Health Calculator</p>
            <p>A mobile application that calculates BMI and provides health recommendations.</p>
            <p>Features: BMI calculation, categorized health results, personalized recommendations.</p>
            <p>Tech: Flutter, Dart, Firebase</p>
            <p><span class="link" onclick="window.open('https://github.com/omsingh10/bmi-calculator', '_blank')">GitHub</span></p>
        </div>
        <div class="project-item">
            <p class="project-title">Student Management System</p>
            <p>A comprehensive system for educational institutions to manage student records.</p>
            <p>Features: Record management, attendance tracking, admin and faculty dashboards.</p>
            <p>Tech: Java, Spring Boot, MySQL</p>
            <p><span class="link" onclick="window.open('https://github.com/omsingh10/student-management', '_blank')">GitHub</span></p>
        </div>`;
        commandHistory.appendChild(projectsContent);
    }
    
    // Function to display contact information
    function displayContact() {
        const contactContent = document.createElement('div');
        contactContent.classList.add('line', 'response');
        contactContent.innerHTML = `
        <h3 class="highlight">Contact Information</h3>
        <div class="contact-container">
            <div class="contact-item">
                <p><i class="fas fa-envelope"></i> Email</p>
                <p><a href="mailto:contact@om59singh@gmail.com" class="link">contact@om59singh@gmail.com</a></p>
            </div>
            <div class="contact-item">
                <p><i class="fab fa-github"></i> GitHub</p>
                <p><a href="https://github.com/omsingh10" target="_blank" class="link">github.com/omsingh10</a></p>
            </div>
            <div class="contact-item">
                <p><i class="fab fa-linkedin"></i> LinkedIn</p>
                <p><a href="https://linkedin.com/in/om10singh" target="_blank" class="link">linkedin.com/in/om10singh</a></p>
            </div>
            <div class="contact-item">
                <p><i class="fas fa-phone"></i> Phone</p>
                <p>+91 8788493707</p>
            </div>
            <div class="contact-item">
                <p><i class="fas fa-map-marker-alt"></i> Location</p>
                <p>mumbai, India</p>
            </div>
        </div>
        <div class="contact-form">
            <h4>Send me a message</h4>
            <p>Feel free to reach out for opportunities, collaborations, or just to say hello!</p>
            <div class="form-simulation">
                <p><span class="prompt">$</span> echo "Your message has been sent! I'll get back to you soon."</p>
            </div>
        </div>
        `;
        commandHistory.appendChild(contactContent);
    }
    
    // Function to display skills
    function displaySkills() {
        const skillsContent = document.createElement('div');
        skillsContent.classList.add('line', 'response');
        skillsContent.innerHTML = `
        <h3 class="highlight">Technical Skills</h3>
        <table>
            <tr>
                <th>Category</th>
                <th>Skills</th>
            </tr>
            <tr>
                <td>Programming Languages</td>
                <td>Java, Python, C, C++, JavaScript, Dart, HTML, CSS</td>
            </tr>
            <tr>
                <td>Frontend</td>
                <td>Flutter, React, HTML5, CSS3</td>
            </tr>
            <tr>
                <td>Backend</td>
                <td>Spring Boot, Node.js, Django</td>
            </tr>
            <tr>
                <td>Databases</td>
                <td>MySQL, Firebase</td>
            </tr>
            <tr>
                <td>Version Control</td>
                <td>Git, GitHub</td>
            </tr>
            <tr>
                <td>Tools</td>
                <td>VS Code, IntelliJ, Android Studio, Postman</td>
            </tr>
            <tr>
                <td>Core Competencies</td>
                <td>SDLC, Agile Methodology, Debugging, Problem-Solving, System Design</td>
            </tr>
        </table>`;
        commandHistory.appendChild(skillsContent);
    }






























    
    
//     // Function to display welcome message
//     function displayWelcome() {
//         const welcomeContent = document.createElement('div');
//         welcomeContent.classList.add('line', 'response');
//         welcomeContent.innerHTML = `
//         <pre class="ascii-art" data-text="HACKER">
//   ___  __  __    ____ ___ _   _  ____ _   _ 
//  / _ \\|  \\/  |  / ___|_ _| \\ | |/ ___| | | |
// | | | | |\\/| |  \\___ \\| ||  \\| | |  _| |_| |
// | |_| | |  | |   ___) | || |\\  | |_| |  _  |
//  \\___/|_|  |_|  |____/___|_| \\_|\\____|_| |_|
                                                                
//         </pre>
//         <p>Welcome to my interactive portfolio terminal.</p>
//         <p>Type <span class="highlight">help</span> to see available commands.</p>`;
//         commandHistory.appendChild(welcomeContent);
//     }
    
    // Terminal button effects
    const closeButton = document.querySelector('.terminal-button.close');
    const minimizeButton = document.querySelector('.terminal-button.minimize');
    const maximizeButton = document.querySelector('.terminal-button.maximize');
    const terminal = document.querySelector('.terminal');
    
    closeButton.addEventListener('click', function() {
        terminal.style.transform = 'scale(0.95)';
        terminal.style.opacity = '0';
        setTimeout(() => {
            alert('Thanks for visiting Om Singh\'s portfolio terminal!');
            terminal.style.transform = 'scale(1)';
            terminal.style.opacity = '1';
        }, 500);
    });
    
    minimizeButton.addEventListener('click', function() {
        terminal.style.transform = 'translateY(5px) scale(0.98)';
        setTimeout(() => {
            terminal.style.transform = 'translateY(0) scale(1)';
        }, 300);
    });
    
    // Fixed maximize button implementation
    maximizeButton.addEventListener('click', function() {
        // Create a container div for the maximized state if it doesn't exist
        let maximizedContainer = document.getElementById('maximized-terminal-container');
        
        if (terminal.classList.contains('maximized')) {
            // Restore to normal
            terminal.classList.remove('maximized');
            document.body.classList.remove('terminal-maximized');
            terminal.style.width = '';
            terminal.style.height = '';
            terminal.style.position = '';
            terminal.style.top = '';
            terminal.style.left = '';
            terminal.style.right = '';
            terminal.style.bottom = '';
            terminal.style.zIndex = '';
            terminal.style.borderRadius = '';
            
            // Focus the command input
            setTimeout(() => {
                const commandInput = document.getElementById('command-input');
                if (commandInput) {
                    commandInput.focus();
                }
            }, 100);
        } else {
            // Maximize
            terminal.classList.add('maximized');
            document.body.classList.add('terminal-maximized');
            
            // Full dimensions
            terminal.style.position = 'fixed';
            terminal.style.top = '0';
            terminal.style.left = '0';
            terminal.style.right = '0';
            terminal.style.bottom = '0';
            terminal.style.width = '100vw';
            terminal.style.height = '100vh';
            terminal.style.zIndex = '9999';
            terminal.style.borderRadius = '0';
            
            // Focus the command input
            setTimeout(() => {
                const commandInput = document.getElementById('command-input');
                if (commandInput) {
                    commandInput.focus();
                }
            }, 100);
        }
    });
    
    // Terminal options
    const optionButtons = document.querySelectorAll('.terminal-options span');
    const settingsButton = optionButtons[0]; // The gear icon
    const expandButton = optionButtons[1]; // The expand icon
    
    // Settings button - show theme options
    settingsButton.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        // Create and show the theme selection popup
        const themePopup = document.createElement('div');
        themePopup.classList.add('theme-popup');
        themePopup.innerHTML = `
            <div class="theme-option light" data-theme="light">space Mode</div>
            <div class="theme-option dark active" data-theme="dark">normal Mode</div>
        `;
        
        // Position the popup near the settings button
        const rect = settingsButton.getBoundingClientRect();
        themePopup.style.top = (rect.bottom + 5) + 'px';
        themePopup.style.right = (window.innerWidth - rect.right) + 'px';
        
        // Add the popup to the body
        document.body.appendChild(themePopup);
        
        // Handle theme selection
        const themeOptions = themePopup.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                document.body.className = ''; // Clear existing themes
                document.body.classList.add(theme + '-theme');
                
                // Update active state
                themeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Save theme preference
                localStorage.setItem('portfolio-theme', theme);
                
                // Remove popup after selection
                setTimeout(() => {
                    document.body.removeChild(themePopup);
                }, 300);
            });
        });
        
        // Close popup when clicking elsewhere
        document.addEventListener('click', function closePopup(e) {
            if (!themePopup.contains(e.target) && e.target !== settingsButton) {
                if (document.body.contains(themePopup)) {
                    document.body.removeChild(themePopup);
                }
                document.removeEventListener('click', closePopup);
            }
        });
    });
    
    // Expand button - toggle fullscreen
    expandButton.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        // Toggle maximized class for better compatibility
        if (terminal.classList.contains('maximized')) {
            terminal.classList.remove('maximized');
            terminal.style.width = '';
            terminal.style.height = '';
            document.body.style.overflow = '';
        } else {
            terminal.classList.add('maximized');
            terminal.style.width = '100%';
            terminal.style.height = '100vh';
            document.body.style.overflow = 'hidden';
        }
        
        // Focus the input after resizing
        setTimeout(() => {
            if (commandInput) {
                commandInput.focus();
                setEndOfContenteditable(commandInput);
            }
        }, 300);
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.body.className = '';
        document.body.classList.add(savedTheme + '-theme');
    } else {
        // Default to dark theme
        document.body.classList.add('dark-theme');
    }
});
