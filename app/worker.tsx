import { Hono } from "hono";

const app = new Hono();

// Root route
app.get("/", (c) => {
  return c.html(
    <html>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
  );
});

// Default route - return 404 for any other path
app.all("*", (c) => {
  return c.html(
    <html>
      <body>
        <h1>404 - Not Found</h1>
        <p>The requested page does not exist.</p>
      </body>
    </html>,
    404
  );
});

export default {
  fetch: app.fetch,
};
