<p align="center">
  <a href="https://models.dev">
    <picture>
      <source srcset="dist/logo-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="dist/logo-light.svg" media="(prefers-color-scheme: light)">
      <img src="dist/logo-light.svg" alt="Models.dev logo">
    </picture>
  </a>
</p>
<p align="center">
  <a href="https://sst.dev/discord"><img alt="Discord" src="https://img.shields.io/discord/983865673656705025?style=flat-square&label=Discord" /></a>
  <a href="https://github.com/sst/models.dev/actions/workflows/deploy.yml"><img alt="Deploy status" src="https://img.shields.io/github/actions/workflow/status/sst/models.dev/deploy.yml?style=flat-square&branch=master" /></a>
</p>

---

[Models.dev](https://models.dev) is a comprehensive open-source database of AI model specifications, pricing, and capabilities.

## Contributing

We welcome contributions to expand our model database! Follow these steps to add a new model:

### Adding a New Model

#### 1. Create Provider (if it doesn't exist)

If the AI provider doesn't already exist in the `providers/` directory:

1. Create a new folder in `providers/` with the provider's ID (e.g., `providers/newprovider/`)
2. Add a `provider.toml` file with the provider information:

```toml
name = "Provider Name"
```

#### 2. Add Model Definition

Create a new TOML file in the provider's `models/` directory where the filename is the model ID:

```toml
name = "Model Display Name"
attachment = true  # or false - supports file attachments
reasoning = false  # or true - supports reasoning/chain-of-thought
temperature = true # or false - supports temperature parameter

[cost]
input = 3.00          # Cost per million input tokens (USD)
output = 15.00        # Cost per million output tokens (USD)
inputCached = 0.30    # Cost per million cached input tokens (USD)
outputCached = 0.30   # Cost per million cached output tokens (USD)

[limit]
context = 200_000     # Maximum context window (tokens)
output = 8_192        # Maximum output tokens
```

#### 3. Submit Pull Request

1. Fork this repository
2. Create a new branch for your changes
3. Add your provider and/or model files
4. Open a pull request with a clear description

### Validation

GitHub Actions will automatically validate your submission against our schema to ensure:

- All required fields are present
- Data types are correct
- Values are within acceptable ranges
- TOML syntax is valid

### Schema Reference

Models must conform to the following schema (defined in `app/schemas.ts`):

**Provider Schema:**
- `name`: String - Display name of the provider

**Model Schema:**
- `name`: String - Display name of the model
- `attachment`: Boolean - Whether the model supports file attachments
- `reasoning`: Boolean - Whether the model supports reasoning capabilities
- `temperature`: Boolean - Whether the model supports temperature control
- `cost.input`: Number - Cost per million input tokens (USD)
- `cost.output`: Number - Cost per million output tokens (USD)
- `cost.inputCached`: Number - Cost per million cached input tokens (USD)
- `cost.outputCached`: Number - Cost per million cached output tokens (USD)
- `limit.context`: Number - Maximum context window in tokens
- `limit.output`: Number - Maximum output tokens

### Examples

See existing providers in the `providers/` directory for reference:
- `providers/anthropic/` - Anthropic Claude models
- `providers/openai/` - OpenAI GPT models
- `providers/google/` - Google Gemini models

### Questions?

Open an issue if you need help or have questions about contributing.
