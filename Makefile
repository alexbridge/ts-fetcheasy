link-globally:
	npm link

build:
	npm run build

check:
	npm run test

minor-version: check
	npm version minor

patch-version: check
	npm version patch

npm-publish: build minor-version
	npm publish --access public