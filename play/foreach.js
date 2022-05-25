/*
function foreach (me, message){
var files;

}
idle /*state*/: function (me, message) {onbegin{
files = fs.readdirSync ("${s}");return this.generating ());

}
function generating (me, message) {
if (0 === files.length) {
return this.idle ());
      
}else {
var newenv = env.cons ({f: file.unshift ()}, env);
        this.send (env, newenv);
        this.send (kick, true);
      
}return this.blocked ());

}
blocked /*state*/: function (me, message) {onresume{
return this.generating ());

}
*/

function handler_foreach (me, message) {
    var state = 'idle';
    if (state === 'idle') {
        if (message.etag === 'begin') {
            files = fs.readdirSync ("${s}");
	    generating ());
	}
    } else if (state == 'blocked') {
        if (message.etag === 'resume') {
    } else {
	throw "internal error: bad state in handler_foreach";
    }
    var states = {
	idle: 
