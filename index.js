var prompt = require('prompt');
prompt.message = '';
prompt.delimiter = '><'
var readlineSync = require('readline-sync');
var cp = require('child_process');
var nestings = 3
var degrees = 1
var properties = [
    {
        name: 'degrees',
        validator: /^[1-2]{1}$/,
        default: 1,
        warning: 'degrees must be from 1 to 2'
    },
    {
        name: 'questions',
        validator: /^[1-9]{1}$/,
        default: 5,
        warning: 'questions must be from 1 to 9'
    },
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    degrees = result.degrees;

    for (var q = 0; q < result.questions; q++) {

        var expr = '';
        if (degrees == 1)
            expr = getLinear(nestings);
        else
            expr = getHighDegreePoly(degrees);
        console.log('\n\n' + (q + 1) + '] ' +
            expr
        );

        expr = expr.replace(/\+/g, '%2B');
        expr = expr.replace(/\(/g, '%5Cleft(');
        expr = expr.replace(/\)/g, '%5Cright)');

        readlineSync.question('Press [Enter] to check the answer!');

        if (require('os').type() == 'Windows_NT')
            cp.exec('start https://www.symbolab.com/solver/polynomial-calculator/' + expr);
        else if (require('os').type() == 'Darwin')
            cp.exec('open "https://www.symbolab.com/solver/polynomial-calculator/' + expr + '"', (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
            });
    }
});

function onErr(err) {
    console.log(err);
    return 1;
}

var vars = 'abcdefghijkl';

function getSign() {
    return Math.random() > .5 ? '+' : '-';
}

function getCoeff() {
    var c = Math.round(Math.random() * 10 + 1);
    if (c == 1)
        return '';
    else
        return c;
}

function getLinear(nesting, idx) {
    if (nesting == 1)
        return vars[idx]
    else {
        var exp = nesting == nestings ? '' : '(';
        var term = Math.ceil(Math.random() * 3) + 1;
        for (var i = 0; i < term; i++) {
            var sign = getSign();
            if (sign == '+' && i == 0)
                sign = '';
            exp += (
                sign + getCoeff() + getLinear(nesting - 1, i)
            );
        }
        exp += nesting == nestings ? '' : ')';
        return exp;
    }
}

function getHighDegreePoly(degree) {
    var ret = '';
    for (var i = 0; i < degree; i++)
        ret += getLinear(2);
    return ret;
}