# Contributing

Thank you for contributing to this project.

## Workflow

1. Create a branch from the default branch.
2. Keep changes focused and atomic.
3. Add or update tests when behavior changes.
4. Run local checks before opening a PR.
5. Open a pull request with context and validation evidence.

## Local Setup

```bash
npm install
npm run lint --if-present
npm test --if-present
npm run build --if-present
```
## Commit Message Convention

Use clear, semantic messages:

- eat: new functionality
- ix: bug fix
- chore: maintenance
- docs: documentation
- efactor: code restructuring without behavior changes

## Pull Request Checklist

- [ ] Scope is small and clear
- [ ] Tests updated (if applicable)
- [ ] Local checks passed
- [ ] Docs updated (if applicable)
