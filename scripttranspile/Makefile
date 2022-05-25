prep=~/.local/tools/prep
cwd=`pwd`
grammar=st.ohm
identity-format=identity-st.fmt
format=st.fmt
src=../script.js
target=script.js
support=--fmt=${cwd}/fmt.js

all: identity preprocess

identity:
	${prep} '❮' '❯' ${grammar} ${identity-format} ${support} --errorview --inclusive <${src}

preprocess: ${grammar} ${format}  ${support}
	${prep} '❮' '❯' ${grammar} ${format} ${support} --errorview --inclusive <${src} >out.js

verbatim3: send.ohm send.fmt fmt.js foreach.hsm
	${prep} '```' '```' verbatim3.ohm verbatim.fmt ${support} --inclusive <foreach.hsm

verbatim1: send.ohm send.fmt fmt.js foreach.hsm
	${prep} '`' '`' verbatim1.ohm verbatim.fmt ${support} --inclusive <foreach.hsm

send: send.ohm send.fmt fmt.js foreach.hsm
	${prep} '⇑' '\n' send.ohm send.fmt ${support} <foreach.hsm

next: next.ohm next.fmt fmt.js foreach.hsm
	${prep} '☞' '\n' next.ohm next.fmt ${support} <foreach.hsm

foreach.sm: foreach.mdsm send.ohm send.fmt next.ohm next.fmt
	cat foreach.mdsm \
	| ${prep} '```' '```' verbatim3.ohm verbatim.fmt --inclusive ${support} \
	| tee f.1 \
	| ${prep} '`' '`' verbatim1.ohm verbatim.fmt --inclusive ${support} \
	| tee f.2 \
	| ${prep} '.' '$$' mdsm.ohm mdsm.fmt ${support} --stop=1 --errorview \
	| tee foreach.sm \
	| cat -

foreach.pseudo.sm: foreach.sm
	cat foreach.sm \
	| ${prep} '.' '$$' sm.ohm sm.pseudo.fmt ${support} --stop=1 \
	| tee foreach.pseudo.sm \
	| cat -

# foreach.js: foreach.sm send.ohm send.fmt next.ohm next.fmt

# foreach : foreach.sm
# 	cat foreach.sm \
# 	| ${prep} '.' '$$' hsm.ohm hsm.fmt ${support} --stop=1 --errorview \
# 	| ${prep} '⇑' '\n' send.ohm send.fmt ${support} \
# 	| ${prep} '☞' '\n' next.ohm next.fmt ${support} \
# 	| cat -


dev:
	rm foreach.sm
	rm -f f.*
	make foreach.pseudo.sm
