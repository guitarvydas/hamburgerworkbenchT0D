## xxx.* is a placeholder during dev
## I expect to replace xxx.* with appropriate bits of diagrams/code over time

prep=~/.local/tools/prep
cwd=`pwd`
support=--support=${cwd}/support.js

all: clean script.app.js
	@echo script.js created

dev:
	rm script.json
	make

script.json: script.drawio json2js/script.fmt
	./d2json script.drawio >script.json

script.js: script.json json2js/script.fmt
	(cd json2js ; make script)
	cp json2js/script.js .
	(cd scripttranspile ; make preprocess ; cp out.js ..)
	mv script.js /tmp/script.js
	cat cos.js out.js spost.js >script.js

main: main.js
	node main.js xxx.drawio

jslibs:
	npm install atob pako yargs ohm-js

script.app.js: pre.js cos.js xxx.js post.js parser.js
	cat pre.js cos.js xxx.js parser.js post.js >main.js
	cat pre.js cos.js xxx.js parser.js post.js >script.app.js

clean:
	rm -f main.js
	rm -f script.json 
	rm -f script.js
