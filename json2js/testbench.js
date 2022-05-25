

var HTML_Button_signature = {
    name: "HTML_Button",
    inputs: [],
    outputs: [{name:"click", structure:["click"]}]
}


var HTML_Button_protoImplementation = {
    name: "HTML_Button",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        me.send ("click", true);
    }
}

function HTML_Button (container, instancename) {
    let me = new Leaf (HTML_Button_signature, HTML_Button_protoImplementation, container, instancename);
    return me;
}



var Input_Text_signature = {
    name: "Input_Text",
    inputs: [{name:"go", structure:["go"]}],
    outputs: [{name:"text", structure:["text"]}]
}


var Input_Text_protoImplementation = {
    name: "Input_Text",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        console.log ('input 1');
    me.send ("text", getText ('src'));

    }
}

function Input_Text (container, instancename) {
    let me = new Leaf (Input_Text_signature, Input_Text_protoImplementation, container, instancename);
    return me;
}



var Phrase_Parser_signature = {
    name: "Phrase_Parser",
    inputs: [{name:"phrase", structure:["phrase"]}],
    outputs: [{name:"order no choices", structure:["order_no_choices"]}, {name:"order with choices", structure:["order_with_choices"]}, {name:"parse error", structure:["parse_error"]}, {name:"hook error", structure:["hook_error"]}]
}



function Phrase_Parser (container, instancename) {
    let me = new Leaf (Phrase_Parser_signature, Phrase_Parser_protoImplementation, container, instancename);
    return me;
}



var junk1_signature = {
    name: "junk1",
    inputs: [{name:"go", structure:["go"]}],
    outputs: [{name:"text", structure:["text"]}]
}


var junk1_protoImplementation = {
    name: "junk1",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        console.log ('junk1');
    var data = {item:"hello", extras: "h extra", condiments: "h condiments"};

console.log (data);
    me.send ("text", data);
    }
}

function junk1 (container, instancename) {
    let me = new Leaf (junk1_signature, junk1_protoImplementation, container, instancename);
    return me;
}



var junk2_signature = {
    name: "junk2",
    inputs: [{name:"go", structure:["go"]}],
    outputs: [{name:"text", structure:["text"]}]
}


var junk2_protoImplementation = {
    name: "junk2",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        console.log ('junk2');
    me.send ("text", {item:"goodbye", extras: "g extra", condiments: "g condiments"});

    }
}

function junk2 (container, instancename) {
    let me = new Leaf (junk2_signature, junk2_protoImplementation, container, instancename);
    return me;
}



var junk3_signature = {
    name: "junk3",
    inputs: [{name:"text1", structure:["text1"]}, {name:"text2", structure:["text2"]}],
    outputs: [{name:"text", structure:["text"]}]
}


var junk3_protoImplementation = {
    name: "junk3",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        console.log ('test 3');
var newdata = Object.assign ({}, message.data);
newdata.item = "test3 ... " + message.data.item;
    console.log (newdata);
me.send ("text", newdata);

    }
}

function junk3 (container, instancename) {
    let me = new Leaf (junk3_signature, junk3_protoImplementation, container, instancename);
    return me;
}



var fanout_signature = {
    name: "fanout",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out1", structure:["out1"]}, {name:"out2", structure:["out2"]}]
}


var fanout_protoImplementation = {
    name: "fanout",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        console.log ('fanout');
    me.send ("out1", message.data);
me.send ("out2", message.data);

    }
}

function fanout (container, instancename) {
    let me = new Leaf (fanout_signature, fanout_protoImplementation, container, instancename);
    return me;
}



var fanout_x_signature = {
    name: "fanout_x",
    inputs: [{name:"in", structure:["in"]}],
    outputs: [{name:"out1", structure:["out1"]}, {name:"out2", structure:["out2"]}]
}


var fanout_x_protoImplementation = {
    name: "fanout_x",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        console.log ('xfanout');
    me.send ("out1", message.data);
me.send("out2", message.data);

    }
}

function fanout_x (container, instancename) {
    let me = new Leaf (fanout_x_signature, fanout_x_protoImplementation, container, instancename);
    return me;
}



var fanin_signature = {
    name: "fanin",
    inputs: [{name:"in1", structure:["in1"]}, {name:"in2", structure:["in2"]}, {name:"in3", structure:["in3"]}],
    outputs: [{name:"out", structure:["out"]}]
}


var fanin_protoImplementation = {
    name: "fanin",
    kind: "leaf",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        console.log ('fan in');
    me.send ("out", message.data);

    }
}

function fanin (container, instancename) {
    let me = new Leaf (fanin_signature, fanin_protoImplementation, container, instancename);
    return me;
}



var Test_Bench_signature = {
    name: "Test_Bench",
    inputs: [],
    outputs: [{name:"food order", structure:["food_order"]}]
}



