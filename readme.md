# GitHub Actions Base

A collection of basic GitHub actions.

## Actions

### Setup Git

This action will set up Git.

#### Example

```yaml
  - uses: aboutbits/github-actions-base/git-setup@v2
    with:
      user-name: 'AboutBits'
      user-email: 'info@aboutbits.it'
```

#### Inputs

The following inputs can be used as `step.with` keys:

| Name                | Required/Default             | Description                              |
|---------------------|------------------------------|------------------------------------------|
| `user-name`         | required (AboutBits Tech)    | User name for GIT to use                 |
| `user-email`        | required (tech@aboutbits.it) | User email for GIT to use                |

### Push Changes

This action will add all changes, commit them and push it.

#### Example

```yaml
  - uses: aboutbits/github-actions-base/git-commit-and-push-all@v2
    with:
      message: 'Commit message'
```

#### Inputs

The following inputs can be used as `step.with` keys:

| Name                | Required/Default | Description        |
|---------------------|------------------|--------------------|
| `message`           | required         | The commit message |

### Create or Update Tag

This action will create a new Git tag. If the tag already exists it will be overwritten (requires force-push).

#### Example

```yaml
  - uses: aboutbits/github-actions-base/git-create-or-update-tag@v2
    with:
      tag-name: 'prod'
      message: 'Deployed to Prod'
      user-name: 'AboutBits'
      user-email: 'info@aboutbits.it'
```

#### Inputs

The following inputs can be used as `step.with` keys:

| Name                | Required/Default | Description                              |
|---------------------|------------------|------------------------------------------|
| `tag-name`          | required         | The name of the tag to create            |
| `message`           | (empty)          | An optional message to go with the tag   |

### Create GitHub Release

This action will create a new GitHub release for a given tag.

#### Example

```yaml
  - uses: aboutbits/github-actions-base/github-create-release@v2
    with:
      tag-name: 'v2.4.8'
```

#### Inputs

The following inputs can be used as `step.with` keys:

| Name                       | Required/Default | Description                                                       |
|----------------------------|------------------|-------------------------------------------------------------------|
| `tag-name`                 | required         | The name of the tag to create                                     |
| `release-description`      | ''               | The description text of the release.                              |
| `release-notes-generation` | 'false'          | An option that indicates if the release notes should be generated |
| `prerelease`               | 'auto'           | 'true', 'false' or 'auto' (a tag with a hyphen is a pre-release)  |

### Comment on a GitHub PR

This action will add a comment to a GitHub PR.

#### Example

```yaml
  - uses: aboutbits/github-actions-base/github-pr-comment@v2
    with:
      comment: 'Your comment'
```

#### Inputs

The following inputs can be used as `step.with` keys:

| Name      | Required/Default | Description             |
|-----------|------------------|-------------------------|
| `comment` | required         | The text of the comment |

### Keep the self-review labels in step with the code

This action keeps two labels true to the code of a pull request after a self-review. The `pr-ready` skill of [aboutbits/agent-kit](https://github.com/aboutbits/agent-kit) writes a hidden `<!-- self-review: <sha> <branch-id> -->` marker into the PR body, and may set `risk:low`. The action computes the branch id the same way: a rebase keeps it, a change to the reviewed code does not.

- When the change differs from the reviewed one, it removes `risk:low` and adds `self-review:stale`.
- When the change is the reviewed one again, for example after a new self-review round, it removes `self-review:stale`.
- Without the marker, it removes both labels: the pull request has no self-review.

#### Example

```yaml
on:
  pull_request:
    types: [opened, reopened, synchronize, edited, labeled]

jobs:
  review-freshness:
    if: >-
      contains(github.event.pull_request.body, '<!-- self-review:')
      || contains(github.event.pull_request.labels.*.name, 'risk:low')
      || contains(github.event.pull_request.labels.*.name, 'self-review:stale')
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: aboutbits/github-actions-base/github-pr-review-freshness@v2
```

#### Inputs

The following inputs can be used as `step.with` keys:

| Name          | Required/Default             | Description                                                |
|---------------|------------------------------|------------------------------------------------------------|
| `label`       | optional (risk:low)          | The label that allows a merge without more review          |
| `stale-label` | optional (self-review:stale) | The label that says the code changed after the self-review |


## Build & Publish

To build and publish the action, visit the GitHub Actions page of the repository and trigger the workflow "Release Package" manually.

## Information

About Bits is a company based in South Tyrol, Italy. You can find more information about us on [our website](https://aboutbits.it).

### Support

For support, please contact [info@aboutbits.it](mailto:info@aboutbits.it).

### Credits

- [All Contributors](../../contributors)

### License

The MIT License (MIT). Please see the [license file](license.md) for more information.
