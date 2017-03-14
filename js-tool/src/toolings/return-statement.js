var n = require("ast-types").namedTypes;
var types = require("ast-types");
var utils = require('./tool-utils');
module.exports = (ast, tool) => {
    types.visit(ast, {
        visitReturnStatement: function(path) {
            var index = path.name;
            path.node.argument = tool(path.node.argument);
            this.traverse(path);
        }
    });
};
