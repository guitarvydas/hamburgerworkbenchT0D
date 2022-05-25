

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
