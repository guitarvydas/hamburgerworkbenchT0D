prep=./prep/prep
cwd=`pwd`
support=--support=${cwd}/support.js

all: clean main.js testbench.json testbench.js script.js
	@echo Now, load 'hamburgerworkbench0d/hamburger0d.html' into a browser

testbench.json:
	./d2json testbench.drawio >testbench.json

testbench.js: testbench.json
	(cd json2js ; make dev)
	cp json2js/testbench.js .

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
	node main.js d2f.drawio

jslibs:
	npm install atob pako yargs ohm-js

main.js: pre.js cos.js d2f.js funcs.js post.js parser.js
	cat pre.js cos.js d2f.js funcs.js parser.js post.js >main.js
	cat pre.js cos.js d2f.js funcs.js parser.js post.js >d2jsonmain.js

clean:
	rm -f main.js
	rm -f testbench.json 
	rm -f testbench.js
