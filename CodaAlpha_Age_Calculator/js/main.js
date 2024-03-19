let button = document.querySelector(".button svg");
let inputs = document.querySelectorAll("input[type=number]");
let label = document.querySelectorAll("label");
let age = document.querySelectorAll(".burble");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1; // Zero index
let day = date.getDate();

inputs.forEach((input) => {
  // Input.onblur
  input.onblur = function () {
    // Required Field
    if (input.value !== "") {
      // Valid Range Date
      if (input.id == "day") {
        if (input.value < 1 || input.value > 31) {
          input.parentElement.children[2].textContent = "Must be a valid day";
          input.style["border-color"] = "var(--red)";
          input.parentElement.children[0].style.color = "var(--red)";
          input.setAttribute("error", "");
        } else {
          input.parentElement.children[2].textContent = "";
          input.parentElement.children[0].style.color = "#333";
          input.style["border-color"] = "#bdbbbb";
          input.removeAttribute("error");
        }
      } else if (input.id == "month") {
        if (input.value < 1 || input.value > 12) {
          input.parentElement.children[2].textContent = "Must be a valid month";
          input.style["border-color"] = "var(--red)";
          input.parentElement.children[0].style.color = "var(--red)";
          input.setAttribute("error", "");
        } else {
          input.parentElement.children[2].textContent = "";
          input.parentElement.children[0].style.color = "#333";
          input.style["border-color"] = "#bdbbbb";
          input.removeAttribute("error");
        }
      } else {
        if (input.value < 1 || input.value > year) {
          input.parentElement.children[2].textContent = "Must be a valid year";
          input.style["border-color"] = "var(--red)";
          input.parentElement.children[0].style.color = "var(--red)";
          input.setAttribute("error", "");
        } else {
          input.parentElement.children[2].textContent = "";
          input.parentElement.children[0].style.color = "#333";
          input.style["border-color"] = "#bdbbbb";
          input.removeAttribute("error");
        }
      }

      if (inputs[2].value == year) {
        // Invalid Future Date
        if (inputs[1].value > month) {
          inputs[1].parentElement.children[2].textContent =
            "Must be a valid month";
          inputs[1].style["border-color"] = "var(--red)";
          inputs[1].parentElement.children[0].style.color = "var(--red)";
          inputs[1].setAttribute("error", "");
        } else if (inputs[1].value == month && inputs[0].value > day) {
          inputs[0].parentElement.children[2].textContent =
            "Must be a valid day";
          inputs[0].style["border-color"] = "var(--red)";
          inputs[0].parentElement.children[0].style.color = "var(--red)";
          inputs[0].setAttribute("error", "");
        } else {
          inputs[0].parentElement.children[2].textContent = "";
          inputs[0].parentElement.children[0].style.color = "#333";
          inputs[0].style["border-color"] = "#bdbbbb";
          inputs[0].removeAttribute("error");
        }
      } else {
        // Even Months
        if (inputs[1].value % 2 == 0 && inputs[0].value > 30) {
          if (!inputs[1].value == "") {
            inputs[0].parentElement.children[2].textContent =
              "Must be a valid day";
            inputs[0].style["border-color"] = "var(--red)";
            inputs[0].parentElement.children[0].style.color = "var(--red)";
            inputs[0].setAttribute("error", "");
          }
        } else if (!inputs[1].value % 2 == 0 && inputs[0].value > 31) {
          // Odd Months
          inputs[0].parentElement.children[2].textContent =
            "Must be a valid day";
          inputs[0].style["border-color"] = "var(--red)";
          inputs[0].parentElement.children[0].style.color = "var(--red)";
          inputs[0].setAttribute("error", "");
        } else if (inputs[1].value == 2 && inputs[0].value > 29) {
          // February
          inputs[0].parentElement.children[2].textContent =
            "Must be a valid day";
          inputs[0].style["border-color"] = "var(--red)";
          inputs[0].parentElement.children[0].style.color = "var(--red)";
          inputs[0].setAttribute("error", "");
        } else {
          inputs[0].parentElement.children[2].textContent = "";
          inputs[0].parentElement.children[0].style.color = "#333";
          inputs[0].style["border-color"] = "#bdbbbb";
          inputs[0].removeAttribute("error");
          if (!inputs[1].value > 12) {
            inputs[0].parentElement.children[2].textContent =
              "Must be a valid day";
            inputs[0].style["border-color"] = "var(--red)";
            inputs[0].parentElement.children[0].style.color = "var(--red)";
            inputs[0].setAttribute("error", "");
          }
        }
      }
    } else {
      input.style["border-color"] = "var(--red)";
      input.parentElement.children[0].style.color = "var(--red)";
      input.parentElement.children[2].textContent = "This field is required";
      input.setAttribute("error", "");
    }
  };
});

button.onclick = function () {
  // if clicked without bluring the inputs
  inputs.forEach((e) => {
    if (e.value == "" || e.value == null) {
      e.style["border-color"] = "var(--red)";
      e.parentElement.children[0].style.color = "var(--red)";
      e.parentElement.children[2].textContent = "This field is required";
      e.setAttribute("error", "");
    }
  });

  validation = ![...inputs].some((e) => e.hasAttribute("error"));
  if (validation) {
    // Negative Count Bug
    let arr1 = [day, month, year];

    let days = [...inputs][0].value;
    let months = [...inputs][1].value;
    let years = [...inputs][2].value;

    if (days > day) {
      days -= 30;
      months = +months + 1;
    }
    if (months > month) {
      months -= 12;
      years = +years + 1;
    }

    let arr2 = [days, months, years];

    age.forEach((e, index) => {
      let num = arr1[arr1.length - 1 - index] - +arr2[arr2.length - 1 - index];

      e.textContent = num;
    });
  }
};
