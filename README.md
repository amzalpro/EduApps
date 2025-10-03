# EduApps - Educational Notebook Generator

A modern web application for teachers to create and manage educational notebooks, class layouts, and student evaluations.

## Features

- 📚 **Notebook Generation**: Create customized educational notebooks with cover pages, classroom layouts, and evaluation grids
- 🎨 **Layout Editor**: Visual drag-and-drop editor for classroom seating arrangements
- 📊 **Student Management**: Import student lists via CSV, manage class configurations
- 📝 **Evaluation Tracking**: Support for grades (notes), competencies, or both
- 🎯 **Customization**: Configurable periods, subjects, and page layouts
- 💾 **Import/Export**: Save and load configurations as JSON

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/amzalpro/EduApps.git
cd EduApps

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests in watch mode
npm test -- --run    # Run tests once
npm run test:ui      # Open test UI
npm run test:coverage # Generate coverage report
```

### Testing

This project uses **Vitest** for unit testing and **React Testing Library** for component testing.

```bash
# Run all tests
npm test -- --run

# Run specific test file
npm test -- authStore.test.ts

# Watch mode for development
npm test

# Generate coverage report
npm run test:coverage
```

See [TESTS.md](./TESTS.md) for comprehensive testing documentation.

### Project Structure

```
EduApps/
├── src/
│   ├── components/      # React components
│   │   ├── ClassBlock.tsx
│   │   ├── GeneratedPages.tsx
│   │   ├── LayoutEditor.tsx
│   │   └── ...
│   ├── stores/          # Zustand state management
│   │   ├── authStore.ts
│   │   └── __tests__/
│   ├── services/        # Business logic services
│   │   ├── csvService.ts
│   │   └── __tests__/
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── App.tsx          # Main application component
├── TESTS.md             # Testing documentation
├── vite.config.ts       # Vite & Vitest configuration
└── package.json
```

## Testing Strategy

### Current Test Coverage

- ✅ **Authentication Store**: Login/logout functionality
- ✅ **CSV Service**: Parsing and conversion utilities
- 🔲 **Component Tests**: Coming soon
- 🔲 **E2E Tests**: Planned

### Running Tests

```bash
# Unit tests (current)
npm test -- --run

# With coverage
npm run test:coverage
```

Test results:
```
✓ src/services/__tests__/csvService.test.ts (17 tests)
✓ src/stores/__tests__/authStore.test.ts (6 tests)

Test Files  2 passed (2)
     Tests  23 passed (23)
```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **Lucide React** - Icons

## Features in Detail

### Classroom Layout Editor

Create custom seating arrangements with:
- Individual desks
- Paired desks
- 4-desk islands
- Teacher desk placement
- Drag-and-drop positioning
- Save and reuse templates

### Student Evaluation

Track student progress with:
- Traditional grades (notes)
- Competency-based assessment
- Combined approach
- Configurable periods (trimester, semester, etc.)
- Extra pages for additional assessments

### Import/Export

- **CSV Import**: Import student lists from CSV files
- **JSON Export**: Save entire configuration
- **JSON Import**: Load saved configurations
- Template management

## Roadmap

### Phase 1: Testing Infrastructure ✅
- [x] Set up Vitest and React Testing Library
- [x] Unit tests for stores and services
- [x] Test documentation

### Phase 2: Enhanced Testing (In Progress)
- [ ] Component tests
- [ ] Integration tests
- [ ] GitHub Actions CI/CD
- [ ] Coverage reporting

### Phase 3: Advanced Features
- [ ] E2E testing with Playwright
- [ ] PDF export functionality
- [ ] Print optimization
- [ ] Tauri desktop app
- [ ] Offline support
- [ ] iCal import

### Phase 4: Polish
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Internationalization (i18n)
- [ ] Performance optimization
- [ ] User documentation
- [ ] Video tutorials

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm test -- --run`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Quality

- Write TypeScript with proper types
- Follow existing code style
- Write tests for new features
- Update documentation
- Run linter before committing

## License

This project is available for educational purposes.

## Acknowledgments

- Built with React and Vite
- Icons by Lucide
- Inspired by teacher needs for organized class management

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues first
- Provide detailed reproduction steps

---

**Status**: Active Development
**Version**: 0.0.0
**Last Updated**: 2025
