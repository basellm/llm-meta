import { z } from "zod";

// Define schema for provider.toml
export const ProviderSchema = z
  .object({
    name: z.string().min(1, "Provider name cannot be empty"),
    env: z.array(z.string()).min(1, "Provider env cannot be empty"),
    npm: z.string().min(1, "Provider npm module cannot be empty"),
  })
  .strict();

// Define schema for model files
export const ModelSchema = z
  .object({
    name: z.string().min(1, "Model name cannot be empty"),
    attachment: z.boolean(),
    reasoning: z.boolean(),
    temperature: z.boolean(),
    cost: z.object({
      input: z.number().min(0, "Input price cannot be negative"),
      output: z.number().min(0, "Output price cannot be negative"),
      inputCached: z.number().min(0, "Input cached price cannot be negative"),
      outputCached: z.number().min(0, "Output cached price cannot be negative"),
    }),
    limit: z.object({
      context: z.number().min(0, "Context window must be positive"),
      output: z.number().min(0, "Output tokens must be positive"),
    }),
  })
  .strict();

// Define types based on schemas
export type Provider = z.infer<typeof ProviderSchema>;
export type Model = z.infer<typeof ModelSchema>;

// Define the API data structure
export interface ApiData {
  [providerId: string]: Provider & {
    id: string;
    models: {
      [modelId: string]: Model & { id: string };
    };
  };
}
