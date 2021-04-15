# Description

Test and play around with React and Sanity.io

## Installation & Setup

* Init fresh React App

```bash
npx create-react-app sanity-playground
cd sanity-playground
code .
```

* Install & Setup Sanity

```bash
# Sanity-CLI
sudo npm install -g @sanity/cli
sanity login
# Sanity-Client
npm install @sanity/client
```

* Create new Sanity-Project

```bash
sanity init
```

* Allow CORS: on `manage.sanity.io` > sanity-playground project > Settings > API > Add New Origin > Add `http://localhost:3000`

## Sanity-CLI Commands

## Run & Develop

```bash
cd /Users/hans/git/React/sanity-playground/Users/hans/git/React/sanity-playground/sa
# to open the documentation in a browser
sanity docs
# to open the project settings in a browser
sanity manage
# to explore the CLI manual
sanity help
# to run your studio
sanity start
```

```bash
npm start
```

## Deploy to `Netlify`

```bash
git push
sanity deploy
```

## Environments

`create-react-app` allows for usage of environment variables. Of course, they are different to server-side environment variables, where we'd store our sensitive information.

According to [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/), we can use different `.env` files as per following patterns:

### Environment variables have to be

* prefixed with `REACT_APP_`
* defined in a `.env` file
* accessed through `process.env.REACT_APP_`

It is possible to have 3 different environment files, and since they don't hold sensitive information, it is **recommended** that they are checked into version control.

### Current Environment

* There is a built-in environment variable called `NODE_ENV`
* You can read it from `process.env.NODE_ENV`
* When you run `npm start`, it is always equal to `'development'`
* when you run `npm test` it is always equal to `'test'`
* and when you run `npm run build` to make a production bundle, it is always equal to `'production'`
* You cannot override `NODE_ENV` manually

### Priorities

Files on the left have more priority than files on the right:

* `npm start`: `.env.development.local`, `.env.local`, `.env.development`, `.env`
* `npm run build`: `.env.production.local`, `.env.local`, `.env.production`, `.env`
* `npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

### Example

We want to have a `dev` and a `prod` dataset.

* `dev` dataset is specified in `.env.development` and used when application is started with `npm start`
* `prod` dataset is specified in `.env.production` and used when application is started with `npm run build`
* we do not use `.env` since it can be used in any of the above environments if no other configuration applies. We want to avoid any implicit configuration in favor of strong data integrity.

## Important Documentation

* [Previews](https://www.sanity.io/docs/previews-list-views)
* [Arrays](https://www.sanity.io/docs/array-type)
* [Block](https://www.sanity.io/docs/block-type)
* [Blocks configuration](https://www.sanity.io/docs/configuration)

## Advanced Previewing using React-Component

* [Inspiration 1](https://www.sanity.io/docs/previews-list-views)
* [block-array.js](https://github.com/sanity-io/sanity/blob/85460b109dfb8fae88a65530639ec9a0be10e50e/packages/example-studio/schemas/block-array.js#L29)
* [VideoEmbedPreview.js](https://github.com/sanity-io/sanity/blob/85460b109dfb8fae88a65530639ec9a0be10e50e/packages/example-studio/components/VideoEmbedPreview.js)

## Save HTML injection from CMS

* Dangerous and bad practice

```js
<div dangerouslySetInnerHTML={{ __html: htmlString }} />
```

* [html-react-parser](https://www.npmjs.com/package/html-react-parser)

```js
// ES6 import
import parse from 'html-react-parser';

// example usage
parse('<li>Item 1</li><li>Item 2</li>');

// render
return (
    <ul>
    {parse(`
        <li>Item 1</li>
        <li>Item 2</li>
    `)}
    </ul>
)
```

* [dompurify](https://www.npmjs.com/package/dompurify)

```js
import DOMPurify from 'dompurify';

const cleanHtmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true } });
```

* `html-react-parser` and `dompurify` combined

```js
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const cleanHtmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true } });
const html = parse(cleanHtmlString);
```

* Install

```bash
npm install html-react-parser dompurify
```

## Structure Builder

Structure Builder is an API meant to help reorganize flows and documents inside of Sanity Studio.

* [Introduction](https://www.sanity.io/docs/structure-builder-introduction)
* [Basic Override of the default structure / Customization](https://www.sanity.io/docs/set-up-structure-builder-to-override-the-default-list-view)
* [Getting Started](https://www.sanity.io/guides/getting-started-with-structure-builder)
* [Typical Use Cases](https://www.sanity.io/docs/structure-builder-typical-use-cases)

### Steps for singleton document

* Create Schema for singleton document

```js
export default {
    name: 'order',
    title: 'Reihenfolge',
    type: 'document',
    fields: [
        {
            name: 'order',
            title: 'Reihenfolge',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }]
        }
    ],
    // fix the preview, since the first field is used for the default title which is in our case an array
    preview: {
        select: {},
        prepare(selection) {
            return {
                title: 'Reihenfolge der Speisen'
            }
        }
    }
}
```

* Be sure to import and specify this in your project's `/schemas/schema.js` file.

* Create one document in Sanity Studio and publish it

* Click inspect > Raw JSON

* It should look like below. We need the `_id`:

```json
{
  "_createdAt": "2021-04-15T11:24:33Z",
  "_id": "2a101cc9-32ce-4654-8039-5312e9257aac",
  "_rev": "oBhmhuXT2DnVo2ZNcKZO7W",
  "_type": "order",
  "_updatedAt": "2021-04-15T11:24:33Z",
  "order": [
    {
      "_key": "118560c4aeca",
      "_ref": "21fb0f25-99a0-485a-85f3-8a2236cad449",
      "_type": "reference"
    },
    {
      "_key": "5ff39ee1568f",
      "_ref": "drafts.2221ceb9-2555-4463-8887-689b169d308a",
      "_type": "reference"
    }
  ]
}
```

* Make sure to disallow `create`and `delete` for the singleton documents inside the schema by using `__experimental_actions`. With that change, this document-instance cannot be deleted and new instances cannot be created. So it is already a singleton.

```js
export default {
    name: 'order',
    title: 'Reihenfolge',
    type: 'document',
    __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
    fields: [
        {
            name: 'order',
            title: 'Reihenfolge',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }]
        }
    ],
    // fix the preview, since the first field is used for the default title which is in our case an array
    preview: {
        select: {},
        prepare(selection) {
            return {
                title: 'Reihenfolge der Speisen'
            }
        }
    }
}
```

* Create custom Structure Builder

```js
// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder'

export default () =>
    S.list()
        .title('Inhalt')
        .items([
            S.listItem()
                .title('Reihenfolge der Speisen')
                .child(
                    S.document()
                        .schemaType('order')
                        .documentId('2a101cc9-32ce-4654-8039-5312e9257aac')
                ),
            ...S.documentTypeListItems().filter(listItem => !['order'].includes(listItem.getId()))
        ])
```

* Add `deskStructure.js` to the root of the studio

```js
// /sanity.json
"parts": [
    {
      "name": "part:@sanity/base/schema",
      "path": "./schemas/schema.js"
    },
    // add this
    {
      "name": "part:@sanity/desk-tool/structure",
      "path": "./deskStructure.js"
    }
  ]
```

* Restart sanity studio

## GROQ

[Introduction](https://www.sanity.io/docs/how-queries-work)

## Backlog

* [ ] Create own Meals-Schema
* [x] Use different `.env` files for different Sanity-Datasets
* [ ] Create own Github-Repo and push
* [ ] Is there an open-source schema-builder UI for Sanity-Studio available?

## Credits

I want to say thank you to the wonderful [Kapehe](https://twitter.com/kapehe_ok​) for her amazing [Build a Portfolio Website With React & Sanity.io](https://www.youtube.com/watch?v=NO7_jgzVgbc&t=2337s) Video-Tutorial. Definitely need to check this out if you want to get started with `Sanity.io`
