(global => {

  const clock = document.getElementById("clock");
  const setTime = () => {
    let d = new Date();
    let hh = d.getHours() + "";
    let mm = d.getMinutes() + "";
    hh = hh.length === 2 ? hh : 0 + hh;
    mm = mm.length === 2 ? mm : 0 + mm;
    clock.innerHTML = hh + ":" + mm;
  }
  setTime();
  setInterval(setTime, 6000);
  const capp = {
    display: {

      h2: {
        el: document.getElementById("result"),
        update: (str = "0", clear = false) => {
          if (clear) {
            capp.display.h2.el.innerHTML = str;
          } else {
            capp.display.h2.el.innerHTML += str;
          }
        }
      },
      h3: {
        el: document.getElementById("operation"),
        update: (str = "", clear = false) => {
          if (clear) {
            capp.display.h3.el.innerHTML = str;
          } else {
            capp.display.h3.el.innerHTML += str;
          }

        }

      }
    },

    validKeys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Enter", "Backspace", "+", "-", "*", "/", ".","%","+/-", "Escape"],
    savedNumbers: ["", ""],
    input: {
      value: "",
      isFloat: false,
      save: (index) => {
        const value = parseFloat(capp.input.value);
        capp.savedNumbers[index] = value;
      },
      addChar: (str) => {
        capp.input.value += str;
      },
      deleteLastChar: () => {
        capp.input.value = capp.input.value.slice(0, -1);
        //capp.nums[capp.currentNum] = capp.nums[capp.currentNum].slice(0, -1);
      },
    },
    operationStr: "",
    operator: "",


    getResult: () => {
      console.log("run");
      const a = capp.savedNumbers[0];
      const b = capp.savedNumbers[1];
      
      switch (capp.operator) {
        case "+":
          return a + b;

        case "-":
          return a - b;
        case "/":
          return a / b;

        case "*":
          return a * b;
        
          case "%":
          return a % b;

      }

    },
    clear: () => {
      capp.input.value = "";
      capp.input.isFloat = false;
      capp.operator ="";
      capp.display.h2.update("0", true);
      capp.display.h3.update("", true);
      capp.savedNumbers = ["", ""];
    }
  };
 

  const controller = (btn)=>{

    console.log(capp.input.isFloat);
    console.log(btn);
    let isValid = capp.validKeys.indexOf(btn) !== -1;
    if (isValid) {
      switch (btn) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          let bool = capp.input.value === "";
          capp.input.value += btn;
          
          capp.display.h2.update(btn,bool);
          break;
        case "+/-":
          if (capp.input.value) {
            const value = capp.input.value[0] === "-" ? capp.input.value.slice(1) : "-"+capp.input.value;
            capp.input.value = value;
            capp.display.h2.update(value,true);
          }
          
          break;
        case ".":
          console.log(capp.input.isFloat);
          if (!capp.input.isFloat) {
            console.log("a");
            capp.input.addChar(btn);
            console.log("a")
            capp.display.h2.update(btn);
            console.log("a")
            capp.input.isFloat = true;
          }
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
          if (capp.input.value !=="") { 
            console.log("not empty:" + capp.input.value !=="")// input is not empty
            if (capp.savedNumbers[0] !== "") {
              console.log("not first:" + capp.savedNumbers[0] !== "")
              //not first input
              //calculate then save into the second slot then display h2+h3
              capp.input.save(1);
              let result = capp.getResult();
              capp.operator = btn;
              capp.savedNumbers[0] = result;
              result = result.toString().slice(0,8);
              console.log("result : " +result);
              capp.display.h2.update(result,true);
              capp.display.h3.update(`${capp.input.value}<span class="operator"> ${capp.operator} </span>`);
            } else { //fist input
              capp.operator = btn;
              console.log(capp.savedNumbers[0] === "");
              // save into the first slot then display h3
              capp.input.save(0);
              capp.display.h3.update(`${capp.input.value}<span class="operator"> ${capp.operator} </span>`);
            }
          } else { //input is empty 
            if (capp.savedNumbers[0] !== "") { //not first input
              capp.operator = btn;
              let str = capp.display.h3.el.innerHTML;
              str = `${str.slice(0,-33)}<span class="operator"> ${capp.operator} </span>`;
              capp.display.h3.update(str,true);
              console.log("not-first,notempty")
            } else {  //first input
              console.log("first and empty");
              capp.operator = btn;
              // save 0 into the first slot then display h3
              capp.savedNumbers[0] = 0;
              capp.display.h3.update(`0<span class="operator"> ${capp.operator} </span>`);
            }
          }
          
          //set input to default
          capp.input.value = "";
          
          capp.input.isFloat = false;
          console.log(capp.input.value);

          break;
        case "Escape":
          capp.clear();
          break;
        case "Backspace":
          capp.input.deleteLastChar();
          capp.display.h2.update(capp.input.value, true);

          break;
        case "Enter":
          if (capp.input.value) { // input is not empty
            if (capp.savedNumbers[0] !== "") { //not first input
              //calculate then save into the second slot then display h2+h3
              capp.input.save(1);
              let result = capp.getResult();
              
              capp.savedNumbers[0] = result;
              console.log(result);
              result = result.toString().slice(0,8);
              console.log(result);
              capp.display.h2.update(result,true);
              capp.display.h3.update(`${capp.input.value}<span class="operator"> = </span>`);
            } else { //fist input
              // save into the first slot then display h3
              
              capp.input.save(0);
              capp.display.h3.update(`${capp.input.value}<span class="operator"> = </span>`);
            }
          } else { //input is empty
            if (capp.savedNumbers[1] !== "") { //has 2 saved numbers
              let previousResult = capp.savedNumbers[0]
              let result = capp.getResult();
              capp.savedNumbers[0] = result;
              result = result;
              
              capp.display.h3.update(`${previousResult}<span class="operator"> ${capp.operator} </span>${capp.savedNumbers[1]} =`,true);
              capp.display.h2.update(result,true);
            } else if (capp.savedNumbers[0] !== "") { //has 1 saved number
              console.log(capp.savedNumbers[0]);
              console.log(capp.savedNumbers[1]);
              console.log(capp.operator);
              capp.savedNumbers[1] = capp.savedNumbers[0];
              let result = capp.getResult();
              capp.savedNumbers[0] = result;
              result = result;
              capp.display.h3.update(`${capp.savedNumbers[1]}<span class="operator"> ${capp.operator} </span>${capp.savedNumbers[1]} =`,true);
              capp.display.h2.update(result,true);
            } else { //first input
              
              capp.display.h3.update(`0<span class="operator"> = </span>`, true);
              // save 0 into the first slot then display h3
              capp.savedNumbers[0] = 0;
              capp.display.h3.update(`0<span class="operator"> ${capp.operator} </span>`);
            }
          }
          //set input to default
          capp.input.value = "";
          
          capp.input.isFloat = false;
          console.log(capp.input.value === "");
          break;
      }
      console.log("float "+ capp.input.isFloat);
      console.log("num1: " + capp.savedNumbers[0]);
      console.log("num2: " + capp.savedNumbers[1]);
      console.log("operator: " + capp.operator);
      console.log("input: " + capp.input.value);
      //capp.display.update();
    }

  };
  document.addEventListener('keydown', (e) => {
    controller(e.key);
  });
  const ui = document.getElementById("calculator__ui");
  ui.addEventListener('click', (e) => {
    console.log(e.target.tagName);
    const tagName = e.target.tagName
    if (tagName === "BUTTON"){
      const btn = e.target.dataset.btn;
      controller(btn);
    } else if (tagName === "I"){
      const btn = e.target.parentElement.dataset.btn;
      controller(btn);
    }
    
  });

})(window)