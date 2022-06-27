# TillTomorrow

Technologies used:
- Azure Cloud
- Angular 13
- Bootstrap 5
- MongoDB

## Local Development
Requires Azure Static App CLI global installation
```bash
npm install -g @azure/static-web-apps-cli
```

### For API
Requires `local.settings.json` to be set. 
```json
{
	"IsEncrypted": false,
	"Values": {
		"CONNECTION_STRING": "dev-connection-string"
	}
}
```

to build API once
```bash
cd ./api
npm run build
```

to start watching API
```bash
cd ./api
npm run watch
```

### VS Code
Just pressing `F5` will be ok, however API watch (or even single build) still have to be started manually.


### Manual (from command prompt)
For building API is in 'For API' section

```bash
npm run build
npx grunt
npx swa start dist/till-tomorrow --api-location=api
```

or for continuous development

```bash
npm run build
npm run watch
npx swa start dist/till-tomorrow --api-location=api
```
