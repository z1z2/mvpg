  var prompt = require('prompt');

var variables = 5
var polys = 5
var steps = 5

  var properties = [
    {
      name: 'variables', 
      validator: /^[1-9]+$/,
      warning: 'variables must be from 1 to 9'
    },
    {
      name: 'polys', 
      validator: /^[2-5]+$/,
      warning: 'polys must be from 2 to 5'
    },
    {
      name: 'steps', 
      validator: /^[2-4]+$/,
      warning: 'steps must be from 2 to 4'
    },
    {
      name: 'questions', 
      validator: /^[1-9]+$/,
      warning: 'questions must be from 1 to 9'
    },
  ];

  prompt.start();

  prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    
    if(variables > result.variables)
        variables = result.variables;
    if(polys > result.polys)
        polys = result.polys;
    if(steps > result.steps)
        steps = result.steps;

    for(var q=0; q<result.questions; q++)
        console.log(
            getExpr(steps)
        );

        console.log('\r\n');
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }



var vars='abcdefghijkl';


function getSign(){
    return Math.random()> .5 ? '+':'-';
}

function getCoeff(){
    var c = Math.round(Math.random()*10+1);
    if (c == 1)
        return '';
    else
        return c;    
}

function getExpr(step){
    if(step == 1)
        return vars[(Math.round(Math.random()*10) % variables )]
    else
    {
        var exp = step==steps?'':'(';
        for (var i = 0; i< polys; i++)
        {
            var sign = getSign();
            if(sign=='+' && i==0)
                sign = '';
            exp += (
                sign + getCoeff() + getExpr(step-1)
            );
        }
        exp += step==steps?'':')';
        return exp;
    }
}