# GitHub Actions Git

A collection of GitHub actions.

## Create or Update Git Tag
This action will crate a new tag. If the tag already exists it will be overwritten (requires force-push).  
The tag will be created for the commit sha that matches `${{ github.sha }}`

### Example

```yaml
  - name: Checkout source code
    uses: actions/checkout@v3
    
  - name: Tag Deployment
    uses: aboutbits/github-actions-git/create-or-update-git-tag@v1
    with:
      tag-name: 'prod'
      message: 'Deployed to Prod'
      user-name: 'AboutBits'
      user-email: 'info@aboutbits.it'
```

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
