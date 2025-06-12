# Agent Guidelines for models.dev

## Build/Test Commands
- **Build**: `bun run scripts/generate` - Generates api.json from TOML files
- **Validate**: `bun run scripts/validate` - Validates all TOML files against schemas
- **Deploy**: `sst deploy` - Deploy to Cloudflare Workers
- **Dev**: `sst dev` - Local development server

## Code Style
- **Runtime**: Bun with TypeScript ESM modules
- **Imports**: Use explicit imports, prefer named imports over default
- **Types**: Use Zod schemas for validation, infer types with `z.infer<>`
- **Naming**: camelCase for variables/functions, PascalCase for types/schemas
- **Error Handling**: Use try-catch blocks, throw Error objects with descriptive messages
- **Formatting**: 2-space indentation, semicolons, double quotes for strings

## Architecture
- **Framework**: Hono for HTTP handling, SST for infrastructure
- **Data**: TOML files in `providers/` directory define models and providers
- **Validation**: All TOML files must pass schema validation before deployment
- **Output**: Generated `dist/api.json` serves as the API data source

## File Structure
- `app/schemas.ts` - Zod schemas for validation
- `app/worker.tsx` - Cloudflare Worker with JSX rendering
- `providers/*/` - TOML files defining providers and models
- `scripts/` - Build and validation scripts