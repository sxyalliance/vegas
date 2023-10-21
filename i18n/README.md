# Project Vegas Internationalization (i18n) and Localization (l10n) Guidelines

This document describes the guidelines for internationalization (i18n) and localization (l10n) of Project Vegas or any
other project that links to this document.

Translators shall follow these guidelines to ensure that the translations are consistent and of high quality.

## Localization Platform

For convenience, we use [Crowdin](https://crowdin.com/) as the localization platform. Please use this platform to do
the translation work unless it is specifically stated otherwise.

If you have not joined the project on Crowdin, please contact the project owner to get an invitation.

## Development Conventions

### Language Tag

We use [BCP 47](https://tools.ietf.org/html/bcp47) language tags to identify languages. For example, `en-US` is the
language tag for English (US), and `zh-HK` is the language tag for Chinese (Hong Kong).

### File Structure

All message files should be placed under `i18n` directory.

### Message File Format

We use [JSON](https://www.json.org/) as the message file format. The file name should be `{locale}.json`.

> Please note that all message files will be merged to a single file during the build process.

### Message ID (Translation Key) Naming

> We also advise you to read the [Guide to Naming Translation Keys](https://tolgee.io/blog/naming-translation-keys) for
> more information and practical examples.

#### Common Messages

For common used messages, we use the following naming convention:

```
common.{scope}.{...}
```

For example, `common.form.button.cancel` is the message ID for the cancel button in a form.

#### Component Messages

For messages that are specific to a component, we use the following naming convention:

```
{component}.{...}
```

For example, `registration_form.label.first_name` is the message ID for the label of the first name field in the
registration form.

#### Page Messages

For messages used in a specific page, we use the following naming convention:

```
{page}.{section}.{...}
```

For example, `blog.cta.learn_more` is the message ID for the call-to-action button in the blog page.
