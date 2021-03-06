/**
 * import foo from '~/foo' => PROJECT/src/foo
 * TODO fazer funcionar no server também
 */

module.exports = function (babel) {
    // get the working directory
    var cwd = process.cwd()

    return new babel.Transformer("babel-plugin-project-relative-require", {
        ImportDeclaration: function(node, parent) {
            // probably always true, but let's be safe
            if (!babel.types.isLiteral(node.source)) {
                return node
            }

            var ref = node.source.value;

            // ensure a value, make sure it's not home relative e.g. ~/foo
            if (!ref || ref[0] !== '~') {
                return node
            }

            node.source.value = cwd + '/src/' + node.source.value.slice(2)

            return node
        }
    })
}