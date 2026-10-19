# UIComponents

Private component library for CmsTags. This folder **is** the repository
[github.com/ByCMSTags/UIComponents](https://github.com/ByCMSTags/UIComponents).

The GitHub repository does not exist yet. Do not create it from the install CLI.
Create an empty repository named `UIComponents` in the `ByCMSTags` organization
(no README, no license file on GitHub), then push this folder.

Each component is one top-level folder. From `CmsTagsWebsiteNew`, `.\cmstags.ps1 install hero.split` downloads
**only** that folder into `./components/hero.split`.

## Push

From this directory:

```bash
git init
git add .
git commit -m "Add CmsTags UI components"
git branch -M main
git remote add origin https://github.com/ByCMSTags/UIComponents.git
git push -u origin main
```

Later changes: commit in this folder and `git push`. Or, after the remote exists,
from this directory:

```bash
npm run cmstags -- publish hero.split
```

`cmstags publish` needs `GITHUB_TOKEN` and pushes that one folder. It does not
create the GitHub repository.

## Component format

```
hero.split/
  component.json    fields, defaults, placeholder tokens, name
  template.html     HTML with {{placeholders}} and Bootstrap classes
  style.scss        extra rules
  style.css         compiled CSS
  script.js         optional browser behaviour (init)
  preview.webp      picture shown in the builder
```

`component.json`:

| Key | Meaning |
| --- | --- |
| `id` | Folder name, like `hero.split`. |
| `version` | Component version recorded in `registry.json`. |
| `category` | `hero`, `features`, `header`, `footer`, … |
| `kind` | `single` (one record), `list` (many records), `site` (header or footer). |
| `fields` | CMS fields. A `repeater` has `subFields`. |
| `defaults` | Values used when the CMS record leaves a field empty. |
| `placeholders` | Tokens to paste into `template.html`. Inside a repeater, use the sub-field token (`{{title}}`), between `{{#items}}` and `{{/items}}`. |

`registry.json` is an index (`id`, version, category, name). The install command
does not need it: it fetches `/repos/ByCMSTags/UIComponents/contents/<id>`.

## Add a component

1. Copy a nearby folder, for example `hero.split` → `hero.banner`.
2. Set `id` to the folder name. Edit `template.html`, `fields`, and `defaults`.
3. Put each field's token in the HTML (`{{title}}`, and `{{#items}}…{{/items}}` for a list).
4. Compile `style.css` from `style.scss` (Dart Sass, or copy the rules into `style.css`). Add the folder's id and version to `registry.json`.
5. Push, using the commands above.

## Run this project

```bash
npm start
```

Preview at http://127.0.0.1:4193. No install step: this folder has no dependencies.

Publish one component after the GitHub repository exists (CLI is in `cli/`):

```bash
# PowerShell
$env:GITHUB_TOKEN = "github_pat_..."
npm run cmstags -- publish hero.split
```

## تثبيت مكوّن واحد

المستودع الخاص هو `ByCMSTags/UIComponents`. كل مكوّن مجلد في جذر المستودع.
من مجلد الموقع `CmsTagsWebsiteNew`، الأمر `.\cmstags.ps1 install hero.split` يجلب ذلك المجلد فقط إلى `./components/hero.split`.

ادفع هذا المجلد بعد إنشاء مستودع فارغ على GitHub:

```bash
git init
git add .
git commit -m "Add CmsTags UI components"
git branch -M main
git remote add origin https://github.com/ByCMSTags/UIComponents.git
git push -u origin main
```
