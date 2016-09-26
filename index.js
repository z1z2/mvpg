var prompt = require('prompt');
var readlineSync = require('readline-sync');
var cp = require('child_process');
var variables = 5
var polys = 5
var steps = 5

var properties = [
    {
        name: 'variables',
        validator: /^[1-9]{1}?$/,
        warning: 'variables must be from 1 to 9'
    },
    {
        name: 'polys',
        validator: /^[2-5]{1}?$/,
        warning: 'polys must be from 2 to 5'
    },
    {
        name: 'steps',
        validator: /^[2-5]{1}?$/,
        warning: 'steps must be from 2 to 5'
    },
    {
        name: 'questions',
        validator: /^[1-9]{1}?$/,
        warning: 'questions must be from 1 to 9'
    },
  ];

prompt.start();

prompt.get(properties, function(err, result) {
    if (err) { return onErr(err); }

    if (variables > result.variables)
        variables = result.variables;
    if (polys > result.polys)
        polys = result.polys;
    if (steps > result.steps)
        steps = result.steps;

    for (var q = 0; q < result.questions; q++) {

        var expr = getExpr(steps);
        console.log('\n\n' + (q + 1) + '] ' +
            expr
        );

        expr = expr.replace(/\+/g, '%2B');
        expr = expr.replace(/\(/g, '%5Cleft(');
        expr = expr.replace(/\)/g, '%5Cright)');

        readlineSync.question('Press [Enter] to check the answer!');

        cp.exec('start https://www.symbolab.com/solver/polynomial-calculator/' + expr);
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

function getExpr(step) {
    if (step == 1)
        return vars[(Math.round(Math.random() * 10) % variables)]
    else {
        var exp = step == steps ? '' : '(';
        for (var i = 0; i < polys; i++) {
            var sign = getSign();
            if (sign == '+' && i == 0)
                sign = '';
            exp += (
                sign + getCoeff() + getExpr(step - 1)
            );
        }
        exp += step == steps ? '' : ')';
        return exp;
    }
}