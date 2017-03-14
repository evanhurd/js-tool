var n = require("ast-types").namedTypes;
var b = require("ast-types").builders;
var types = require("ast-types");
var utils = require('./tool-utils');
module.exports = (ast, tool) => {
    types.visit(ast, {
        visitFunction: function(path) {
            var expression = path.node;
            var index = path.name;

            if(path.node.expression) {
                var callExpression = path.node.body;
                path.node.body = b.blockStatement([b.returnStatement(callExpression)]);
            }

            utils.reverseForEach(path.node.params, param => {
                var exp = b.expressionStatement(tool(param));
                path.node.body.body.splice(0, 0, exp);
            });

            this.traverse(path);
        }
    });
};
