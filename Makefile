SCRIPT_DIRNAME=$(shell cd "$(shell dirname "${BASH_SOURCE[0]}" )" && pwd )
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

build:
	npm install ios-browser

start:
	karma start test/karma.conf.js --browsers ~/node_modules/ios-browser/bin/ios-browser

