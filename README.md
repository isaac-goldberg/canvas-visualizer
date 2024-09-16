# Canvas Visualizer

Designed for visualizing your code's output to Canvas, either for the Node.js `node-canvas` package, or for the browser HTML/JS Canvas API.

- The canvas will immediately update as soon as possible as you type your code (e.g. while you're in the midst of typing, that would cause an error to render, so it waits until there isn't an error and then updates).
- The `canvas` and `context` variables are already defined in the scope of your script. To change the width or height of the canvas, use the input boxes provided.
- The asynchronous `loadImage()` function, part of the Node.js canvas package, is also already defined for you.
- Your code will be wrapped in an async function, so you may use the `await` keyword. The code editor will say there's an error, but you can ignore it.
- Async calls, such as `await loadImage()`, sometimes don't render at all because the call was still pending when the canvas was drawn. Click on the "Refresh Canvas" button to see if that fixes it.
- If the canvas doesn't update due to errors in your code, check the developer console in your browser to view error logs.

Created by Isaac Goldberg.
