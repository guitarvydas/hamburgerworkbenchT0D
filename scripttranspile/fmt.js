var argsarray = [];
var fmtarray = [];

exports.resetlists = function () {
    argsarray = [];
    fmtarray = [];
    return "";
}

exports.pusharg = function (s) {
    argsarray.push (s);
    return "";
}

exports.pushfmt = function (s) {
    fmtarray.push (s);
    return "";
}

exports.args = function () {
    var result = "";
    argsarray.forEach (a => {
	result += ` ${a} `;
    });
    return result;
}
exports.fmts = function () {
    var result = "";
    fmtarray.forEach (s => {
	result += ` ${s} `;
    });
    return result;
}


   
