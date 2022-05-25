grammar=../grammar/djson.ohm
prep=~/.local/tools/prep
format=djson.fmt
src=../testbench.json
target=`basename ${src} .json`
here=`pwd`

scriptsrc=../script.json
scripttarget=`basename ${scriptsrc} .json`
scriptformat=script.fmt


xg=ASCxform
xfmt1=../json2xform/xdjson.fmt
xfmt2=../json2xform/xdjson2.fmt

dev:
	cp ${src} .
	${prep} "." '$$' ${grammar} ${xfmt1} --stop=1 --fmt=${here}/fmt.js --grammarname=${xg} --erroview <${src} >${target}-1.json
	${prep} "." '$$' ${grammar} ${xfmt2} --stop=1 --fmt=${here}/fmt.js --grammarname=${xg} --erroview <${target}-1.json >${target}-2.json
	${prep} "." '$$' ${grammar} ${format} --stop=1 --fmt=${here}/fmt.js --grammarname=ASC2py --errorview <${target}-2.json >${target}.js

script: ${grammar} ${scriptformat} ${scriptsrc}
	cp ${scriptsrc} .
	${prep} "." '$$' ${grammar} ${xfmt1} --stop=1 --fmt=${here}/fmt.js --grammarname=${xg} --erroview <${scriptsrc} >${scripttarget}-1.json
	${prep} "." '$$' ${grammar} ${xfmt2} --stop=1 --fmt=${here}/fmt.js --grammarname=${xg} --erroview <${scripttarget}-1.json >${scripttarget}-2.json
	${prep} "." '$$' ${grammar} ${scriptformat} --stop=1 --fmt=${here}/fmt.js --grammarname=ASC2py --errorview <${scripttarget}-2.json >${scripttarget}.js

