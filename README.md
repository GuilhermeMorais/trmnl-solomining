# trmnl-solomining

TRMNL plugin to monitor a Solo BTC worker.

## Data sources

The plugin supports 2 providers, selected via a custom field:

- **NM Miner** → `https://solobtc.nmminer.com/api/client/{{ wallet_code }}`
- **Public Pool** → `https://public-pool.io:40557/api/client/{{ wallet_code }}`

`polling_url` is selected dynamically from `pool_provider` in `src/settings.yml`.

## Configuration

In plugin settings:

- `pool_provider` (select)
  - `NM Miner`
  - `Public Pool`
- `wallet_code` (string)

## Local preview

Set local values in `.trmnlp.yml`:

```yml
custom_fields:
  wallet_code: '{{ env.WALLET_CODE }}'
  pool_provider: nmminer
```

Switch provider with:

- `nmminer`
- `public_pool`

## Files

- `src/settings.yml` — polling strategy + custom fields
- `src/transform.js` — normalises API payload for templates
- `src/full.liquid`
- `src/half_horizontal.liquid`
- `src/half_vertical.liquid`
- `src/quadrant.liquid`
- `.trmnlp.yml` — local preview config
