---
paths:
  - "infra/**/*.{yaml,yml}"
  - ".github/workflows/**"
---

# Template work: one block at a time

This replaces "one plan step per turn" for CloudFormation templates and GitHub Actions workflows.

## What one block is

- CloudFormation: one resource, parameter, output or condition
- GitHub Actions: one step, or one top-level or job-level section (`on`, `permissions`, a job's header)

## The loop

1. Name the next block and what it is for. Write nothing yet.
2. List every value and choice it needs. For any that I have not given, ask, one question at a time.
   A value from another project, an existing plan or an AWS default is not given: ask.
3. Write only that block.
4. Stop. Explain each line that carries a choice and where its value came from, and say how to check it.
5. Wait for my OK before naming the next block.

## Never

- Write two blocks in one turn, even small or obvious ones
- Add a property, permission or option I have not agreed to
- Change an earlier block without asking
- Fill a gap with a placeholder or a guess
