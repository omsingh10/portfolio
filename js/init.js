// Initialize everything properly
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme or dark theme by default
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    if (!document.body.classList.contains('light-theme') && !document.body.classList.contains('dark-theme')) {
        document.body.classList.add(savedTheme + '-theme');
    }
    
    // Make sure command input is always focused when window is active
    window.addEventListener('focus', function() {
        const commandInput = document.getElementById('command-input');
        if (commandInput) {
            commandInput.focus();
            // Position cursor at end of content
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(commandInput);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
    
    // Make sure tabs are clickable with higher specificity
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.style.position = 'relative';
        tab.style.pointerEvents = 'auto';
        tab.style.zIndex = '1000';
        tab.style.cursor = 'pointer';
    });
    
    // Make settings and expand buttons work properly
    const settingsButton = document.querySelector('.terminal-options span:first-child');
    const expandButton = document.querySelector('.terminal-options span:last-child');
    
    if (settingsButton && expandButton) {
        settingsButton.style.position = 'relative';
        expandButton.style.position = 'relative';
        settingsButton.style.cursor = 'pointer';
        expandButton.style.cursor = 'pointer';
        settingsButton.style.zIndex = '1000';
        expandButton.style.zIndex = '1000';
        
        // Make icons more visible
        const settingsIcon = settingsButton.querySelector('i');
        const expandIcon = expandButton.querySelector('i');
        
        if (settingsIcon) settingsIcon.style.pointerEvents = 'none';
        if (expandIcon) expandIcon.style.pointerEvents = 'none';
    }
    
    // Fix terminal body click handling
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
        terminalBody.style.cursor = 'text';
    }
    
    // Ensure command input is working
    const commandInput = document.getElementById('command-input');
    if (commandInput) {
        // Make sure contentEditable is set
        commandInput.setAttribute('contenteditable', 'true');
        commandInput.style.minWidth = '4px';
        commandInput.style.minHeight = '16px';
    }
    
    // Initial focus on page load with retry
    function focusCommandInput() {
        const commandInput = document.getElementById('command-input');
        if (commandInput) {
            commandInput.focus();
            
            try {
                // Position cursor at end
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(commandInput);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            } catch (e) {
                console.error('Error setting cursor position:', e);
            }
            
            // Create cursor effect
            const cursorElement = document.querySelector('.cursor');
            if (cursorElement) {
                cursorElement.style.display = 'inline-block';
            }
        } else {
            // Retry if command input not found yet
            setTimeout(focusCommandInput, 100);
        }
    }
    
    // Initial focus with delay to ensure DOM is ready
    setTimeout(focusCommandInput, 500);
    
    // Debug output to console
    console.log('Terminal portfolio initialized');
    
    // Extra fix for terminal input
    (function fixCommandInput() {
        const commandInput = document.getElementById('command-input');
        
        if (commandInput) {
            // Make absolutely sure it's editable
            commandInput.setAttribute('contenteditable', 'true');
            commandInput.style.minWidth = '8px';
            commandInput.style.minHeight = '16px';
            commandInput.style.display = 'inline-block';
            
            // Focus it
            commandInput.focus();
            
            // Set cursor at end
            try {
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(commandInput);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            } catch (e) {
                console.error('Error setting cursor position:', e);
            }
            
            // Make sure Enter key handler is attached
            commandInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const command = this.textContent.trim();
                    
                    if (command) {
                        // Try to use the fixed process command function first
                        if (typeof processCommandFixed === 'function') {
                            processCommandFixed(command, this);
                        } else if (typeof processCommand === 'function') {
                            processCommand(command);
                        } else {
                            console.error('No command processing function found');
                            // Create a fallback processing
                            const commandHistory = document.getElementById('command-history');
                            if (commandHistory) {
                                const cmdLine = document.createElement('div');
                                cmdLine.classList.add('line');
                                cmdLine.innerHTML = `<span class="prompt">omsingh@portfolio:~$</span> <span class="command-text">${command}</span>`;
                                commandHistory.appendChild(cmdLine);
                                
                                // Basic response
                                const responseDiv = document.createElement('div');
                                responseDiv.classList.add('line', 'response');
                                if (command.toLowerCase() === 'help') {
                                    responseDiv.innerHTML = `
                                        <p>Available commands:</p>
                                        <ul>
                                            <li><span class="highlight">about</span> - About me</li>
                                            <li><span class="highlight">skills</span> - My technical skills</li>
                                            <li><span class="highlight">projects</span> - View my projects</li>
                                            <li><span class="highlight">experience</span> - My work experience</li>
                                            <li><span class="highlight">education</span> - My educational background</li>
                                            <li><span class="highlight">contact</span> - Contact information</li>
                                            <li><span class="highlight">clear</span> - Clear the terminal</li>
                                            <li><span class="highlight">help</span> - Show this help message</li>
                                        </ul>
                                    `;
                                } else {
                                    responseDiv.innerHTML = `<p>Command processing is being fixed. Try again soon.</p>`;
                                }
                                commandHistory.appendChild(responseDiv);
                            }
                        }
                        // Clear input regardless
                        this.textContent = '';
                    }
                    // Scroll to bottom
                    const terminalBody = document.getElementById('terminal-body');
                    if (terminalBody) {
                        terminalBody.scrollTop = terminalBody.scrollHeight;
                    }
                }
            });
        } else {
            // Try again if not found
            setTimeout(fixCommandInput, 200);
        }
    })();
    console.log('Command input element:', document.getElementById('command-input'));
    console.log('Terminal body element:', document.getElementById('terminal-body'));
});
