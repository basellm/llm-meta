export default {
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (url.pathname !== "/") {
      return Response.redirect("/", 302);
    }

    return new Response(
      `
      <html>
        <body>
          <h1>Hello World</h1>
        </body>
      </html>
    `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
};
