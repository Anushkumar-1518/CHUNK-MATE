Chunk-Mate
Chunk-Mate is a full-stack web app that allows users to upload .md (Markdown) files, automatically splits the content into chunks, and shows them in an easy-to-read layout.
✨ Features
* Upload .md files from your computer
* Automatically breaks the file into readable chunks (headings, paragraphs)
* View each chunk clearly in the browser
* Built with React frontend, Node.js backend, and MongoDB database
🧩 Project Setup
1. Frontend Setup
Go to the frontend folder:
cd chunk-mate-ui
Install dependencies:
npm install
Start the frontend:
npm run dev
The app will run at [http://localhost:5173](http://localhost:5173)
2. Backend Setup
Go to the backend folder:
cd chunk-mate-api
Install dependencies:
npm install
Start the backend server:
node server.js
The backend runs at [http://localhost:5000](http://localhost:5000)
3. Database Setup (MongoDB Atlas)
Step 1: Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and sign in
Step 2: Create a free cluster
Step 3: Create a database named: chunkmate
Step 4: Create a user with a username and password
Step 5: Whitelist your IP or allow access from anywhere (0.0.0.0/0)
Step 6: Copy your MongoDB connection string. It looks like this:
mongodb+srv://<username>:<password>@cluster0.mongodb.net/chunkmate?retryWrites=true\&w=majority
Step 7: In your server.js file, use this connection string in mongoose.connect()
Example:
mongoose.connect('your\_connection\_string\_here')
4. How Chunking Works
* The app reads the Markdown (.md) file line by line
* If a line starts with #, ##, ### etc., it's treated as a heading
* All the headings above a paragraph are remembered as “context”
* Paragraphs below the headings are saved as one chunk, along with their heading context
* Each chunk is saved in the MongoDB database with a chunk number and content
* Chunks are shown on the UI when the document is selected
✅ File Types Supported: Only .md files
🎯 Summary
* Upload Markdown files
* View each section chunk-by-chunk
* Simple UI and smooth backend integration
