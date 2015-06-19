# live-site
Live Site creates a live site from a Google Doc. Ideal for hackathons.

[[Demo](http://mlh.github.io/live-site/#https://docs.google.com/document/d/1-EvnzIhV0UFe8T0Vpfl8nhQR9e7JJMD4Bbdn7yKt0_c/pub)]

### Why Use
Google Docs are easy to create, share, and edit, however simply sharing them doesn't look great. Using Live Site gives you the best of both worlds.

## Usage

### 1. Create A Google Doc
[Create a Google Doc](https://docs.google.com/document/create) and add some content to it.

### 2. Publish the Google Doc
[Publish your document to the web](https://support.google.com/docs/answer/37579?hl=en). You may choose to have the document update automatically (note: this has up to 5m delay) or only when you like.

### 3. Create the site.

To use the default theme, simply append your Google Doc's URL (or id) to the url:

```
http://mlh.github.io/live-site/#
```

#### Examples
- <http://mlh.github.io/live-site/#https://docs.google.com/document/d/1-EvnzIhV0UFe8T0Vpfl8nhQR9e7JJMD4Bbdn7yKt0_c/pub>
- <http://mlh.github.io/live-site/#https://docs.google.com/document/d/1-EvnzIhV0UFe8T0Vpfl8nhQR9e7JJMD4Bbdn7yKt0_c/edit>
- <http://mlh.github.io/live-site/#1-EvnzIhV0UFe8T0Vpfl8nhQR9e7JJMD4Bbdn7yKt0_c>

## YAML Frontmatter
Like many content engines, Live Site allows you to set a variety of options using YAML Frontmatter.

```
---
logo: https://mlh.io/brand-assets/logo-grayscale/mlh-logo-grayscale-small.png
title: LoonHacks - Live
heading: LoonHacks Information
---
```

| Attribute | Value |
|:-----------:|:--------|
| `logo` | `url`, A url representing the hackathon's logo |
| `title` | `string`, The title you want for the page (displayed in the `<title>` tag). |
| `heading` | `string`, The header for the live page. |