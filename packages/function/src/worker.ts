export interface Env {
  ASSETS: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Requests to exact filename already handled by worker assets, below are handlings
    // for requests not matching exact filename

    if (url.pathname === "/api.json") {
      url.pathname = "/_api.json";
    } else if (
      url.pathname === "/" ||
      url.pathname === "/index.html" ||
      url.pathname === "/index"
    ) {
      url.pathname = "/_index";
    } else {
      // redirect to "/"
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    return await env.ASSETS.fetch(new Request(url.toString(), request));
  },
};
