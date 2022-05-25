prep=~/.local/tools/prep
cwd=`pwd`
grammar=fanout.ohm
identity-format=identity-dr.fmt
src=dr-fanout.das
target=dr-fanout.py

all: identity

identity:
	${prep} "." '$$' ${grammar} ${identity-format} --stop=1 ${support} <${src}

${target}:
	${prep} "." '$$' ${grammar} ${format} --stop=1 ${support} <${src} >${target}

