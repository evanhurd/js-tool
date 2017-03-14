var n = require("ast-types").namedTypes;
var types = require("ast-types");
var utils = require('./tool-utils');
module.exports = (ast, tool) => {
    types.visit(ast, {
        visitVariableDeclaration: function(path) {
            var declarations = path.node.declarations;
            var index = path.name;
            var block = utils.getParentBlock(path);
            utils.reverseForEach(declarations, variableDeclarator => {
                variableDeclarator.init = tool(variableDeclarator.init);
                //block.node.body.splice(index + 1, 0, tool(variableDeclarator.id));
            })
            this.traverse(path);
        }
    });
};
