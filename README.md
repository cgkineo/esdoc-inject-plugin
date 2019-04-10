# ESDoc inject plugin
Allow you to inject css or js into the ESDoc html ouput.

## Install
```bash
npm install esdoc-inject-plugin
```

## Config
```json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {
      "name": "esdoc-inject-plugin",
      "option": {
        "styles": [
          //"esdoc/layout.css"
        ],
        "scripts": [
          //"esdoc/modifier.js"
        ]
      }
    }
  ]
}
```

## LICENSE
GPL
