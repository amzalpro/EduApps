# Testing Strategy - EduApps

## Overview

This document outlines the comprehensive testing strategy for the EduApps project. Our goal is to ensure code quality, reliability, and maintainability through automated testing at multiple levels.

## Table of Contents

1. [Test Environment Setup](#test-environment-setup)
2. [Testing Levels](#testing-levels)
3. [Test Structure](#test-structure)
4. [Running Tests](#running-tests)
5. [Test Scenarios](#test-scenarios)
6. [Continuous Integration](#continuous-integration)
7. [Coverage Goals](#coverage-goals)

## Test Environment Setup

### Dependencies

The following testing tools are installed:

- **Vitest**: Modern, fast unit test framework for Vite projects
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom DOM matchers
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM implementation for Node.js
- **Zustand**: State management library

### Configuration

Tests are configured in `vite.config.ts`:

```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './vitest.setup.ts',
  css: true,
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html']
  }
}
```

## Testing Levels

### 1. Unit Tests ✅

**Purpose**: Test individual functions, services, and stores in isolation.

**Current Coverage**:
- ✅ `authStore`: Authentication state management
- ✅ `csvService`: CSV parsing and conversion utilities

**Test IDs**: AUTH-001 through AUTH-006, CSV-001 through CSV-017

### 2. Integration Tests (Planned)

**Purpose**: Test interactions between multiple components and services.

**Planned Coverage**:
- Form data management with stores
- CSV import/export workflow
- Layout template management
- Class configuration updates

**Test IDs**: INT-001 onwards

### 3. Component Tests (Planned)

**Purpose**: Test React components in isolation with user interactions.

**Planned Coverage**:
- `ClassBlock`: Class configuration UI
- `LayoutEditor`: Drag-and-drop layout creation
- `GeneratedPages`: Document generation
- `ColorPicker`: Color selection widget
- `HelpModal`: Help documentation display

**Test IDs**: COMP-001 onwards

### 4. End-to-End Tests (Future)

**Purpose**: Test complete user workflows from start to finish.

**Tools**: Playwright or Cypress (to be decided)

**Planned Scenarios**:
- Complete notebook creation workflow
- CSV import and class setup
- Layout customization
- PDF generation and export

**Test IDs**: E2E-001 onwards

## Test Structure

### Directory Organization

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
    └── __tests__/ (future)
```

### Test File Naming

- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`

### Test Case Structure

```typescript
describe('Feature/Component Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should [expected behavior]', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Running Tests

### Available Commands

```bash
# Run all tests once
npm test -- --run

# Run tests in watch mode (interactive)
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- authStore.test.ts

# Run tests matching pattern
npm test -- --grep "CSV"
```

### Test Output

```
✓ src/services/__tests__/csvService.test.ts (17 tests)
✓ src/stores/__tests__/authStore.test.ts (6 tests)

Test Files  2 passed (2)
     Tests  23 passed (23)
```

## Test Scenarios

### AUTH - Authentication Store

| ID | Scenario | Status | Description |
|----|----------|--------|-------------|
| AUTH-001 | Initial state | ✅ Pass | Verify default unauthenticated state |
| AUTH-002 | Valid login | ✅ Pass | Login with valid username and password |
| AUTH-003 | Empty username | ✅ Pass | Login fails with empty username |
| AUTH-004 | Empty password | ✅ Pass | Login fails with empty password |
| AUTH-005 | Logout | ✅ Pass | User can logout and state resets |
| AUTH-006 | Username storage | ✅ Pass | Correct username stored after login |

### CSV - CSV Service

| ID | Scenario | Status | Description |
|----|----------|--------|-------------|
| CSV-001 | Parse simple CSV | ✅ Pass | Parse basic CSV with headers and data |
| CSV-002 | Empty CSV | ✅ Pass | Handle empty CSV string |
| CSV-003 | Skip empty lines | ✅ Pass | Filter out blank lines |
| CSV-004 | Custom delimiter | ✅ Pass | Support semicolon delimiter |
| CSV-005 | Simple line parse | ✅ Pass | Parse basic comma-separated line |
| CSV-006 | Quoted fields | ✅ Pass | Handle quoted fields with commas |
| CSV-007 | Escaped quotes | ✅ Pass | Handle double-quote escaping |
| CSV-008 | Trim whitespace | ✅ Pass | Remove extra spaces around fields |
| CSV-009 | Empty fields | ✅ Pass | Handle missing field values |
| CSV-010 | Convert to CSV | ✅ Pass | Generate CSV from arrays |
| CSV-011 | Escape commas | ✅ Pass | Quote fields containing commas |
| CSV-012 | Escape quotes | ✅ Pass | Double-quote fields with quotes |
| CSV-013 | Custom delimiter output | ✅ Pass | Generate CSV with semicolon |
| CSV-014 | Parse student list | ✅ Pass | Extract names from CSV |
| CSV-015 | Student list empty lines | ✅ Pass | Filter empty lines in student list |
| CSV-016 | Student list empty CSV | ✅ Pass | Handle empty student CSV |
| CSV-017 | Filter empty names | ✅ Pass | Remove blank student names |

### Edge Cases & Error Handling

| ID | Scenario | Status | Priority |
|----|----------|--------|----------|
| EDGE-001 | Malformed CSV | 🔲 Todo | High |
| EDGE-002 | Large file import | 🔲 Todo | Medium |
| EDGE-003 | Special characters in names | 🔲 Todo | Medium |
| EDGE-004 | Unicode support | 🔲 Todo | Medium |
| EDGE-005 | Invalid JSON import | 🔲 Todo | High |
| EDGE-006 | Network timeout | 🔲 Todo | Low |

### Performance Tests

| ID | Scenario | Target | Status |
|----|----------|--------|--------|
| PERF-001 | CSV parse 1000 rows | < 100ms | 🔲 Todo |
| PERF-002 | Generate 50+ pages | < 3s | 🔲 Todo |
| PERF-003 | Layout editor drag performance | 60fps | 🔲 Todo |

### Accessibility Tests

| ID | Scenario | Standard | Status |
|----|----------|----------|--------|
| A11Y-001 | Keyboard navigation | WCAG 2.1 AA | 🔲 Todo |
| A11Y-002 | Screen reader support | WCAG 2.1 AA | 🔲 Todo |
| A11Y-003 | Color contrast | WCAG 2.1 AA | 🔲 Todo |
| A11Y-004 | Focus indicators | WCAG 2.1 AA | 🔲 Todo |

## Continuous Integration

### GitHub Actions Workflow (Planned)

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --run
      - run: npm run build
```

### Quality Gates

- ✅ All unit tests must pass
- ✅ Linting must pass without errors
- ✅ Build must complete successfully
- 🔲 Code coverage > 80% (future goal)
- 🔲 No critical accessibility issues

## Coverage Goals

### Current Coverage

```
File                    | Stmts | Branch | Funcs | Lines |
------------------------|-------|--------|-------|-------|
stores/authStore.ts     | 100%  | 100%   | 100%  | 100%  |
services/csvService.ts  | 100%  | 100%   | 100%  | 100%  |
```

### Target Coverage by Phase

**Phase 1 (Current)**: ✅ Completed
- Core utilities and services: 100%
- State management stores: 100%

**Phase 2 (Next Sprint)**:
- Components: 70%+
- Integration scenarios: 60%+

**Phase 3 (Future)**:
- Overall project coverage: 80%+
- E2E critical paths: 100%

## Test Data & Fixtures

### Mock Data

Location: `src/utils/mockData.ts`

Provides:
- Sample layout templates (Îlots, Bus)
- Mock class configurations
- Student lists for testing

### Test Fixtures (Future)

Planned fixtures directory: `src/__fixtures__/`

Will contain:
- Sample CSV files
- JSON configuration examples
- Test images
- Expected output samples

## Known Issues & Limitations

### Current Limitations

1. **No E2E Tests**: End-to-end testing not yet implemented
2. **Component Tests Missing**: React components not yet tested
3. **No Visual Regression**: UI changes not automatically validated
4. **Manual Testing Required**: Complex workflows need manual validation

### Bugs to Address

- [ ] CSV parsing: Handle BOM (Byte Order Mark) in UTF-8 files
- [ ] Import validation: Add schema validation for JSON imports
- [ ] Error handling: Improve error messages for file operations

## Testing Best Practices

### Do's ✅

- Write tests before or alongside code (TDD/BDD)
- Keep tests independent and isolated
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies
- Maintain test data separate from tests
- Run tests frequently during development

### Don'ts ❌

- Don't test implementation details
- Don't write brittle tests tied to specific markup
- Don't skip test cleanup
- Don't test third-party library code
- Don't use production data in tests
- Don't ignore failing tests

## Roadmap

### Sprint 1 (✅ Completed)
- [x] Set up Vitest and testing infrastructure
- [x] Create test documentation
- [x] Write unit tests for auth store
- [x] Write unit tests for CSV service
- [x] Achieve 100% coverage for initial modules

### Sprint 2 (Next)
- [ ] Add component tests for ClassBlock
- [ ] Add component tests for LayoutEditor
- [ ] Add integration tests for form workflow
- [ ] Set up GitHub Actions CI
- [ ] Add test coverage reporting

### Sprint 3 (Future)
- [ ] Implement E2E testing with Playwright
- [ ] Add visual regression testing
- [ ] Performance benchmarking
- [ ] Accessibility audit automation
- [ ] Add mutation testing

## Contributing

When adding new features:

1. Write tests first (TDD approach preferred)
2. Ensure all tests pass: `npm test -- --run`
3. Check coverage: `npm run test:coverage`
4. Update this document with new test scenarios
5. Add appropriate test IDs for traceability

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)

---

**Last Updated**: 2025
**Test Framework Version**: Vitest 3.2.4
**Status**: Active Development
