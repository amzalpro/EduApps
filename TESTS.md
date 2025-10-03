# Testing Strategy - EduApps

## Objectives

This document outlines the comprehensive testing strategy for the EduApps project, covering:
- Unit tests for stores and services
- Integration tests for complex workflows
- End-to-end (E2E) tests for critical user journeys
- Performance and accessibility testing approaches

## Testing Environment

### Tools & Frameworks
- **Unit/Integration**: Vitest + React Testing Library + jsdom
- **E2E** (planned): Playwright or Cypress
- **Coverage**: Vitest coverage with v8 provider
- **CI/CD** (planned): GitHub Actions

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm test -- --watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI (if installed)
npm run test:ui
```

## Test Structure

### 1. Unit Tests

#### Authentication Store (`src/stores/__tests__/authStore.test.ts`)
**Coverage**: AUTH-001 to AUTH-005
- [x] AUTH-001: Initial state verification (user null, not authenticated)
- [x] AUTH-002: User login with credentials
- [x] AUTH-003: User login with custom role
- [x] AUTH-004: User logout
- [x] AUTH-005: Multiple login/logout cycles

#### CSV Service (`src/services/__tests__/csvService.test.ts`)
**Coverage**: CSV-001 to CSV-016
- [x] CSV-001: Parse simple CSV content
- [x] CSV-002: Handle empty CSV
- [x] CSV-003: Handle CSV with only headers
- [x] CSV-004: Skip empty lines
- [x] CSV-005: Handle quoted fields with commas
- [x] CSV-006: Handle escaped quotes in fields
- [x] CSV-007: Handle missing values
- [x] CSV-008: Trim whitespace from values
- [x] CSV-009: Convert array to CSV
- [x] CSV-010: Handle empty array
- [x] CSV-011: Escape fields with commas in export
- [x] CSV-012: Escape fields with quotes in export
- [x] CSV-013: Handle missing values in export
- [x] CSV-014: Maintain field order in export
- [x] CSV-015: Round-trip data integrity
- [x] CSV-016: Handle complex data with special characters

### 2. Smoke Tests (Manual - To be automated)

#### Critical User Journeys
**SMOKE-001: Application Launch**
- Preconditions: None
- Steps: Open application
- Expected: Application loads without errors, main UI visible
- Status: ⏳ Pending

**SMOKE-002: Configuration Flow**
- Preconditions: Application loaded
- Steps: 
  1. Enter teacher info
  2. Add a level
  3. Add a class
  4. Generate logbook
- Expected: Logbook generates successfully
- Status: ⏳ Pending

**SMOKE-003: JSON Import/Export**
- Preconditions: Configuration created
- Steps:
  1. Export configuration to JSON
  2. Clear form
  3. Import saved JSON
- Expected: Configuration restored correctly
- Status: ⏳ Pending

### 3. Functional Tests (To be implemented)

#### Dashboard Module
**DASH-001: Teacher Information**
- Verify all teacher info fields are editable
- Verify required field validation
- Verify data persistence

**DASH-002: Academic Year Setup**
- Verify year format validation
- Verify period configuration
- Verify custom period names

#### Classroom Configuration
**CLASS-001: Level Management**
- Verify add/remove level functionality
- Verify level color picker
- Verify level validation

**CLASS-002: Class Management**
- Verify add/remove class functionality
- Verify class list parsing (comma-separated)
- Verify student count validation

**CLASS-003: Evaluation Configuration**
- Verify evaluation type selection (notes/competences/both)
- Verify extra pages configuration
- Verify evaluation page generation

#### Layout Editor
**LAYOUT-001: Template Creation**
- Verify template naming
- Verify element placement (desks, teacher desk)
- Verify grid snapping

**LAYOUT-002: Template Management**
- Verify save template
- Verify edit template
- Verify delete template
- Verify template selection for classes

#### Import/Export
**IMPORT-001: CSV Import**
- Verify student list CSV import
- Verify error handling for malformed CSV
- Verify encoding support (UTF-8)

**IMPORT-002: JSON Configuration**
- Verify full configuration export
- Verify configuration import with validation
- Verify schema versioning (future)

### 4. Edge Cases & Error Handling

**EDGE-001: Empty Data**
- [ ] Generate logbook with no classes
- [ ] Import empty CSV file
- [ ] Import empty JSON file
- Expected: Appropriate error messages

**EDGE-002: Invalid Data**
- [ ] Import CSV with wrong format
- [ ] Import JSON with missing required fields
- [ ] Import JSON with incompatible schema version
- Expected: Validation errors with helpful messages

**EDGE-003: Large Data Sets**
- [ ] Configuration with 50+ classes
- [ ] Student list with 100+ students
- [ ] CSV import with 500+ rows
- Expected: Performance remains acceptable

**EDGE-004: Special Characters**
- [ ] Names with accents (é, è, ç, etc.)
- [ ] Names with quotes and commas
- [ ] Unicode emoji in names
- Expected: Proper display and preservation

### 5. Non-Functional Tests

#### Performance
**PERF-001: Load Time**
- Target: Application loads in < 3s
- Measurement: Chrome DevTools Performance tab
- Status: ⏳ To be measured

**PERF-002: Generation Time**
- Target: Logbook generation completes in < 5s for typical configuration (5 classes)
- Measurement: Console timing logs
- Status: ⏳ To be measured

**PERF-003: Large Renders**
- Target: Smooth scrolling through 50+ page logbook
- Measurement: Frame rate > 55 FPS
- Tool: React Profiler
- Status: ⏳ To be measured

#### Accessibility
**A11Y-001: Keyboard Navigation**
- [ ] All interactive elements reachable via Tab
- [ ] Focus indicators visible
- [ ] Modal dialogs trap focus appropriately

**A11Y-002: Screen Reader Support**
- [ ] Buttons have appropriate ARIA labels
- [ ] Form fields have associated labels
- [ ] Error messages announced to screen readers

**A11Y-003: Color Contrast**
- [ ] Text meets WCAG AA standards (4.5:1)
- [ ] Interactive elements distinguishable
- Tool: Chrome DevTools Lighthouse

#### Security
**SEC-001: Data Privacy**
- [ ] No sensitive data logged to console
- [ ] Local storage data not exposed
- [ ] No hardcoded credentials

**SEC-002: Input Validation**
- [ ] XSS prevention in text inputs
- [ ] File upload validation (JSON/CSV only)
- [ ] Size limits on file uploads

### 6. E2E Test Scenarios (Planned)

**E2E-001: Complete Configuration Journey**
```
Given a new user opens the application
When they:
  1. Fill in teacher information
  2. Set academic year and periods
  3. Upload a cover image
  4. Create layout templates
  5. Add levels and classes
  6. Configure evaluations
  7. Generate the logbook
