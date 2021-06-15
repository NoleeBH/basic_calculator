
var textResultado = false;
var textOperador = false;
var textPunto=false;
var numParentesis = 0;

const parentesisAbierto = numParentesis=>{
document.getElementById('mensaje').innerHTML=`paréntesis abiertos: ${numParentesis}`;
}

parentesisAbierto(numParentesis);

const ingresar = numero => {
  if(textResultado){
    limpiar();
    document.getElementById('resultadoHTML').value += numero;
    textResultado = false;
  }else
  document.getElementById('resultadoHTML').value += numero;
  textOperador = false;
  textGroup1 =true;
}

const operador1 = operador=> {
  const resu =document.getElementById('resultadoHTML').value;
  const operador2 = resu.slice(-1)

  if(resu===""){
    if(operador!=="*"&&operador!=="/"){
      document.getElementById('resultadoHTML').value += operador;
    }
  }else{
    if(operador2==="("&&operador!=="*"&&operador!=="/"){
      document.getElementById('resultadoHTML').value += operador;
      textResultado = false;

    }else{
      if(operador2!=="+"&&operador2!=="-"&&operador2!=="*"&&operador2!=="/"&&operador2!=="("){
        document.getElementById('resultadoHTML').value += operador;
        textPunto=false;
        textResultado = false;
      }
    }
  }
}

const parentesis1 = parentesis =>{
  const resultadoTexto =document.getElementById('resultadoHTML').value;
  const ultimoString = resultadoTexto.slice(-1)

  if(resultadoTexto===""&&parentesis!==")"){
    document.getElementById('resultadoHTML').value += operador;
    numParentesis+=1;
    parentesisAbierto(numParentesis);;

  }else{
    if(parentesis==="("){
      if(ultimoString==='+'||ultimoString==='-'||ultimoString==='*'||ultimoString==='/'||ultimoString==='('){

        document.getElementById('resultadoHTML').value += parentesis;
        numParentesis+=1;
        parentesisAbierto(numParentesis);;

      }
    }else{//parentesis=")"
      if(resultadoTexto!==""&&numParentesis>0&&ultimoString!=="("&&ultimoString!=='+'&&ultimoString!=='-'&&ultimoString!=='*'&&ultimoString!=='/'&&ultimoString!=='.'){
        document.getElementById('resultadoHTML').value += parentesis;
        numParentesis-=1;
        parentesisAbierto(numParentesis);;
      }
      
    }

  }
}

const punto = punto =>{
  if(textResultado){
    limpiar();
    textResultado = false;
  }
  if(!textPunto){
    document.getElementById('resultadoHTML').value += punto;
    textPunto=true;
  }
    
}

const calcular = ()=> {
  document.getElementById('resultadoHTML').value =eval(resultadoHTML.value);
  textResultado = true;
  textPunto=false;
}

const limpiar =()=> {
  document.getElementById('resultadoHTML').value='';
  numParentesis=0;
  parentesisAbierto(numParentesis);;

}

const borrarUno =()=> {
  ultimoString = document.getElementById('resultadoHTML').value.slice(-1);
  if(ultimoString==="("){
    numParentesis-=1;
    parentesisAbierto(numParentesis);;

  }
  if(ultimoString===")"){
    numParentesis+=1;
    parentesisAbierto(numParentesis);;

  }
  document.getElementById('resultadoHTML').value=document.getElementById('resultadoHTML').value.slice(0,-1);
}
