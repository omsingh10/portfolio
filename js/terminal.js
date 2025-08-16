// Terminal functionality
document.addEventListener('DOMContentLoaded', function() {
    const commandInput = document.getElementById('command-input');
    const terminalBody = document.getElementById('terminal-body');
    const commandHistory = document.getElementById('command-history');
    
    // Add typing effect to the welcome message
    const typedText = document.querySelector('.typed-text');
    const textToType = typedText.textContent;
    typedText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < textToType.length) {
            typedText.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
    
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
    
    // Position cursor at end when clicked
    commandInput.addEventListener('click', function() {
        setEndOfContenteditable(this);
    });
    
    // Set focus to command input when clicking anywhere in the terminal
    document.querySelector('.terminal').addEventListener('click', function(e) {
        // Don't focus if clicking on links, tabs, or theme options
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
    
    // Focus on load and make cursor visible
    window.addEventListener('load', function() {
        commandInput.focus();
        setEndOfContenteditable(commandInput);
        
        // Make sure the cursor is visible
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.display = 'inline-block';
        }
    });

    // Command history navigation
    let commandHistoryList = [];
    let historyIndex = -1;
    
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.textContent.trim();
            
            if (command) {
                // Add to history
                commandHistoryList.push(command);
                historyIndex = commandHistoryList.length;
                
                // Create command line in history
                const commandLine = document.createElement('div');
                commandLine.classList.add('line');
                commandLine.innerHTML = `<span class="prompt">omsingh@portfolio:~$</span> <span class="command-text"></span>`;
                commandHistory.appendChild(commandLine);
                
                // Add typing effect to the command
                const commandTextElement = commandLine.querySelector('.command-text');
                let i = 0;
                function typeCommand() {
                    if (i < command.length) {
                        commandTextElement.textContent += command.charAt(i);
                        i++;
                        setTimeout(typeCommand, 25);
                    } else {
                        // Process command after typing effect completes
                        processCommand(command);
                    }
                }
                typeCommand();
                
                // Clear input
                this.textContent = '';
            }
            
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.textContent = commandHistoryList[historyIndex];
                setEndOfContenteditable(this);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistoryList.length - 1) {
                historyIndex++;
                this.textContent = commandHistoryList[historyIndex];
            } else {
                historyIndex = commandHistoryList.length;
                this.textContent = '';
            }
            setEndOfContenteditable(this);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const partialCommand = this.textContent.trim();
            autocompleteCommand(partialCommand);
        }
    });

    // Auto focus on input when page loads
    window.addEventListener('load', function() {
        commandInput.focus();
    });

    function processCommand(command) {
        const response = document.createElement('div');
        response.classList.add('line', 'response');
        
        // Convert command to lowercase for case insensitivity
        const cmd = command.toLowerCase();
        
        // Command processing
        switch(cmd) {
            case 'help':
                response.innerHTML = `
                <p>Available commands:</p>
                <table>
                    <tr><td class="highlight">about</td><td>Learn about me</td></tr>
                    <tr><td class="highlight">skills</td><td>My technical skills</td></tr>
                    <tr><td class="highlight">experience</td><td>My work experience</td></tr>
                    <tr><td class="highlight">education</td><td>My educational background</td></tr>
                    <tr><td class="highlight">projects</td><td>View my projects</td></tr>
                    <tr><td class="highlight">achievements</td><td>My accomplishments</td></tr>
                    <tr><td class="highlight">contact</td><td>How to reach me</td></tr>
                    <tr><td class="highlight">social</td><td>My social media profiles</td></tr>
                    <tr><td class="highlight">resume</td><td>View my resume</td></tr>
                    <tr><td class="highlight">clear</td><td>Clear the terminal</td></tr>
                    <tr><td class="highlight">help</td><td>Show this help message</td></tr>
                </table>
                <p>Type any command to continue...</p>`;
                break;
                
            case 'about':
                response.innerHTML = `
                <h3 class="highlight">About Me</h3>
                <p>Hello! I'm Om Singh, a passionate Full-Stack & Flutter Developer currently pursuing B.E. in Computer Engineering at St. John College of Engineering and Management.</p>
                <p>I specialize in developing scalable, high-performance applications using Java, Spring Boot, Flutter, and Firebase.</p>
                <p>My goal is to craft efficient, user-friendly software solutions with clean, maintainable code.</p>
                <p>I have a strong understanding of SDLC, agile methodologies, and I excel in collaborative team environments.</p>
                <p>I am dedicated to continuous learning and staying updated with the latest industry trends and best practices.</p>`;
                break;
                
            case 'skills':
                response.innerHTML = `
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
                break;
                
            case 'experience':
                response.innerHTML = `
                <h3 class="highlight">Work Experience</h3>
                <div class="experience-item">
                    <p><span class="highlight">Flutter Developer Intern</span> | DeveloperWala</p>
                    <p>January 2025 - June 2025 (6 months)</p>
                    <ul>
                        <li>Developed and maintained cross-platform mobile applications using Flutter and Dart</li>
                        <li>Implemented Firebase Authentication, Cloud Firestore, and real-time database features</li>
                        <li>Collaborated with UI/UX designers to implement responsive and user-friendly interfaces</li>
                        <li>Participated in code reviews and implemented best practices for mobile app development</li>
                        <li>Optimized application performance through efficient state management</li>
                    </ul>
                </div>
                <div class="experience-item">
                    <p><span class="highlight">Virtual Internship</span> | Walmart USA (Forage)</p>
                    <p>February 2025</p>
                    <ul>
                        <li>Designed Entity Relationship Diagrams (ERDs) and UML diagrams for logistics tracking systems</li>
                        <li>Implemented custom heap data structure in Java for supply chain optimization problems</li>
                        <li>Gained practical experience in enterprise-level system design</li>
                    </ul>
                </div>
                <div class="experience-item">
                    <p><span class="highlight">Google Cloud Seminar</span> | Mumbai</p>
                    <p>June 2025</p>
                    <ul>
                        <li>Hands-on experience with Vertex AI, Firebase, and Gemma Models</li>
                        <li>Learned cloud infrastructure and deployment strategies for scalable applications</li>
                    </ul>
                </div>`;
                break;
                
            case 'education':
                response.innerHTML = `
                <h3 class="highlight">Education</h3>
                <div class="education-item">
                    <p><span class="highlight">B.E. in Computer Engineering</span></p>
                    <p>St. John College of Engineering and Management, Palghar | 2022 - 2026 (Pursuing)</p>
                    <p>CGPA: 6.5</p>
                </div>
                <div class="education-item">
                    <p><span class="highlight">Higher Secondary Education (Science)</span></p>
                    <p>Tarapur Vidya Mandir Jr. College, Boisar | 2020 - 2022</p>
                    <p>Percentage: 50%</p>
                </div>
                <div class="education-item">
                    <p><span class="highlight">Secondary School Education</span></p>
                    <p>Mumbai Public School, Boisar | 2019 - 2020</p>
                    <p>Percentage: 70%</p>
                </div>
                <div class="education-item">
                    <p><span class="highlight">Certifications</span></p>
                    <ul>
                        <li>Full Stack MERN Development - Infosys (2024)</li>
                        <li>Flutter Development - Rigle Engineering (2024)</li>
                        <li>Basics of Android App Development (Java) - Udemy (2024)</li>
                        <li>MERN Bootcamp - Rigle Infotech (2024)</li>
                        <li>Computer Networks - Infosys Springboard (2024)</li>
                    </ul>
                </div>`;
                break;
                
            case 'projects':
                response.innerHTML = `
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
                break;
                
            case 'achievements':
                response.innerHTML = `
                <h3 class="highlight">Achievements</h3>
                <ul>
                    <li>GitHub 50 Days Badge (2024)</li>
                    <li>Pull Shark Badge for PR submissions</li>
                    <li>Led multiple team projects, managing task distribution</li>
                    <li>Successfully completed 6-month internship at DeveloperWala</li>
                    <li>Developed 4+ full-featured applications with Flutter and Spring Boot</li>
                </ul>`;
                break;
                
            case 'contact':
                response.innerHTML = `
                <h3 class="highlight">Contact Information</h3>
                <table>
                    <tr>
                        <td>Email:</td>
                        <td><a href="mailto:om59singh@gmail.com" class="link">om59singh@gmail.com</a></td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td>+91-8788493707</td>
                    </tr>
                    <tr>
                        <td>Location:</td>
                        <td>Boisar, Maharashtra, India</td>
                    </tr>
                    <tr>
                        <td>Languages:</td>
                        <td>English (Advanced), Hindi (Advanced), Marathi (Intermediate)</td>
                    </tr>
                </table>
                <p>Feel free to reach out for collaboration or opportunities!</p>`;
                break;
                
            case 'social':
                response.innerHTML = `
                <h3 class="highlight">Social Media</h3>
                <table>
                    <tr>
                        <td><i class="fab fa-linkedin"></i> LinkedIn:</td>
                        <td><a href="https://www.linkedin.com/in/om10singh" target="_blank" class="link">linkedin.com/in/om10singh</a></td>
                    </tr>
                    <tr>
                        <td><i class="fab fa-github"></i> GitHub:</td>
                        <td><a href="https://github.com/omsingh10" target="_blank" class="link">github.com/omsingh10</a></td>
                    </tr>
                </table>
                <div class="achievement-section">
                    <h4 class="highlight">GitHub Achievements</h4>
                    <ul>
                        <li>GitHub 50 Days Badge (2024)</li>
                        <li>Pull Shark Badge for PR submissions</li>
                    </ul>
                </div>`;
                break;
                
            case 'resume':
                response.innerHTML = `
                <h3 class="highlight">Resume</h3>
                <p>You can view or download my resume in PDF format:</p>
                <p><a href="omsingh-resume.pdf" target="_blank" class="link">View Resume</a> | 
                <a href="omsingh-resume.pdf" download class="link">Download Resume</a></p>`;
                break;
                
            case 'clear':
                clearTerminal();
                return;
                
            case 'ls':
                response.innerHTML = `
                <p>about.txt</p>
                <p>skills.md</p>
                <p>experience.log</p>
                <p>projects/</p>
                <p>contact.json</p>
                <p>resume.pdf</p>`;
                break;
                
            case 'whoami':
                response.innerHTML = `<p>Om Singh - Full-Stack & Flutter Developer</p>`;
                break;
                
            case 'date':
                response.innerHTML = `<p>${new Date().toDateString()}</p>`;
                break;
                
            case 'time':
                response.innerHTML = `<p>${new Date().toLocaleTimeString()}</p>`;
                break;
                
            default:
                response.innerHTML = `<p class="error">Command not found: ${command}</p><p>Type <span class="highlight">help</span> to see available commands.</p>`;
        }
        
        commandHistory.appendChild(response);
    }
    
    function clearTerminal() {
        // Keep only the welcome message
        const welcomeMessage = commandHistory.innerHTML.split('<div class="line">')[0];
        commandHistory.innerHTML = '';
        historyIndex = -1;
        commandHistoryList = [];
    }
    
    function setEndOfContenteditable(contentEditableElement) {
        let range, selection;
        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(contentEditableElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    
    function autocompleteCommand(partial) {
        const commands = [
            'help', 'about', 'skills', 'experience', 'education',
            'projects', 'achievements', 'contact', 'social', 'resume', 'clear'
        ];
        
        const matches = commands.filter(cmd => cmd.startsWith(partial));
        
        if (matches.length === 1) {
            // If only one match, autocomplete it
            commandInput.textContent = matches[0];
            setEndOfContenteditable(commandInput);
        } else if (matches.length > 1) {
            // If multiple matches, show them
            const response = document.createElement('div');
            response.classList.add('line', 'response');
            response.innerHTML = `<p>Possible commands: ${matches.join(', ')}</p>`;
            commandHistory.appendChild(response);
        }
    }

    // Start with focus on input
    commandInput.focus();
});
