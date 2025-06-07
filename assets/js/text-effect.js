export default class TextEffect {
    constructor() {
        const content = `import { Portfolio } from "./life";
class KhanTahsinAbrar extends Developer {
    constructor() {
        super();
        this.name = "Khan Tahsin Abrar";
        this.role = "AI & Innovation Architect";
        this.focus = ["AI", "Graphics", "Game Dev with UE5", "Robust Python Scripting", "Dynamic Web Development", "Crucial CyberSecurity Practices"];
    }
    
    architectInnovation() {
        return this.focus.map(domain => {
            return \`Building next wave of \${domain}\`;
        });
    }
}`;
        this.createCodeBlock(content);
    }

    createCodeBlock(content) {
        // Create container
        const container = document.createElement('div');
        container.className = 'code-container';
        container.style.cssText = `
            background: #0e131c;
            border-radius: 8px;
            padding: 16px 0;
            margin: 20px 0;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            line-height: 1.5;
            position: relative;
            overflow-x: auto;
        `;

        // Line numbers column
        const lineNumbers = document.createElement('div');
        lineNumbers.style.cssText = `
            position: absolute;
            left: 0;
            top: 16px;
            width: 40px;
            text-align: right;
            padding-right: 8px;
            color: #6272a4;
            user-select: none;
            border-right: 1px solid #1d2433;
        `;

        // Code content as a single HTML string
        const codeContent = document.createElement('pre');
        codeContent.style.cssText = `
            margin: 0;
            padding-left: 50px;
            color: #f8f8f2;
        `;
        const lines = content.split('\n');
        let codeHTML = '';
        lines.forEach((line, i) => {
            // Add line number
            const lineNum = document.createElement('div');
            lineNum.textContent = i + 1;
            lineNumbers.appendChild(lineNum);
            // Add code line (with <br>)
            codeHTML += this.processLine(line) + '<br>';
        });
        // Use <code> for proper highlighting
        const codeElem = document.createElement('code');
        codeElem.innerHTML = codeHTML;
        codeContent.appendChild(codeElem);

        container.appendChild(lineNumbers);
        container.appendChild(codeContent);

        // Insert at the top of the content
        const mainContent = document.querySelector('.site-content');
        if (mainContent) {
            mainContent.insertBefore(container, mainContent.firstChild);
        }
    }

    processLine(line) {
        return line
            // Keywords
            .replace(/(import|from|class|extends|constructor|super|return|const|this)\b/g, '<span class="code-keyword">$1</span>')
            // Class names
            .replace(/\b(Portfolio|Developer|KhanTahsinAbrar)\b/g, '<span class="code-class">$1</span>')
            // Property access
            .replace(/\.(map|name|role|focus)\b/g, '.<span class="code-prop">$1</span>')
            // Strings and arrays
            .replace(/"([^"\n]+)"/g, '<span class="code-string">"$1"</span>')
            .replace(/\[(([^,\]]+,?\s*)+)\]/g, (match, contents) => {
                const coloredContents = contents.split(',').map(item => 
                    `<span class="code-string">${item.trim()}</span>`
                ).join(',');
                return `[${coloredContents}]`;
            })
            // Template literals
            .replace(/\`([^\`]+)\`/g, (match, content) => {
                return '<span class="code-string">`' + 
                    content.replace(/\${([^}]+)}/g, '<span class="code-template">${$1}</span>') +
                    '`</span>';
            });
    }
}
