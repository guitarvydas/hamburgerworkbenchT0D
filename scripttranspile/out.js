// COS
// Component Operating System


// messages

function InputMessage (etag, v, who, target, tracer) {
    this.etag = etag;
    this.data = v;
    this.tracer = tracer;
    this.comefrom = who;
    this.target = target;
    this.kind = "i";
    this.toString = function () { return recursiveToString (this); }
}

function OutputMessage (etag, v, who, target, tracer) {
    this.etag = etag;
    this.data = v;
    this.tracer = tracer;
    this.comefrom = who;
    this.target = target;
    this.kind = "o";
    this.toString = function () { return recursiveToString (this); }
}

function recursiveToString (m) {
    if (m) {
        return `(${m.comefrom}->${m.target}::[${m.kind}]${m.etag}:${m.data.toString ()}:${recursiveToString (m.tracer)})`;
    } else {
        return '.';
    }
}

// queue

function Queue () {
    this.queue = [];
    this.empty = function () { return (0 === this.queue.length) };
    this.enqueue = function (item) { this.queue.unshift (item); };
    this.dequeue = function () { return this.queue.pop (); };
    this.forEach = function (f) { return this.queue.forEach (f); };
    this.length = function () { return this.queue.length; };
    this.toArray = function () { return this.queue; }
}

/// routing

function route () {
    var _me = this;
    var _ret = null;

    _me.children.forEach (child => {
        child.runnable.outputQueue.forEach (output_message => {
            var message = output_message;
            var connection = this.find_connection_in__me (this, child, message.etag);
            if (connection) {
                connection.receivers.forEach (dest => {
                    var params = [_me, dest, message];
                    if ((dest.name !== "_me")) {
                        deliver_to_child_input (params);
                    } else if ((dest.name === "_me")) {
                        deliver_to_me_output (params);
                    }
                });
            } else {
            };
        });
        child.runnable.resetOutputQueue ();
    });
    return _ret;
}

deliver_to_child_input = function ([_me, dest, message]) {
    var receiver = _me.lookupChild (dest.name);
    var input_message = new InputMessage (dest.etag, message.data,message.comefrom,receiver.name,message);
    receiver.enqueueInput (input_message);
}

deliver_to_me_output = function ([_me, dest, message]) {
    var output_message = new OutputMessage (dest.etag, message.data,message.comefrom,_me.name,message);
    _me.enqueueOutput (output_message);
}


/// step


Try_component = function () {
    var _ret = undefined;
    var lambdas = {
        main: function (_me, _label) {
            if (_label === 0) {
                if (!_me.has_children ()) {
                    return lambdas.try_self (_me, 1);
                } else {

                    _me.memo_readiness_of_each_child ();
                    _me.step_each_child ();
                    if (!_me.any_child_was_previously_ready ()) {
                        return lambdas.try_self (_me, 2);
                    } else {

                        return lambdas.activated (_me, 0);

                        ;}



                    ;}

            } else {
                _me.panic ("main", _label); 
            }
        },
        try_self: function (_me, _label) {
            if (_label === 0) {
                return lambdas.try_self (_me, 1);
            } else if (_label === 1) {

                return lambdas.try_self (_me, 2);
            } else if (_label === 2) {
                if (!_me.self_has_input ()) {
                    return lambdas.not_activated (_me, 3);
                } else {

                    _me.self_first_step_with_input ();
                    return lambdas.activated (_me, 0);


                    ;}


            } else {
                _me.panic ("try_self", _label); 
            }
        },
        not_activated: function (_me, _label) {
            if (_label === 0) {
                return lambdas.not_activated (_me, 3);
            } else if (_label === 3) {
                return lambdas.finished (_me, 0);


            } else {
                _me.panic ("not_activated", _label); 
            }
        },
        activated: function (_me, _label) {
            if (_label === 0) {
                return lambdas.finished (_me, 0);

            } else {
                _me.panic ("activated", _label); 
            }
        },
        finished: function (_me, _label) {
            if (_label === 0) {
                return _ret;

            } else {
                _me.panic ("finished", _label); 
            }
        },
        _endoflambdas: null
    };
    return (function (_me) { return lambdas.main (_me, 0); });
}


// find_connection

function find_connection (_me, etag) {
    var _ret =  null;
    
    _me.connections.forEach (connection => {
        var sender = connection.sender;
        
        if ((sender.name === "_me") && (sender.etag === etag)) {
            
            _ret = connection;
        }
    });
    return  _ret;
}

