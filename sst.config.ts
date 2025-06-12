/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app() {
    return {
      name: "models-dev",
      home: "cloudflare",
    };
  },
  async run() {
    const worker = new sst.cloudflare.Worker("MyWorker", {
      domain: $app.stage === "dev" ? "models.dev" : undefined,
      handler: "app/worker.tsx",
      url: true,
      assets: {
        directory: "./dist",
      },
    });

    return {
      url: worker.url,
    };
  },
});
