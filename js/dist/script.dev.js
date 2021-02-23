"use strict";

(function (global) {
  // clock on the top left corner
  var clock = document.getElementById("clock");

  var setTime = function setTime() {
    var d = new Date();
    var hh = d.getHours() + "";
    var mm = d.getMinutes() + "";
    hh = hh.length === 2 ? hh : 0 + hh;
    mm = mm.length === 2 ? mm : 0 + mm;
    clock.innerHTML = hh + ":" + mm;
  };

  setTime();
  setInterval(setTime, 6000);
  var capp = {
    display: {
      //el : html node
      //str: new value
      //bool : add to or replace original
      update: function update(el, str, bool) {
        if (bool) {
          el.innerHTML = str;
        } else {
          el.innerHTML += str;
        }
      },
      h2: {
        el: document.getElementById("result"),
        update: function update() {
          var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "0";
          var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (clear) {
            capp.display.h2.el.innerHTML = str;
          } else {
            capp.display.h2.el.innerHTML += str;
          }
        }
      },
      h3: {
        el: document.getElementById("operation"),
        update: function update() {
          var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
          var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (clear) {
            capp.display.h3.el.innerHTML = str;
          } else {
            capp.display.h3.el.innerHTML += str;
          }
        }
      }
    },
    validKeys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Enter", "Backspace", "+", "-", "*", "/", ".", "%", "+/-", "Escape"],
    savedNumbers: ["", ""],
    input: {
      value: "",
      isFloat: false,
      save: function save(index) {
        var value = parseFloat(capp.input.value);
        capp.savedNumbers[index] = value;
      },
      addChar: function addChar(str) {
        capp.input.value += str;
      },
      deleteLastChar: function deleteLastChar() {
        capp.input.value = capp.input.value.slice(0, -1); //capp.nums[capp.currentNum] = capp.nums[capp.currentNum].slice(0, -1);
      }
    },
    operationStr: "",
    operator: "",
    getResult: function getResult() {
      console.log("run");
      var a = capp.savedNumbers[0];
      var b = capp.savedNumbers[1];

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
    clear: function clear() {
      capp.input.value = "";
      capp.input.isFloat = false;
      capp.operator = "";
      capp.display.h2.update("0", true);
      capp.display.h3.update("", true);
      capp.savedNumbers = ["", ""];
    }
  };

  var controller = function controller(btn) {
    console.log(capp.input.isFloat);
    console.log(btn);
    var isValid = capp.validKeys.indexOf(btn) !== -1;

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
          var bool = capp.input.value === "";
          capp.input.value += btn;
          capp.display.h2.update(btn, bool);
          break;

        case "+/-":
          if (capp.input.value) {
            var value = capp.input.value[0] === "-" ? capp.input.value.slice(1) : "-" + capp.input.value;
            capp.input.value = value;
            capp.display.h2.update(value, true);
          }

          break;

        case ".":
          console.log(capp.input.isFloat);

          if (!capp.input.isFloat) {
            console.log("a");
            capp.input.addChar(btn);
            console.log("a");
            capp.display.h2.update(btn);
            console.log("a");
            capp.input.isFloat = true;
          }

          break;

        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
          if (capp.input.value !== "") {
            console.log("not empty:" + capp.input.value !== ""); // input is not empty

            if (capp.savedNumbers[0] !== "") {
              console.log("not first:" + capp.savedNumbers[0] !== ""); //not first input
              //calculate then save into the second slot then display h2+h3

              capp.input.save(1);
              var result = capp.getResult();
              capp.operator = btn;
              capp.savedNumbers[0] = result;
              result = result.toString().slice(0, 8);
              console.log("result : " + result);
              capp.display.h2.update(result, true);
              capp.display.h3.update("".concat(capp.input.value, "<span class=\"operator\"> ").concat(capp.operator, " </span>"));
            } else {
              //fist input
              capp.operator = btn;
              console.log(capp.savedNumbers[0] === ""); // save into the first slot then display h3

              capp.input.save(0);
              capp.display.h3.update("".concat(capp.input.value, "<span class=\"operator\"> ").concat(capp.operator, " </span>"));
            }
          } else {
            //input is empty 
            if (capp.savedNumbers[0] !== "") {
              //not first input
              capp.operator = btn;
              var str = capp.display.h3.el.innerHTML;
              str = "".concat(str.slice(0, -33), "<span class=\"operator\"> ").concat(capp.operator, " </span>");
              capp.display.h3.update(str, true);
              console.log("not-first,notempty");
            } else {
              //first input
              console.log("first and empty");
              capp.operator = btn; // save 0 into the first slot then display h3

              capp.savedNumbers[0] = 0;
              capp.display.h3.update("0<span class=\"operator\"> ".concat(capp.operator, " </span>"));
            }
          } //set input to default


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
          if (capp.input.value) {
            // input is not empty
            if (capp.savedNumbers[0] !== "") {
              //not first input
              //calculate then save into the second slot then display h2+h3
              capp.input.save(1);

              var _result = capp.getResult();

              capp.savedNumbers[0] = _result;
              console.log(_result);
              _result = _result.toString().slice(0, 8);
              console.log(_result);
              capp.display.h2.update(_result, true);
              capp.display.h3.update("".concat(capp.input.value, "<span class=\"operator\"> = </span>"));
            } else {
              //fist input
              // save into the first slot then display h3
              capp.input.save(0);
              capp.display.h3.update("".concat(capp.input.value, "<span class=\"operator\"> = </span>"));
            }
          } else {
            //input is empty
            if (capp.savedNumbers[1] !== "") {
              //has 2 saved numbers
              var previousResult = capp.savedNumbers[0];

              var _result2 = capp.getResult();

              capp.savedNumbers[0] = _result2;
              _result2 = _result2;
              capp.display.h3.update("".concat(previousResult, "<span class=\"operator\"> ").concat(capp.operator, " </span>").concat(capp.savedNumbers[1], " ="), true);
              capp.display.h2.update(_result2, true);
            } else if (capp.savedNumbers[0] !== "") {
              //has 1 saved number
              console.log(capp.savedNumbers[0]);
              console.log(capp.savedNumbers[1]);
              console.log(capp.operator);
              capp.savedNumbers[1] = capp.savedNumbers[0];

              var _result3 = capp.getResult();

              capp.savedNumbers[0] = _result3;
              _result3 = _result3;
              capp.display.h3.update("".concat(capp.savedNumbers[1], "<span class=\"operator\"> ").concat(capp.operator, " </span>").concat(capp.savedNumbers[1], " ="), true);
              capp.display.h2.update(_result3, true);
            } else {
              //first input
              capp.display.h3.update("0<span class=\"operator\"> = </span>", true); // save 0 into the first slot then display h3

              capp.savedNumbers[0] = 0;
              capp.display.h3.update("0<span class=\"operator\"> ".concat(capp.operator, " </span>"));
            }
          } //set input to default


          capp.input.value = "";
          capp.input.isFloat = false;
          console.log(capp.input.value === "");
          break;
      }

      console.log("float " + capp.input.isFloat);
      console.log("num1: " + capp.savedNumbers[0]);
      console.log("num2: " + capp.savedNumbers[1]);
      console.log("operator: " + capp.operator);
      console.log("input: " + capp.input.value); //capp.display.update();
    }
  };

  document.addEventListener('keydown', function (e) {
    controller(e.key);
  });
  var ui = document.getElementById("calculator__ui");
  ui.addEventListener('click', function (e) {
    console.log(e.target.tagName);
    var tagName = e.target.tagName;

    if (tagName === "BUTTON") {
      var btn = e.target.dataset.btn;
      controller(btn);
    } else if (tagName === "I") {
      var _btn = e.target.parentElement.dataset.btn;
      controller(_btn);
    }
  });
  window.app = capp;
})(window);