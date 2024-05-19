# Mini chat bot for customer counselling


Connection to the server is made via the WebSocket protocol. The chat is written in React.js. 
Redux Toolkit is used for the application state. Asynchronous requests are managed via Async Thunk.

Markdown markup can come from the server and to manage it the library: react-markdown is used.
It is also possible to change the size of the chat window on the site, for this purpose the library: react-resizable-layout is used.

Use the command to start the project: `npm start`.

To build a chatroom in production, use the command: `npm run build`.
After that you need to embed a link to the site to connect scripts and styles in the `head` block:

```html
<link rel="stylesheet" href="/assets/main.css">
<script defer src="/assets/main.js"></script>
```

To mark up the chat on the page, create a block with the 'root' id in the body:

```html
<body>
  <div id="root"></div>
</body
