# BOS Contribution Guidelines

First of all, thank you for your interest in BOS. BOS is an operating system kernel project maintained by a single individual and is still under active development.

These guidelines are not meant to restrict you, but to ensure that your time and effort are used effectively.

---

## Before You Start

BOS is currently maintained by **a single person**. This means:

- All code reviews, testing, and merging are done by one person.
- Communication and adaptation costs are relatively high.
- The project direction is determined by the core author.

Therefore, **please communicate via an Issue before submitting anything**. This does not mean that contributions are unwelcome; rather, it is to ensure that your work does not go to waste.

---

## How to Contribute (in order of priority)

### 1. Submit an Issue (Recommended)

In the vast majority of cases, an Issue is the most appropriate way to contribute.

**Content suitable for Issue feedback:**

- Reporting bugs (including description, reproduction steps, and expected behavior)
- Proposing feature suggestions
- Asking about design decisions or implementation details
- Reporting documentation issues
- Sharing usage experiences or ideas

**How to file a good Issue:**

1. Search existing Issues first to confirm whether it has already been raised.
2. Use a clear and specific title.
3. Describe the problem you encountered or your suggestion.
4. If it is a bug, try to provide reproduction steps.
5. If necessary, attach screenshots or logs.

> Issues are the standard way to provide feedback and are currently the most helpful form of contribution to BOS.

### 2. Participate in Discussions

You can join discussions in Issues or Discussions (if enabled):

- Help other users solve problems.
- Share your understanding of a particular feature.
- Propose improvement suggestions.

Even if you do not submit code, your participation is valuable.

### 3. Submit a Pull Request (Accepted with restrictions)

PRs are not rejected outright, but their acceptance bar is higher than that for Issues.

**Situations suitable for submitting a PR:**

- Fixing a confirmed bug.
- Correcting errors in documentation.
- Adding a standalone example program.
- Making a small change that has been discussed in advance.

**Situations NOT suitable for submitting a PR:**

- Adding a new feature (please open an Issue for discussion first).
- Refactoring existing modules (please open an Issue for discussion first).
- Modifying the core architecture (unless you have reached an agreement with the author).
- Large‑scale changes without prior discussion.

**PR submission process:**

1. Open an Issue first to discuss your idea.
2. Wait for confirmation before you start coding.
3. When submitting the PR, describe the changes and the testing performed.
4. Await review.

> If a change can be resolved via an Issue discussion, try to avoid submitting a PR for it.

---

## Code Standards (if you submit a PR)

BOS does not currently have strict style checks, but please try to follow these principles:

- Use the format "[ModuleName] variableName" for variable names, e.g., "[MEM] counter".
- Use the format "ModuleName_functionName" for function names, e.g., "[MEM]_size".
- Add comments for key logic (Chinese is acceptable, but English is preferred for broader collaboration).
- Keep functions short and focused on a single responsibility.
- Do not introduce new external dependencies (such as extensions); if you have such a need, please inform the author.

---

## Communication Channels

- **Technical discussions and feedback**: Use GitHub Issues.
- **Urgent matters**: You may tag them in an Issue, but please do not send private emails.

---

## Finally

BOS is a long‑term project, and its development pace may be slower than many other projects. This is not due to a lack of activity, but because kernel development itself requires time to mature.

Your feedback, suggestions, and problem reports are all contributions to BOS. Even if you do not submit a single line of code, your participation is seen and appreciated.

Thank you for your understanding and support.
