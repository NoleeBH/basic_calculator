var resultExist = false;
var operatorExist = false;
var pointExist=false;
var numberParenthesis = 0;
var pressedCE = false;

const openParenthesis = parenthesis=>{
document.getElementById('menssage-parenthesis').innerHTML=`open parenthesis: ${parenthesis}`;
}

openParenthesis(numberParenthesis);

const enterNumber = enteredNumber => {
  if(resultExist){
    document.getElementById('equation-html').value = enteredNumber;
    document.getElementById('result-html').value = "";

    resultExist = false;
  }else
  document.getElementById('equation-html').value += enteredNumber;
  operatorExist = false;
  textGroup1 =true;
}

const mathematicalOperator = operator=> {
  
  const equation =document.getElementById('equation-html').value;
  const result =document.getElementById('result-html').value;

  const lastString = equation.slice(-1);

  if(resultExist&&operator!=="/"&&operator!=="*"){
    console.log("if 1");

    document.getElementById('equation-html').value  = "";
    document.getElementById('result-html').value  = "";
    resultExist=false;
  }

  if(equation===""){

    if(operator!=="*"&&operator!=="/"){
      console.log("if 3");

      document.getElementById('equation-html').value  += operator;

    }
  }else{
    if(lastString==="("&&operator!=="*"&&operator!=="/"){

      document.getElementById('equation-html').value += operator;
      resultExist = false;

    }else{
      if(lastString!=="+"&&lastString!=="-"&&lastString!=="*"&&lastString!=="/"&&lastString!=="("&&operator!=="*"&&operator!=="/"){

        document.getElementById('equation-html').value += operator;

        pointExist=false;
        resultExist = false;
      }
      if(operator!=='+'&&operator!=='-'&&lastString!=="+"&&lastString!=="-"&&lastString!=="*"&&lastString!=="/"&&lastString!=="("&&result===""){
        document.getElementById('equation-html').value += operator;
        pointExist=false;
        resultExist = false;
      }


    }
  }
}

const parenthesis = parenthesis =>{
  if(resultExist){
    document.getElementById('equation-html').value = "";
    document.getElementById('result-html').value = "";
    resultExist = false;
  }
  const equation =document.getElementById('equation-html').value;
  const lastString = equation.slice(-1);

  if(equation===""&&parenthesis!==")"){
    document.getElementById('equation-html').value += parenthesis;
    numberParenthesis+=1;
    openParenthesis(numberParenthesis);

  }else{
    if(parenthesis==="("){
      if(lastString==='+'||lastString==='-'||lastString==='*'||lastString==='/'||lastString==='('){

        document.getElementById('equation-html').value += parenthesis;
        numberParenthesis+=1;
        openParenthesis(numberParenthesis);

      }
    }else{//parenthesis=")"
      if(equation!==""&&numberParenthesis>0&&lastString!=="("&&lastString!=='+'&&lastString!=='-'&&lastString!=='*'&&lastString!=='/'&&lastString!=='.'){
        document.getElementById('equation-html').value += parenthesis;
        numberParenthesis-=1;
        openParenthesis(numberParenthesis);
      }
      
    }

  }
}

const enterPoint = point =>{
  if(resultExist){
    clearAll();
    resultExist = false;
  }
  if(!pointExist){
    document.getElementById('equation-html').value += point;
    pointExist=true;
  }
    
}

const calculate = ()=> {
  var equation = document.getElementById('equation-html').value;
  var result = eval(equation);
  document.getElementById('result-html').value =result;//addlast
  resultExist = true;
  pointExist=false;
  savingResult(equation,result);
  pressedCE=false;

}

const clearAll =()=> {
  document.getElementById('equation-html').value='';
  document.getElementById('result-html').value='';
  numberParenthesis=0;
  openParenthesis(numberParenthesis);
  pressedCE=true;
  pointExist=false;
  operatorExist = false;

}

const deleteOne =()=> {
  lastString = document.getElementById('equation-html').value.slice(-1);
  if(lastString==="("){
    numberParenthesis-=1;
    openParenthesis(numberParenthesis);

  }
  if(lastString===")"){
    numberParenthesis+=1;
    openParenthesis(numberParenthesis);

  }
  if(pointExist){
    pointExist=false;
  }
  document.getElementById('equation-html').value=document.getElementById('equation-html').value.slice(0,-1);
}

const registerResult = [
  {equation:'none',solution:'none'},
  {equation:'none',solution: "none"}
]
const previouResult =()=>{
  let numberArray = registerResult.length;

  if(pressedCE){
    document.getElementById('result-html').value = registerResult[numberArray-1].solution;
    document.getElementById('equation-html').value = registerResult[numberArray-1].equation;
  }else
  document.getElementById('result-html').value = registerResult[numberArray-2].solution;
  document.getElementById('equation-html').value = registerResult[numberArray-2].equation;
}

const savingResult = (equation,solution)=>{

  registerResult.shift();
  registerResult.push({equation:equation,solution:solution});

}
