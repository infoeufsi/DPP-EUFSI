---
description: Deploy code to Git and Render
---

# Deploy Workflow

Use this workflow to commit changes and deploy to production.

## Steps

### 1. Stage Changes
```bash
git add .
```

### 2. Commit with Message
```bash
git commit -m "feat: [description of changes]"
```

### 3. Push to GitHub
// turbo
```bash
git push origin main
```

### 4. Render Auto-Deploy
- Render automatically deploys when new commits are pushed to `main`
- Check status at: https://dashboard.render.com

## Manual Render Deploy (if needed)
```bash
render deploy
```

## Commit Message Conventions
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks
