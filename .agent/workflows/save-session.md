---
description: Save current session state and create checkpoint
---

# Save Session Workflow

Use this workflow to create a checkpoint summary of your current work session.

## Steps

1. **Create/Update Session Summary**
   - I will create a `session-checkpoint.md` file in the brain directory
   - This captures: date, topics discussed, files modified, next steps

2. **Commit Current Work** (if there are changes)
   ```bash
   git add .
   git commit -m "checkpoint: [description]"
   ```

3. **Push to GitHub** (optional)
   ```bash
   git push origin main
   ```

## Usage

Just say: "save session" or "create checkpoint" or use `/save-session`

I will then:
- Summarize what we accomplished
- List files created/modified
- Document next steps for when you resume
- Optionally commit and push to Git

## Resuming

When you return, just say: "let's continue where we left off" and I'll review the checkpoint.
