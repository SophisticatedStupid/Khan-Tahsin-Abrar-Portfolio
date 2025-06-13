# Khan-Tahsin-Abrar-Portfolio
diff --git a/README.md b/README.md
index 72775914b9d19b0cec6fd71ba1947a7c1ef0531e..8a8cf563bf5621b20041cf343210454dc8178296 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,31 @@
-# Khan-Tahsin-Abrar-Portfolio
+# Khan Tahsin Abrar - Portfolio
+
+This repository contains the source code for my personal portfolio website built with **Hugo**.
+
+## Requirements
+- [Hugo](https://gohugo.io/) extended version
+- Node.js (optional, only needed if you want to run the React demo in `react-squares-background`)
+
+## Running the Hugo site
+1. Install the extended version of Hugo.
+2. In the repository root, run:
+   ```bash
+   hugo server -D
+   ```
+3. Open <http://localhost:1313/> in your browser.
+
+The `-D` flag includes any draft content while testing locally.
+
+## React Squares Demo
+A small React demo lives in the `react-squares-background` folder. To run it:
+1. Navigate to the directory:
+   ```bash
+   cd react-squares-background
+   ```
+2. Install dependencies and start the development server:
+   ```bash
+   yarn install
+   yarn start
+   ```
+3. Visit <http://localhost:3000> to see the demo.
+
