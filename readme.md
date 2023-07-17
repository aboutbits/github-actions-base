# GitHub Actions Base

A collection of basic GitHub actions.

## Actions

### Create or Update Git Tag

This action will create a new git tag. If the tag already exists it will be overwritten (requires force-push).

#### Example

```yaml
  - uses: aboutbits/github-actions-base/git-create-or-update-tag@v1
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
| `user-name`         | required         | User name for GIT to use                 |
| `user-email`        | required         | User email for GIT to use                |
| `message`           | (empty)          | An optional message to go with the tag   |

### Comment GitHub Issue

This action will leave a comment on a GitHub issue.

#### Example

```yaml
  - uses: aboutbits/github-actions-base/github-comment-issue@v1
    with:
      issue-number: ${{ github.event.pull_request.number }}
      message: "Some message"
```

#### Inputs

The following inputs can be used as `step.with` keys:

| Name                | Required/Default | Description                              |
|---------------------|------------------|------------------------------------------|
| `issue-number`      | required         | The number of the issue                  |
| `message`           | required         | The message of the comment               |



## Versioning

In order to have a versioning in place and working, create lightweight tags that point to the appropriate minor release versions.

Creating a new minor release:

```bash
git tag v1
git push --tags
```

Replacing an already existing minor release:

```bash
git tag -d v1
git push origin :refs/tags/v1
git tag v1
git push --tags
```

## Information

About Bits is a company based in South Tyrol, Italy. You can find more information about us on [our website](https://aboutbits.it).

### Support

For support, please contact [info@aboutbits.it](mailto:info@aboutbits.it).

### Credits

- [All Contributors](../../contributors)

### License

The MIT License (MIT). Please see the [license file](license.md) for more information.
