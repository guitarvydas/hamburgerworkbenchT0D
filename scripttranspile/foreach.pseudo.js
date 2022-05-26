function handler_foreach_0 () {
    this.env = {};
    this.state = 'idle';
    this.me = this;
    this.files = null;
    this.exitstack = [];
    this.exitstates = function () {
	this.exitstack.forEach (fexit => fexit ());
    }

    this.handler = function (message) {
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
    }
    
    function fenter_begin () {
	this.exitstack.push (fexit_begin);
	this.files = fs.readdirSync ("/Users/tarvydas/temp/ps/@book-Hamburger Workbench - A Frivolous Introduction to Ohm-JS");
    }
    function fexit_begin () {
    }
    
    function fbegin (message) {
	switch (message.etag) {
	case 'begin':
	    this.exitstates ();
	    this.state = 'generating';
	    break;
	default:
	}
    }
    
    function fenter_generating () { this.exitstates.push (fexit_generating); }
    function fexit_generating () {}
    function fgenerating (message) {
	switch (message.etag) {
	default:
	    if (file.empty ()) {
		this.exitstates ();
		this.state = 'idle';
		return;
	    } else {
		{
		    var subenv = cons (files.pop (), me.env);
		    me.outputqueue.enqueue ('subenv', subenv);
		}
		me.outputqueue.enqueue ('kick', true);
		this.exitstates ();
		state = 'blocked';
	    }
	    break;
	}
    }
    
    function fenter_block (message) { this.exitstates.push (fexit_block); }
    function fexit_block (message) {}
    function fblock (message) {
	switch (message.etag) {
	case 'resume':
	    this.exitstates ();
	    this.state = 'generating';
	    break;
	default:
	}
    }	
    
}
