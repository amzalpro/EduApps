# Testing Quick Start Guide

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test -- --run

# Run tests in watch mode (for development)
npm test

# Run with UI (browser-based test runner)
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Running Specific Tests

```bash
# Run a specific test file
npm test -- authStore.test.ts

# Run tests matching a pattern
npm test -- --grep "CSV"

# Run tests in a specific directory
npm test -- src/stores
```

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../myModule';

describe('myModule', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

### Component Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Store Test Example (Zustand)

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useMyStore } from '../myStore';

describe('myStore', () => {
  beforeEach(() => {
    // Reset store state
    useMyStore.setState({ /* initial state */ });
  });

  it('should update state', () => {
    const { updateValue } = useMyStore.getState();
    updateValue('new value');
    expect(useMyStore.getState().value).toBe('new value');
  });
});
```

## Test Structure

### Organize Tests by Feature

```
src/
├── stores/
│   ├── authStore.ts
│   └── __tests__/
│       └── authStore.test.ts
├── services/
│   ├── csvService.ts
│   └── __tests__/
│       └── csvService.test.ts
└── components/
    ├── MyComponent.tsx
    └── __tests__/
        └── MyComponent.test.tsx
```

### Test File Naming

- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`

## Common Assertions

```typescript
// Basic assertions
expect(value).toBe(expected)
expect(value).toEqual(expected)
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()

// Array/Object assertions
expect(array).toContain(item)
expect(array).toHaveLength(5)
expect(object).toHaveProperty('key')

// String assertions
expect(str).toMatch(/pattern/)
expect(str).toContain('substring')

// DOM assertions (jest-dom)
expect(element).toBeInTheDocument()
expect(element).toHaveClass('className')
expect(element).toHaveStyle({ color: 'red' })
expect(element).toBeVisible()
```

## Best Practices

### ✅ DO

- Write descriptive test names
- Test one thing per test
- Use `beforeEach` for setup
- Mock external dependencies
- Test edge cases
- Keep tests independent
- Use meaningful variable names

### ❌ DON'T

- Test implementation details
- Share state between tests
- Use real API calls
- Test third-party code
- Write brittle tests
- Skip failing tests
- Ignore warnings

## Coverage Goals

```bash
# View coverage in terminal
npm run test:coverage

# Open HTML coverage report
open coverage/index.html
```

**Target Coverage:**
- Statements: > 80%
- Branches: > 80%
- Functions: > 80%
- Lines: > 80%

**Current Coverage:**
- authStore: 100%
- csvService: 100%
- colors: 100%
- LoadingOverlay: 100%

## Debugging Tests

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["test", "--", "--run"],
  "console": "integratedTerminal"
}
```

### Debug with Browser Tools

```bash
npm run test:ui
```

Opens a browser UI where you can:
- See test results visually
- Debug individual tests
- View coverage reports
- Filter and search tests

## Continuous Integration

Tests run automatically on:
- Push to `main` or `develop`
- Pull requests
- Node versions: 18.x, 20.x

View workflow: `.github/workflows/test.yml`

## Troubleshooting

### Tests Fail Locally

```bash
# Clear cache and reinstall
rm -rf node_modules coverage
npm install
npm test -- --run
```

### Coverage Not Generated

```bash
# Install coverage provider
npm install --save-dev @vitest/coverage-v8
npm run test:coverage
```

### Tests Timeout

Increase timeout in test:

```typescript
it('slow test', async () => {
  // ...
}, 10000); // 10 second timeout
```

## Resources

- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Full Documentation](./TESTS.md)

## Getting Help

1. Check [TESTS.md](./TESTS.md) for detailed documentation
2. Look at existing test examples
3. Run `npm test -- --help` for CLI options
4. Check GitHub issues or discussions

---

Happy Testing! 🧪