// find_connection__in_me

function find_connection_in__me (_me, childname, etag) {
    var _ret =  null;
    
    _me.connections.forEach (connection => {
        var sender = connection.sender;
        
        if ((sender.name === childname) && (sender.etag === etag)) {
            
            _ret = connection;
        }
    });
    return  _ret;
}

// handling for Containers

deliverInputMessageToAllChildrenOfSelf = function (_me, message) {
    var _ret =  null;

    var connection = _me.find_connection (_me, message.etag);
    if (connection) {

        connection.receivers.forEach (dest => {
            var params = [_me, message, dest];
            if ((dest.name !== "_me")) {
                _me.deliver_input_from_container_input_to_child_input (params);
            } else if ((dest.name === "_me")) {
                _me.deliver_input_from_container_input_to_me_output (params);
            }
        });
    } else {
    }
    return  _ret;
}

// message delivery for Containers

function deliver_input_from_container_input_to_child_input (params) {
    var _me = params[0];
    var message = params[1];
    var dest = params[2];

    var destname = dest.name;
    var receiverrunnable = this.lookupChild (destname);
    
    var newm = new InputMessage (dest.etag, message.data, _me.name, receiverrunnable.name, message);
    receiverrunnable.enqueueInput (newm);
}
function deliver_input_from_container_input_to_me_output (params) {
    var _me = params[0];
    var message = params[1];
    var dest = params[2];
    
    var destname = dest.name;
    var receiverrunnable = this.lookupChild (destname);

    var newm = new OutputMessage (dest.etag, message.data, _me.name, receiverrunnable.name, message);
    receiverrunnable.enqueueOutput (newm);
}

// runnable (instances of components)

function send (etag, v, tracer) {
    let m = new OutputMessage (etag, v, this.name, "?", tracer); // Send knows who the sender is, but doesn't yet know who the receiver is
    this.outputQueue.enqueue (m);
}

function inject (etag, v, tracer) {
    let m = new InputMessage (etag, v, ".", undefined);
    this.inputQueue.enqueue (m);
}


function Runnable (signature, protoImplementation, container, instancename) {
    if (instancename) {
        this.name = instancename;
    } else {
        this.name = signature.name;
    }
    this.signature = signature;
    this.protoImplementation = protoImplementation;
    this.container = container;
    this.inputQueue = new Queue ();
    this.outputQueue = new Queue ();
    this.outputs = function () { return this.outputQueue.toArray (); };
    this.env = {};
    this.send = send;
    this.inject = inject;
    this.handler = function (me, message) {
        protoImplementation.handler (me, message);
    };
    this.hasOutputs = function () {return !this.outputQueue.empty ()};
    this.hasInputs = function () {return !this.inputQueue.empty ()};
    this.has_children = function () {return (0 < this.children.length); };
    this.dequeueOutput = function () {return this.outputQueue.dequeue ();};
    this.enqueueInput = function (m) { m.target = this.name; this.inputQueue.enqueue (m); };
    this.enqueueOutput = function (m) { m.target = this.name; this.outputQueue.enqueue (m); };
    this.begin = function () {};
    this.finish = function () {};
    this.resetOutputQueue = function () {
        this.outputQueue = new Queue ();
    }
    this.errorUnhandledMessage = function (message) {
        console.error (`unhandled message in ${this.name} ${message.tag}`);
        //process.exit (1);
        throw 'error exit';
    };
    if (container) {
        this.conclude = container.conclude;
    }
    this.memoPreviousReadiness = function () { this._previouslyReady = this.hasInputs (); };
    this.testPreviousReadiness = function () { return this._previouslyReady; };
    this.ready = this.hasInputs;
    this.busy = function () {return false};
    this.panic = function () { throw "panic"; }
}

function Leaf (signature, protoImplementation, container, name) {
    let me = new Runnable (signature, protoImplementation, container, name);
    me.route = function () { };
    me.children = [];
    me.connections = [];
    me.step = function () {
        if (! this.inputQueue.empty ()) {
            let m = this.inputQueue.dequeue ();
            this.handler (this, m);
        }
    };
    me._previouslyReady = false;
    return me;
}

