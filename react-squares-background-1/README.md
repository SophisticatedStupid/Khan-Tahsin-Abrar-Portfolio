# React Squares Background

This project is a simple React application that showcases a grid of squares using a custom `Squares` component. The component allows for customization of various properties such as direction, speed, border color, square size, and hover fill color.

## Project Structure

```
react-squares-background
├── public
│   ├── index.html        # Main HTML file for the React application
│   └── favicon.ico       # Favicon for the application
├── src
│   ├── components
│   │   └── Squares.jsx   # Component that renders a grid of squares
│   ├── styles
│   │   └── App.css       # CSS styles for the application
│   ├── App.jsx           # Main application component
│   ├── index.js          # Entry point of the React application
│   └── setupTests.js     # Setup for testing configurations
├── package.json          # Configuration file for npm
├── .gitignore            # Specifies files to be ignored by Git
└── yarn.lock             # Locks the versions of dependencies
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd react-squares-background
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Run the application:**
   ```bash
   yarn start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

The `Squares` component can be customized by passing props to it in the `App.jsx` file. You can adjust the following properties:

- `direction`: The direction of the squares.
- `speed`: The speed of the animation.
- `borderColor`: The color of the square borders.
- `squareSize`: The size of each square.
- `hoverFillColor`: The color that fills the square on hover.
- `className`: Additional class names for styling.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.