Then they should see a complete, printable logbook
```

**E2E-002: Configuration Persistence**
```
Given a user has created a configuration
When they:
  1. Export configuration to JSON
  2. Close and reopen application
  3. Import the JSON file
Then all configuration should be restored exactly
```

**E2E-003: Template Workflow**
```
Given a user wants to create a seating plan
When they:
  1. Open the layout editor
  2. Create a new template "U-Shape"
  3. Place desks in U formation
  4. Save the template
  5. Assign template to a class
  6. Generate logbook
Then the seating plan page should show the U-Shape layout
```

## Test Data & Fixtures

### Sample Data Files
Location: `src/test/fixtures/` (to be created)

**students.csv**
```csv
Nom,Prénom,Email
Dupont,Jean,jean.dupont@example.com
Martin,Marie,marie.martin@example.com
Bernard,Paul,paul.bernard@example.com
```

**config-simple.json**
```json
{
  "teacherName": "M. Dupont",
  "schoolName": "Collège Test",
  "academicYear": "2024-2025",
  "subject": "Technologie",
  "levels": [...]
}
```

## Automation & CI

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
      - run: npm run test:coverage
      - run: npm run build
```

### Coverage Goals
- Unit tests: > 80% coverage
- Critical paths: 100% coverage
- Services: 100% coverage
- Stores: 100% coverage

### Quality Gates
- ✅ All tests must pass
- ✅ Linting must pass with no errors
- ✅ Build must succeed
- ⏳ Coverage thresholds met (to be enforced)

## Bug Tracking

### Known Issues
Track bugs in GitHub Issues with labels:
- `bug`: Confirmed bug
- `test-failure`: Test-related issue
- `needs-reproduction`: Needs steps to reproduce

### Bug Report Template
```markdown
**Bug ID**: BUG-XXX
**Component**: [Dashboard/Classroom/Export/etc.]
**Severity**: [Critical/High/Medium/Low]
**Steps to Reproduce**:
1. 
2. 
3. 
**Expected**: 
**Actual**: 
**Workaround**: (if available)
```

## Test Campaign Log

### Campaign 1 - [Date TBD]
| Test ID | Status | Notes | Tester |
|---------|--------|-------|--------|
| AUTH-001 | ✅ Pass | - | Automated |
| AUTH-002 | ✅ Pass | - | Automated |
| CSV-001 | ✅ Pass | - | Automated |
| ... | ... | ... | ... |

## Roadmap

### Phase 1: Foundation (Current) ✅
- [x] Set up Vitest + React Testing Library
- [x] Create authStore and tests
- [x] Create csvService and tests
- [x] Configure test coverage reporting
- [x] Document testing strategy

### Phase 2: Component Tests (Next)
- [ ] Test ColorPicker component
- [ ] Test HelpModal component
- [ ] Test ClassBlock component
- [ ] Test LayoutEditor component
- [ ] Test LoadingOverlay component

### Phase 3: Integration Tests
- [ ] Test form data flow
- [ ] Test import/export workflow
- [ ] Test template management
- [ ] Test logbook generation

### Phase 4: E2E Automation
- [ ] Set up Playwright or Cypress
- [ ] Implement critical path tests
- [ ] Add visual regression tests (optional)

### Phase 5: CI/CD & Quality
- [ ] GitHub Actions workflow
- [ ] Automated coverage reports
- [ ] Performance monitoring
- [ ] Accessibility audits

## Notes

- All test IDs should be referenced in commit messages when fixing bugs
- Update this document when adding new test suites
- Run full test suite before creating pull requests
- Consider adding visual regression tests for UI components
- Plan for internationalization (i18n) testing when French translations are added

## Contact

For questions about testing strategy, contact the development team or open a GitHub Discussion.
