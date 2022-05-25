

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
        ❮
 
delete all files in "/tmp/iwantahamburger" 
❯
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
        ❮
 
copy «f» to "/tmp/iwantahamburger" 
❯
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
        ❮ rename "/tmp/iwantahamburger/hw_book.md" "/tmp/iwantahamburger/book.md" ❯

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
        ❮
  for each file in '/Users/tarvydas/temp/ps/@book-Hamburger Workbench - A Frivolous Introduction to Ohm-JS' 
⇉ «f» 
❯
    }
}

function noname_0 (container, instancename) {
    let me = new Leaf (noname_0_signature, noname_0_protoImplementation, container, instancename);
    return me;
}


