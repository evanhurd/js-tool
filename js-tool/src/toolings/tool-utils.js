var n = require("ast-types").namedTypes;

module.exports = {
    reverseForEach: reverseForEach,
    getParentBlock: getParentBlock
};

function reverseForEach(arr, fn) {
    for(var i = arr.length -1; i >= 0; i--) {
        fn(arr[i], i);
    }
}

function getParentBlock(path) {
    while(path && n.BlockStatement.check(path.node) == false) {
        path = path.parentPath;
    }
    return path;
}