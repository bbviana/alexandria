var exec = require('child_process').exec;

var cmd = 'xclip -o';
exec(cmd, function (error, stdout, stderr) {
    console.log(parse(stdout))
})

function parse(text) {
    // remove caracteres inválidos que podem do início de cada regra (acontece ao copiar do chrome dev tools)
    text = text.replace(/.*?(\w.*)/g, '$1')

    // ; => ,
    text = text.replace(/;/g, ',')

    // border-radius => borderRadius
    text = text.replace(/-(\w)/g, function () {
        return arguments[1].toUpperCase()
    })

    // color: red => color: 'red'
    text = text.replace(/:\s*(.+),/g, ": '$1', ")

    // fontSize: '10px' => fontSize: 10
    text = text.replace(/'(\d+)px'/g, "$1")

    // filter e sort
    var lines = text.split('\n')
    text = lines
        .filter(function (l) {
            return l.indexOf(':') != -1;
        })
        .sort()
        .join('\n')
        .replace(/,\s*$/, "")

    return text
}