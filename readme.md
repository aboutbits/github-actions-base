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

### Add All and Commit

This action will create all changes and commit them.

#### Example

```yaml
  - uses: aboutbits/github-actions-base/git-add-all-and-commit@v2
    with:
      message: 'Commit message'
```

#### Inputs

The following inputs can be used as `step.with` keys:

| Name                | Required/Default | Description        |
|---------------------|------------------|--------------------|
| `message`           | required         | The commit message |

### Create Tag

This action will create a new Git tag.

#### Example

```yaml
  - uses: aboutbits/github-actions-base/git-create-tag@v2
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

## Versioning

In order to have a versioning in place and working, create lightweight tags that point to the appropriate minor release versions.

Creating a new minor release:

```bash
git tag v2
git push --tags
```

Replacing an already existing minor release:

```bash
git tag -d v2
git push origin :refs/tags/v2
git tag v2
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
