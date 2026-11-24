# CLAUDE.md — agents

> Scoring agents for my job search: website, GitHub, LinkedIn, resume.
> Based on the AI-Era Job Kit (Jerome Hardaway, *Job Hunting in the Age of AI*), adapted to this repo.
> Root rules in `/CLAUDE.md` apply here too.

## Prime Directive

**Sharpen, never invent.** Agents score and suggest improvements using only facts in `/content`.
They must never fabricate experience, metrics, titles, dates or skills. When a stronger claim
would need data that doesn't exist, the agent flags the gap as a question for me.

## Agents

- **Site scorer:** TODO: inputs (live URL? build output?), rubric
- **GitHub scorer:** TODO: inputs (profile, pinned repos, READMEs, activity), rubric
- **LinkedIn scorer:** TODO: inputs (export from `/private`?), rubric
- **Resume scorer:** TODO: inputs (generated from `/content`?), rubric, ATS checks
- TODO: target-role / job-description matching?

## How They Run

- TODO: Claude Code subagents (`/.claude/agents/`), Lambda + model API, or both
- TODO: slash commands that invoke them (`/score-resume`, etc.)
- TODO: relationship to the AI-Era Job Kit (vendor / fork / borrow rubrics)

## Output Format

- TODO: score scale and categories
- TODO: structured output (JSON schema?) + human-readable summary
- Every suggestion cites the `/content` fact it relies on, or is marked as a question

## Results & History

- TODO: where results are saved
- TODO: committed history to track scores over time ("measure")
- Results derived from `/private` data stay in `/private`

## Don'ts

- Never invent or inflate career facts
- Never write to `/content` without my approval
- TODO
