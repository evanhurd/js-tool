var esprima = require('esprima');
var types = require("ast-types");
var escodegen = require('escodegen');
var b = require("ast-types").builders;
var VariableDeclarations = require('./toolings/variable-declarations');
var AssignmentExpression = require('./toolings/assignment-expression');
var FunctionArgument = require('./toolings/function-argument');
var ReturnStatement = require('./toolings/return-statement');

function testA(a,b,c,d){
    var a = 0;
    a = 1;
    var a = (a,c,d,f) => a();
    return () => 1;
}



function Tool(arg) {
    return {
        "type": "CallExpression",
        "callee": {
            "type": "Identifier",
            "name": "TEXP"
        },
        "arguments": [arg]
    };
}

function tool(stringyCode) {
    var ast = esprima.parse(stringyCode);
    //VariableDeclarations(ast, Tool);
    AssignmentExpression(ast, Tool);
    FunctionArgument(ast, Tool);
    //ReturnStatement(ast, Tool);
    return escodegen.generate(ast);
}

try {
    chrome.astRun = tool;
}catch(err){
    module.exports = tool;
}