function Container (signature, protoImplementation, container, instancename) {
    let me = new Runnable (signature, protoImplementation, container, instancename);
    me.route = route;
    me.step = function () {
        // Container tries to step all children,
        // if no child was busy, then Container looks at its own input
        // (logic written in step.drawio -> step.drakon -> step.js ; step returns
        //  a stepper function, which must be called with this)
        var stepperFunction = Try_component ();
        stepperFunction (this);
    },
    me.self_first_step_with_input = function () {
        if (! this.inputQueue.empty ()) {
            let m = this.inputQueue.dequeue ();
            this.handler (this, m);
        }
    },
    me.memo_readiness_of_each_child = function () {
        this.children.forEach (childobject => {
            childobject.runnable.memoPreviousReadiness ();
        });
    };
    me.any_child_was_previously_ready = function () {
        return this.children.some (childobject => {
            return childobject.runnable.testPreviousReadiness ();
        });
    };
    me.step_each_child = function () {
        this.children.forEach (childobject => {
            childobject.runnable.step ();
            childobject.runnable.route ();
        });
    };

    me.any_child_is_busy = function () {
        return this.children.some (childobject => {
            var ready = childobject.runnable.ready ();
            var busy = childobject.runnable.busy ();
            return (ready || busy);
        });
    }
    
    me.self_has_input = me.hasInputs;
    me.ready = me.hasInputs;
    me.busy = me.any_child_is_busy;
    me.hasWorkToDo = function () {
        var ready = this.ready ();
        var busy = this.busy ();
        return (ready || busy);
    };

    me.find_connection = find_connection;
    me.find_connection_in__me = function (_me, child, etag) {
        return find_connection_in__me (this, child.name, etag);
    };
    me.lookupChild = function (name) {
        var _ret = null;
        this.children.forEach (childobj => {
            if (childobj.name === name) {
                _ret = childobj.runnable;
            }
        });
        if (_ret === null) {
            console.error (`child '${name}' not found in '${this.name}'`);
            //process.exit (1);
            throw 'error exit';
        };
        return _ret;
    }
    if (protoImplementation.begin) {
            me.begin = protoImplementation.begin;
    }
    if (protoImplementation.finish) {
        me.finish = protoImplementation.finish;
    }
    me._done = false;
    me.conclude = function () { 
        this.container._done = true; 
    };
    me.done = function () {return this._done;};
    me.resetdone = function () {this._done = false;}
    me.wakeup = function () {
        if (this.container) {
            this.route ();
            this.container.wakeup (); // keep punting upwards until at top
        } else {
            this.resetdone ();
            this.route ();
            while ( (!this.done ()) && this.hasWorkToDo () ) {
                this.step ();
                this.route ();
            }
        }
    }

    return me;
}



var noname_1_signature = {
    name: "noname_1",
    inputs: [{name:"env", structure:["env"]}, {name:"baton", structure:["baton"]}],
    outputs: [{name:"env", structure:["env"]}, {name:"baton", structure:["baton"]}]
}


var noname_1_protoImplementation = {
    name: "noname_1",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        
console.log ('rm -rf "/tmp/iwantahamburger/*"')
if (message.etag === "env") {
  this.env = message.data;
} else {
require('child_process').execSync('rm -rf "/tmp/iwantahamburger/*"')
}

    }
}

function noname_1 (container, instancename) {
    let me = new Leaf (noname_1_signature, noname_1_protoImplementation, container, instancename);
    return me;
}



var noname_2_signature = {
    name: "noname_2",
    inputs: [{name:"env", structure:["env"]}, {name:"baton", structure:["baton"]}],
    outputs: [{name:"env", structure:["env"]}, {name:"baton", structure:["baton"]}]
}


var noname_2_protoImplementation = {
    name: "noname_2",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        
console.log ('cp "«f»" "/tmp/iwantahamburger"');
if (message.etag === "env") {
  this.env = message.data;
} else {
require('child_process').execSync('cp "«f»" "/tmp/iwantahamburger"')
}

    }
}

function noname_2 (container, instancename) {
    let me = new Leaf (noname_2_signature, noname_2_protoImplementation, container, instancename);
    return me;
}



var noname_3_signature = {
    name: "noname_3",
    inputs: [{name:"env", structure:["env"]}, {name:"baton", structure:["baton"]}],
    outputs: [{name:"env", structure:["env"]}, {name:"baton", structure:["baton"]}]
}


