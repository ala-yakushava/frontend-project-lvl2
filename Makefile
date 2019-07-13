install: 
	npm install

start: 
	npx babel-node src/bin/gendiff.js

publish: 
	npm publish --dry-run

test:
	npx jest

lint: 
	npx eslint .