function Test_Bench_makechildren (container) {
      var child1 = new HTML_Button (container, "HTML Button");
        var child2 = new Input_Text (container, "Input Text");
        var child3 = new junk1 (container, "junk1");
        var child4 = new junk2 (container, "junk2");
        var child5 = new junk3 (container, "junk3");
        var child6 = new fanout (container, "fanout");
        var child7 = new fanout_x (container, "fanout x");
        var child8 = new fanin (container, "fanin");
        var child9 = new Order_Taker (container, "Order Taker");
      var children = [ {name: "HTML Button", runnable: child1}, {name: "Input Text", runnable: child2}, {name: "junk1", runnable: child3}, {name: "junk2", runnable: child4}, {name: "junk3", runnable: child5}, {name: "fanout", runnable: child6}, {name: "fanout x", runnable: child7}, {name: "fanin", runnable: child8}, {name: "Order Taker", runnable: child9} ];
      return children;
}

function Test_Bench_makeconnections (container) {
    var conn10 = {sender:{name: "HTML Button", etag: "click"}, net: "NIY", receivers:  [{name: "junk1", etag: "go"}] };
    var conn11 = {sender:{name: "HTML Button", etag: "click"}, net: "NIY", receivers:  [{name: "junk2", etag: "go"}] };
    var conn12 = {sender:{name: "junk1", etag: "text"}, net: "NIY", receivers:  [{name: "fanout x", etag: "in"}] };
    var conn13 = {sender:{name: "junk2", etag: "text"}, net: "NIY", receivers:  [{name: "_me", etag: "food order"}] };
    var conn14 = {sender:{name: "junk3", etag: "text"}, net: "NIY", receivers:  [{name: "_me", etag: "food order"}] };
    var conn15 = {sender:{name: "fanout x", etag: "out1"}, net: "NIY", receivers:  [{name: "_me", etag: "food order"}] };
    var conn16 = {sender:{name: "fanout x", etag: "out2"}, net: "NIY", receivers:  [{name: "junk3", etag: "text1"}] };
    var connections = [ conn10, conn11, conn12, conn13, conn14, conn15, conn16 ];
    return connections;
}

function Test_Bench_makenets (container) {
    return [];
}

var Test_Bench_protoImplementation = {
    name: "Test_Bench",
    kind: "container",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        deliverInputMessageToAllChildrenOfSelf (me, message);
    }
}

function Test_Bench (container, instancename) {
    let me = new Container (Test_Bench_signature, Test_Bench_protoImplementation, container, instancename);
    me.children = Test_Bench_makechildren (me);
    me.connections = Test_Bench_makeconnections (me);
    me.nets =  Test_Bench_makenets (me);
    me.deliver_input_from_container_input_to_child_input = deliver_input_from_container_input_to_child_input;
    me.deliver_input_from_container_input_to_me_output = deliver_input_from_container_input_to_me_output;
    return me;
}



var Order_Taker_signature = {
    name: "Order_Taker",
    inputs: [{name:"phrase", structure:["phrase"]}],
    outputs: [{name:"food order", structure:["food_order"]}]
}



function Order_Taker_makechildren (container) {
      var child17 = new Phrase_Parser (container, "Phrase Parser");
      var children = [ {name: "Phrase Parser", runnable: child17} ];
      return children;
}

function Order_Taker_makeconnections (container) {
    var conn18 = {sender:{name: "Phrase Parser", etag: "order no choices"}, net: "NIY", receivers:  [{name: "_me", etag: "food order"}] };
    var conn19 = {sender:{name: "Phrase Parser", etag: "order with choices"}, net: "NIY", receivers:  [{name: "_me", etag: "food order"}] };
    var conn20 = {sender:{name: "Phrase Parser", etag: "parse error"}, net: "NIY", receivers:  [{name: "_me", etag: "food order"}] };
    var conn21 = {sender:{name: "Phrase Parser", etag: "hook error"}, net: "NIY", receivers:  [{name: "_me", etag: "food order"}] };
    var conn22 = {sender:{name: "_me", etag: "phrase"}, net: "NIY", receivers:  [{name: "Phrase Parser", etag: "phrase"}] };
    var connections = [ conn18, conn19, conn20, conn21, conn22 ];
    return connections;
}

function Order_Taker_makenets (container) {
    return [];
}

var Order_Taker_protoImplementation = {
    name: "Order_Taker",
    kind: "container",
    begin: function () {},
    finish: function () {},
    handler: function (me, message) {
        deliverInputMessageToAllChildrenOfSelf (me, message);
    }
}

function Order_Taker (container, instancename) {
    let me = new Container (Order_Taker_signature, Order_Taker_protoImplementation, container, instancename);
    me.children = Order_Taker_makechildren (me);
    me.connections = Order_Taker_makeconnections (me);
    me.nets =  Order_Taker_makenets (me);
    me.deliver_input_from_container_input_to_child_input = deliver_input_from_container_input_to_child_input;
    me.deliver_input_from_container_input_to_me_output = deliver_input_from_container_input_to_me_output;
    return me;
}


