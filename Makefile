install: 
	npm install

start: 
	npx babel-node src/bin/gendiff.js -h

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npm test -- --coverage

publish: 
	npm publish --dry-run
