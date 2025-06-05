/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app() {
    return {
      name: "models-dev",
      home: "cloudflare",
    };
  },
  async run() {
    new sst.cloudflare.Worker("MyWorker", {
      domain: "models.dev",
      handler: "app/worker.ts",
      url: true,
      assets: {
        directory: "./dist",
      },
    });
  },
});
