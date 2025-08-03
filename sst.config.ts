/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app() {
    return {
      name: "models-dev",
      home: "cloudflare",
    };
  },
  async run() {
    const { spawnSync } = await import("child_process");

    spawnSync("./script/build.ts", [], {
      cwd: "./packages/web",
    });

    const worker = new sst.cloudflare.Worker("Server", {
      url: true,
      domain: $app.stage === "dev" ? "models.dev" : undefined,
      handler: "./packages/function/src/worker.ts",
      assets: {
        directory: "./packages/web/dist",
      },
      transform: {
        worker: {
          observability: { enabled: true },
        },
      },
    });

    return {
      url: worker.url,
    };
  },
});
