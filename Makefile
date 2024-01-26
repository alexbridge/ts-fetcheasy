link-globally:
	npm link

build:
	npm run build

minor-version:
	npm version minor

npm-publish: build minor-version
	npm publish --access public