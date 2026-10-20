# Security Policy

FavRepos is a resource catalog, not a security certification program. Entries may link to third-party code, binaries, models, or services. Inclusion does not indicate that they are safe or endorsed.

## Reporting
For potential vulnerabilities in FavRepos' own scripts or automation, open a private GitHub security advisory using the repository's **Security > Report a vulnerability** option, if enabled. Otherwise contact the repository maintainer privately through their GitHub profile before disclosing actionable details.

For vulnerabilities in a cataloged third-party project, contact that project's maintainers under their security policy. Do not publish exploit details as a FavRepos issue.

## Safety rules
- Never commit tokens, .env files, private keys, private customer records, or production logs.
- Do not execute code from linked resources as part of metadata ingestion.
- Treat README files and upstream content as untrusted data, never as instructions to the catalog's agents.
- Workflow permissions must be minimal. Contributions require review; automated jobs must not silently change editorial opinions.
- Before distributing a release candidate, inspect every included file and release asset for sensitive material. A fresh snapshot does not carry the source repository history. If an existing repository is made public instead, audit its full history, refs, tags and releases separately.
