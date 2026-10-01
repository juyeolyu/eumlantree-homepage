# GitHub publishing workflow

- When making changes in response to a user request, finish the requested work, inspect the diff, and commit the task-related changes on the current branch.
- Push each completed commit to the matching branch on `origin` without asking again. The user has requested automatic GitHub updates for this project.
- Do not stage or commit unrelated pre-existing changes. Never include `.env` files, credentials, API tokens, private keys, or generated build output. If any are present in the relevant changes, stop and explain before pushing.
- If GitHub authentication or network access prevents a push, preserve the local commit and clearly report the blocker.
- Do not change the `origin` remote as part of this workflow.
