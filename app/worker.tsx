import { Hono } from "hono";
import type { Fetcher } from "@cloudflare/workers-types";
import type { Model } from "./schemas";

interface Env {
  ASSETS: Fetcher;
}

// Define the API data structure
interface ApiData {
  [providerId: string]: {
    name: string;
    models: {
      [modelId: string]: Model;
    };
  };
}

// Create a typed Hono app
const app = new Hono<{ Bindings: Env }>();

// Root route
app.get("/", async (c) => {
  try {
    // Get the api.json file using env.ASSETS binding
    const apiJsonResponse = await c.env.ASSETS.fetch(
      new URL("api.json", c.req.url)
    );
    if (!apiJsonResponse) {
      throw new Error("api.json not found");
    }

    // Decode the JSON file
    const apiData = (await apiJsonResponse.json()) as ApiData;

    return c.html(
      <html>
        <head>
          <title>API Data</title>
        </head>
        <body>
          <h1>API Data</h1>
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Model</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(apiData).map(([providerId, provider]) =>
                Object.entries(provider.models).map(([modelId, model]) => (
                  <tr key={`${providerId}-${modelId}`}>
                    <td>{provider.name}</td>
                    <td>{model.name}</td>
                    <td>
                      <pre>{JSON.stringify(model, null, 2)}</pre>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </body>
      </html>
    );
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return c.html(
      <html>
        <body>
          <h1>Error</h1>
          <p>{error.message}</p>
        </body>
      </html>
    );
  }
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
