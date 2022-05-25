function handler (me, message) {
    var files = fs.readdirSync ("/Users/tarvydas/temp/ps/@book-Hamburger Workbench - A Frivolous Introduction to Ohm-JS");
    var state = 'idle';

    switch (state) {
    case 'idle':
	fbegin (message);
	break;
    case 'generating':
	fgenerating (message);
	break;
    case 'blocked':
	fblocked (message);
	break;
    default:
	throw 'internal error: illegal state in foreach handler';
    };

    function fbegin (message) {
	switch (message.etag) {
	case 'begin':
	    state = 'generating';
	    break;
	default:
	}
    }

    function fgenerating (message) {
	switch (message.etag) {
	default:
	    if (file.empty ()) {
		state = 'blocked';
		return;
	    } else {
		{
		    var subenv = cons (files.pop (), me.env);
		    me.outputqueue.enqueue ('subenv', subenv);
		}
		me.outputqueue.enqueue ('kick', true);
		state = 'blocked';
	    }
	    break;
	}
    }

    function fblock (message) {
	switch (message.etag) {
	case 'resume':
	    state = 'generating';
	    break;
	default:
	}
    }	

}
