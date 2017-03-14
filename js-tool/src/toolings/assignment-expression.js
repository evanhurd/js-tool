var n = require("ast-types").namedTypes;
var types = require("ast-types");
var utils = require('./tool-utils');
module.exports = (ast, tool) => {
    types.visit(ast, {
        visitAssignmentExpression: function(path) {
            var expression = path.node;
            var index = path.name;
            var block = utils.getParentBlock(path);
            expression.right = tool(expression.right); 
            this.traverse(path);
        }
    });
};
