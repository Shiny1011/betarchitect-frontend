# 🔧 Development Workflow & Pre-commit Setup

This project is configured with automatic code quality checks that run at different stages of development.

## 🎯 What gets checked automatically

### Pre-commit (on every commit)

- ✅ **ESLint** - fix linting errors
- ✅ **Prettier** - auto-format code
- ✅ **TypeScript** - type checking

### Pre-push (before pushing to Git)

- ✅ **Type Check** - full TypeScript type validation
- ✅ **ESLint** - code quality checks
- ✅ **Prettier** - formatting validation
- ✅ **Content Validation** - i18n and pages validation
- ✅ **Build** - project build

### Commit Message (commit format)

- ✅ Enforced commit message format validation

## 🚀 Available commands

### Core development commands

```bash
# Development
npm run dev

# Build
npm run build

# Type checking
npm run type-check
```

### Code quality

```bash
# Linting with auto-fix
npm run lint:fix

# Formatting
npm run format

# Check formatting
npm run format:check

# Content validation
npm run content:validate
```

### CI/CD commands

```bash
# Check staged files (like pre-commit)
npm run pre-commit

# Full check (like CI)
npm run ci:full

# Pre-push check
npm run pre-push
```

## 🎨 Commit format

The project uses strict commit message format:

### Available types:

- `feat:` - new feature
- `fix:` - bug fixes
- `docs:` - documentation changes
- `style:` - formatting, semicolons, etc.
- `refactor:` - code refactoring
- `test:` - adding tests
- `chore:` - maintenance, dependencies, etc.
- `perf:` - performance improvements
- `ci:` - CI/CD changes
- `build:` - build system changes
- `revert:` - revert previous commit

### Examples of correct commits:

```bash
feat: add user authentication system
fix(auth): resolve login validation issue
docs: update README installation steps
style: format code with prettier
refactor(components): extract common button logic
test: add unit tests for auth service
chore(deps): update dependencies to latest versions
```

## 🛠️ VS Code integration

The project is configured for automatic:

- Formatting on save
- ESLint error fixing
- Import organization

### Quick tasks (Ctrl/Cmd + Shift + P → "Tasks: Run Task"):

- `🔍 Lint & Fix` - fix linting errors
- `💄 Format` - format code
- `🔍 Type Check` - check types
- `🚀 Pre-commit Check` - run pre-commit checks
- `✅ Full CI Check` - full CI-like validation

## 🚨 What to do if hooks block your commit

### If pre-commit fails:

```bash
# Auto-fix issues
npm run lint:fix
npm run format

# Check types
npm run type-check

# Try commit again
git commit -m "fix: your message"
```

### If pre-push fails:

```bash
# Run full check
npm run ci:full

# Fix found issues
# Try push again
git push
```

### Emergency hook bypass (NOT RECOMMENDED):

```bash
# Skip pre-commit (emergency only!)
git commit --no-verify -m "emergency fix"

# Skip pre-push (emergency only!)
git push --no-verify
```

## 🔧 Setup for new developers

1. **Clone repository**:

```bash
git clone <repo-url>
cd betarchitect-fe
pnpm install
```

2. **Auto-configured**:
   - Git hooks (Husky)
   - Pre-commit checks (lint-staged)
   - Commit rules

3. **VS Code setup**:
   - Install extensions: ESLint, Prettier
   - Settings already included in `.vscode/settings.json`

## 📋 Pre-commit checklist

- [ ] Code is formatted (automatic)
- [ ] No linting errors (automatic)
- [ ] TypeScript types are correct (automatic)
- [ ] Commit follows format (automatic)
- [ ] Functionality tested manually

## 🎯 Benefits of this setup

✅ **Code Quality** - automatic standards maintenance  
✅ **Team Collaboration** - consistent style across all developers  
✅ **CI/CD Ready** - local checks match server checks  
✅ **Performance** - only checks changed files  
✅ **Git History** - clean and understandable commits

---

💡 **Tip**: If checks seem slow, you can run `npm run pre-commit` manually during development for early issue detection.
