# trmnl-solomining

TRMNL plugin to monitor a SoloBTC miner via:

`https://solobtc.nmminer.com/api/client/{{WalletCode}}`

## Plan (grill-me + trmnl)

1. **Data contract first**
   - Treat `workers[0]` as the primary agent.
   - Online = `workers` array has at least one object.
   - Use `workers[0].hashRate` and `workers[0].bestDifficulty` for display.
2. **Render rules**
   - Show exactly 3 metrics: status, current hashrate, worker best difficulty.
   - Add robust fallbacks for empty/missing data (offline, zero values).
   - Keep layout framework-only (no custom CSS), e-ink-friendly text hierarchy.
3. **Validation path**
   - Preview with sample JSON (`.trmnlp.yml`) and real wallet code.
   - Confirm each size template (`full`, `half_horizontal`, `half_vertical`, `quadrant`) shows all 3 metrics.

## Files

- `src/settings.yml` — polling config and custom fields
- `src/full.liquid`
- `src/half_horizontal.liquid`
- `src/half_vertical.liquid`
- `src/quadrant.liquid`
- `.trmnlp.yml` — local preview variables
