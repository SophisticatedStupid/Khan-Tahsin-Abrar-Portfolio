// Squares background effect for hero/introduction
export default class SquaresBG {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign({
            speed: 0.5,
            squareSize: 40,
            direction: 'diagonal',
            borderColor: '#999',
            hoverFillColor: '#222',
            gridColor: 'rgba(255,255,255,0.04)'
        }, options);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        this.gridOffset = { x: 0, y: 0 };
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }
    resizeCanvas() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    drawGrid() {
        const { squareSize, borderColor, gridColor } = this.options;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Background gradient
        const grad = ctx.createRadialGradient(
            this.canvas.width/2, this.canvas.height/2, 0,
            this.canvas.width/2, this.canvas.height/2, Math.max(this.canvas.width, this.canvas.height)/1.2
        );
        grad.addColorStop(0, 'rgba(0,255,255,0.08)');
        grad.addColorStop(1, 'rgba(0,0,0,0.1)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw squares
        ctx.strokeStyle = borderColor;
        ctx.globalAlpha = 0.18;
        for (let y = 0; y < this.canvas.height; y += squareSize) {
            for (let x = 0; x < this.canvas.width; x += squareSize) {
                ctx.strokeRect(
                    x + this.gridOffset.x % squareSize,
                    y + this.gridOffset.y % squareSize,
                    squareSize, squareSize
                );
            }
        }
        ctx.globalAlpha = 1;
    }
    animate() {
        // Animate grid offset
        const { speed, direction, squareSize } = this.options;
        if (direction === 'diagonal') {
            this.gridOffset.x += speed;
            this.gridOffset.y += speed;
        } else if (direction === 'right') {
            this.gridOffset.x += speed;
        } else if (direction === 'down') {
            this.gridOffset.y += speed;
        }
        this.drawGrid();
        requestAnimationFrame(this.animate);
    }
}
