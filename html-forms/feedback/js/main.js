const form = document.querySelector('.contentform');
const output = document.getElementById('output');
const changeButton = output.querySelector('.button-contact');
const submitButton = form.querySelector('.button-contact');
const inputs = Array.from(document.querySelectorAll('input'));




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



//name.value = form.querySelector('input[name="name"]').value;

function submit(e) {
  e.preventDefault();
  form.classList.add('hidden');
  output.classList.remove('hidden');

  name.value = form.querySelector('input[name="name"]').value;
  lastname.value = form.querySelector('input[name="lastname"]').value;
  company.value = form.querySelector('input[name="company"]').value;
  role.value = form.querySelector('input[name="role"]').value;
  zip.value = form.querySelector('input[name="zip"]').value;
  city.value = form.querySelector('input[name="city"]').value;
  address.value = form.querySelector('input[name="address"]').value;
  subject.value = form.querySelector('input[name="subject"]').value;
  message.value = form.querySelector('input[name="message"]').value;
}

function onChangeButtonClick(e) {
  e.preventDefault();
  output.classList.add('hidden');
  form.classList.remove('hidden');
}





  submitButton.addEventListener('click', submit);
  changeButton.addEventListener('click', onChangeButtonClick);