var noname_3_protoImplementation = {
    name: "noname_3",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        
console.log ('mv "/tmp/iwantahamburger/hw_book.md" "/tmp/iwantahamburger/book.md"');
if (message.etag === "env") {
  this.env = message.data;
} else {
require('child_process').execSync('mv "/tmp/iwantahamburger/hw_book.md" "/tmp/iwantahamburger/book.md"')
}


    }
}

function noname_3 (container, instancename) {
    let me = new Leaf (noname_3_signature, noname_3_protoImplementation, container, instancename);
    return me;
}



var script_signature = {
    name: "script",
    inputs: [{name:"env", structure:["env"]}, {name:"baton", structure:["baton"]}],
    outputs: [{name:"out", structure:["out"]}]
}



function script_makechildren (container) {
      var child1 = new noname_1 (container, "noname_1");
        var child2 = new noname_2 (container, "noname_2");
        var child3 = new noname_3 (container, "noname_3");
        var child4 = new noname_0 (container, "noname_0");
      var children = [ {name: "noname_1", runnable: child1}, {name: "noname_2", runnable: child2}, {name: "noname_3", runnable: child3}, {name: "noname_0", runnable: child4} ];
      return children;
}

function script_makeconnections (container) {
    var conn5 = {sender:{name: "noname_0", etag: "baton"}, net: "NIY", receivers:  [{name: "noname_1", etag: "baton"}] };
    var conn6 = {sender:{name: "noname_1", etag: "env"}, net: "NIY", receivers:  [{name: "noname_2", etag: "env"}] };
    var conn7 = {sender:{name: "noname_1", etag: "baton"}, net: "NIY", receivers:  [{name: "noname_2", etag: "baton"}] };
    var conn8 = {sender:{name: "noname_2", etag: "env"}, net: "NIY", receivers:  [{name: "noname_3", etag: "env"}] };
    var conn9 = {sender:{name: "noname_2", etag: "baton"}, net: "NIY", receivers:  [{name: "noname_3", etag: "baton"}] };
    var conn10 = {sender:{name: "_me", etag: "env"}, net: "NIY", receivers:  [{name: "noname_0", etag: "env"}] };
    var conn11 = {sender:{name: "_me", etag: "baton"}, net: "NIY", receivers:  [{name: "noname_0", etag: "baton"}] };
    var conn12 = {sender:{name: "noname_0", etag: "env"}, net: "NIY", receivers:  [{name: "noname_1", etag: "env"}] };
    var connections = [ conn5, conn6, conn7, conn8, conn9, conn10, conn11, conn12 ];
    return connections;
}

function script_makenets (container) {
    return [];
}

var script_protoImplementation = {
    name: "script",
    kind: "container",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        deliverInputMessageToAllChildrenOfSelf (me, message);
    }
}

function script (container, instancename) {
    let me = new Container (script_signature, script_protoImplementation, container, instancename);
    me.children = script_makechildren (me);
    me.connections = script_makeconnections (me);
    me.nets =  script_makenets (me);
    me.deliver_input_from_container_input_to_child_input = deliver_input_from_container_input_to_child_input;
    me.deliver_input_from_container_input_to_me_output = deliver_input_from_container_input_to_me_output;
    return me;
}



var noname_0_signature = {
    name: "noname_0",
    inputs: [{name:"baton", structure:["baton"]}, {name:"env", structure:["env"]}],
    outputs: [{name:"env", structure:["env"]}, {name:"baton", structure:["baton"]}]
}


var noname_0_protoImplementation = {
    name: "noname_0",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        
console.log (`foreach tag=/${message.etag}/`);
//console.log ('foreach '); console.log (message.etag);
var fs = require ('fs');
if (message.etag === "env") {
  this.env = message.data;
} else {
var files = fs.readdirSync ("/Users/tarvydas/temp/ps/@book-Hamburger Workbench - A Frivolous Introduction to Ohm-JS");
files.forEach (f => { me.send ("out", f); });
}

    }
}

function noname_0 (container, instancename) {
    let me = new Leaf (noname_0_signature, noname_0_protoImplementation, container, instancename);
    return me;
}





function main () {
    // don't edit this, edit spost.js instead
    argv = require('yargs/yargs')(process.argv.slice(2)).argv;
    var scrpt = new script (null, "script");
    var env = {argv: argv};
    scrpt.inject ("env", env);
    scrpt.inject ("baton", true);
    scrpt.wakeup ();
    let outs = scrpt.outputs ();
    outs.forEach (o => {
	console.log (o);
    });
}    


main ();

