# Madek API Tests - Known Issues

## ⚠️ Test Flakiness Issue (SOLVED)

### Problem
The `madek-api` test suite suffers from a **known bug in @nuxt/test-utils** with Nuxt 4 that causes macro transpilation failures:

```
Error: mockNuxtImport() is a macro and it did not get transpiled.
This may be an internal bug of @nuxt/test-utils.
```

### Symptoms
- Tests work unpredictably on single runs
- Usually succeeds on 2nd or 3rd attempt
- No consistent pattern for first-time success

### Root Cause
Bug in @nuxt/test-utils macro transpilation system when used with Nuxt 4.

## ✅ **SOLUTION: Automatic Retry Logic**

### Current Implementation
We've implemented automatic retry logic in the npm scripts:

```json
"test": "npm run test:nuxt4-workaround",
"test:nuxt4-workaround": "vitest run || vitest run || vitest run || vitest run",
"test:direct": "vitest run"
```

### How to Use
```bash
# Standard test run (with automatic retries)
npm run test

# Direct test run (no retries, for debugging)
npm run test:direct

# Watch mode (unaffected)
npm run test:watch
```

### How It Works
- Tries up to 4 times automatically
- Usually succeeds on 2nd or 3rd attempt
- If all 4 attempts fail, indicates a real test problem
- No manual intervention required

## 🚫 Previously Failed Solutions

We tried multiple approaches before finding the working solution:

1. **Vitest Configuration Changes**
   - `cache: false` - minimal improvement
   - `pool: 'forks'` + `singleFork` + `isolate` - no effect
   - Custom cache clearing - breaks Nuxt integration

2. **Direct Mocking**
   - `vi.mock()` instead of `mockNuxtImport` - breaks Nuxt context entirely

3. **Dependency Injection Refactoring**
   - Would require changing production code significantly
   - Adds complexity without solving the root cause

## 📊 Impact Assessment

### ✅ Current Benefits
- **Tests run reliably** with automatic retry
- **No manual intervention** required
- **CI/CD compatible** - works in automated environments
- **Developer-friendly** - just run `npm run test`
- **Production code unchanged** - no architectural changes needed

### ⚠️ Trade-offs
- Slightly longer test time when retries are needed
- Root cause remains unresolved (waiting for upstream fix)

## 🔮 Future Resolution

### When @nuxt/test-utils is Fixed
1. Change `"test": "vitest run"` in package.json
2. Remove `test:nuxt4-workaround` script
3. Remove `test:direct` script
4. Update this documentation

### Monitoring
- Watch @nuxt/test-utils releases for macro transpilation fixes
- Test with each Nuxt 4 update
- Remove workaround when no longer needed

## 📝 Affected Files

- `api-client.test.ts` ✅ (working with retry)
- `cache-keys.test.ts` ✅ (working with retry)
- `data-fetching.test.ts` ✅ (working with retry)
- `request-config.test.ts` ✅ (working with retry)
- `vitest.setup.ts` (contains the problematic `mockNuxtImport`)
