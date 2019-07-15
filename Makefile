install: 
	npm install

start: 
	npx babel-node src/bin/gendiff.js -h

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npm test -- --coverage

publish: 
	npm publish --dry-run
