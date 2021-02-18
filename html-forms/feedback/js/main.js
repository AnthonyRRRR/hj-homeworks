const form = document.querySelector('.contentform');
const output = document.getElementById('output');
const outputs = Array.from(output.querySelectorAll('output'));
const changeButton = output.querySelector('.button-contact');
const submitButton = form.querySelector('.button-contact');
const inputs = Array.from(form.querySelectorAll('input'));
const inputsAndTextareas = Array.from(form.querySelectorAll('input, textarea'));

console.log(inputsAndTextareas);

const inputName = form.querySelector('[name="name"]');
const inputLastname = form.querySelector('[name="lastname"]');
const inputComapany = form.querySelector('[name="company"]');
const inputRole = form.querySelector('[name="role"]');
const inputZip = form.querySelector('[name=zip]');
const inputCity = form.querySelector('[name=city]');
const inputAdress = form.querySelector('[name=address]');
const inputSubject = form.querySelector('[name=subject]');
const inputMessage = form.querySelector('[name=message]');

//outputs
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const company = document.getElementById('company');
const role = document.getElementById('role');
const zip = document.getElementById('zip'); //index
const city = document.getElementById('city');
const address = document.getElementById('address');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

let isValid = false;

function onFormSubmit(event) {
  event.preventDefault();
  // name.value = inputName.value;
  // lastname.value = inputName.value;
  // company.value = inputComapany.value;
  // role.value = inputRole.value;
  // lastname.value = inputName.value;
  // lastname.value = inputName.value;
  // lastname.value = inputName.value;
  // lastname.value = inputName.value;

  if (isValid) {
    form.classList.add('hidden');
    output.classList.remove('hidden');

    outputs.forEach((output) => {
      const outputId = output.id;

      console.log(outputId);
      const input = form.querySelector(`[name="${output.id}"]`);
      output.value = input.value;
    })
  }

}

function validate() {
  isValid = inputsAndTextareas.every((input) => {
    console.log(input.getAttribute('name'));
    console.log(input.value);
    return input.value
  });

  if(isValid) {
    submitButton.disabled = false;
  }
  console.log(isValid);
}

function onZipKeyDown(event) {
  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9',
                          'Enter', 'Delete', 'BackSpace', 'ArrowLeft',
                          'ArrowRight', 'ArrowUp', 'ArrowDown',
                          'Control', 'Shift', 'Meta', 'Tab'];
  if(!allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
}



inputZip.addEventListener('keydown', onZipKeyDown);

inputsAndTextareas.forEach((input) => {
  input.addEventListener('input', validate);
});
form.addEventListener('submit', onFormSubmit);













