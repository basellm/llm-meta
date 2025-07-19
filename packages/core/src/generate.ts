import path from "path";

import { Provider, Model } from "./schema.js";

export async function generate(directory: string) {
  const result = {} as Record<string, Provider>;
  for await (const providerPath of new Bun.Glob("*/provider.toml").scan({
    cwd: directory,
    absolute: true,
  })) {
    const providerID = path.basename(path.dirname(providerPath));
    const toml = await import(providerPath, {
      with: {
        type: "toml",
      },
    }).then((mod) => mod.default);
    toml.id = providerID;
    toml.models = {};
    const provider = Provider.safeParse(toml);
    if (!provider.success) {
      provider.error.cause = toml;
      throw provider.error;
    }

    const modelsPath = path.join(directory, providerID, "models");
    for await (const modelPath of new Bun.Glob("**/*.toml").scan({
      cwd: modelsPath,
      absolute: true,
      followSymlinks: true,
    })) {
      const modelID = path.relative(modelsPath, modelPath).slice(0, -5);
      const toml = await import(modelPath, {
        with: {
          type: "toml",
        },
      }).then((mod) => mod.default);
      toml.id = modelID;
      const model = Model.safeParse(toml);
      if (!model.success) {
        model.error.cause = toml;
        throw model.error;
      }
      provider.data.models[modelID] = model.data;
    }
    result[providerID] = provider.data;
  }

  return result;
}
