const steps = Array.from(document.querySelectorAll('.form-step'));
const stepIndicators = Array.from(document.querySelectorAll('.step'));
const form = document.getElementById('checkout-form');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('form-feedback');

let currentStep = 1;

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 4);
  if (cleaned.length < 3) return cleaned;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
}

function getFieldsForStep(stepNumber) {
  const section = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
  return Array.from(section.querySelectorAll('input[required]'));
}

function validateStep(stepNumber) {
  const fields = getFieldsForStep(stepNumber);
  let isValid = true;

  fields.forEach((field) => {
    field.classList.remove('user-invalid');

    if (!field.checkValidity()) {
      field.classList.add('user-invalid');
      isValid = false;
    }

    if (field.name === 'cardNumber') {
      const digits = field.value.replace(/\s/g, '');
      if (digits.length !== 16) {
        field.classList.add('user-invalid');
        isValid = false;
      }
    }

    if (field.name === 'cardExpiry') {
      const validExpiry = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(field.value);
      if (!validExpiry) {
        field.classList.add('user-invalid');
        isValid = false;
      }
    }

    if (field.name === 'cardCvv') {
      const validCvv = /^\d{3,4}$/.test(field.value);
      if (!validCvv) {
        field.classList.add('user-invalid');
        isValid = false;
      }
    }
  });

  return isValid;
}

function updateStepper() {
  steps.forEach((step) => {
    const number = Number(step.dataset.step);
    step.classList.toggle('is-active', number === currentStep);
  });

  stepIndicators.forEach((indicator) => {
    const number = Number(indicator.dataset.step);
    indicator.classList.toggle('is-active', number === currentStep);
    indicator.classList.toggle('is-complete', number < currentStep);
  });

  prevBtn.disabled = currentStep === 1;
  nextBtn.style.display = currentStep === steps.length ? 'none' : 'inline-flex';
  submitBtn.style.display = currentStep === steps.length ? 'inline-flex' : 'none';
}

function goToNextStep() {
  feedback.textContent = '';

  // El paso 1 se deja vacio por requerimiento, por eso no se valida.
  if (currentStep !== 1 && !validateStep(currentStep)) {
    feedback.textContent = 'Revisa los campos obligatorios antes de continuar.';
    return;
  }

  if (currentStep < steps.length) {
    currentStep += 1;
    updateStepper();
  }
}

function goToPrevStep() {
  feedback.textContent = '';
  if (currentStep > 1) {
    currentStep -= 1;
    updateStepper();
  }
}

nextBtn.addEventListener('click', goToNextStep);
prevBtn.addEventListener('click', goToPrevStep);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.classList.remove('ok');

  if (!validateStep(3)) {
    feedback.textContent = 'Completa correctamente los datos de la tarjeta.';
    return;
  }

  feedback.textContent = 'Pago validado. Tu pedido esta listo para procesarse.';
  feedback.classList.add('ok');
});

const cardNumberInput = form.elements.cardNumber;
const cardExpiryInput = form.elements.cardExpiry;
const cardCvvInput = form.elements.cardCvv;

cardNumberInput.addEventListener('input', (event) => {
  event.target.value = formatCardNumber(event.target.value);
});

cardExpiryInput.addEventListener('input', (event) => {
  event.target.value = formatExpiry(event.target.value);
});

cardCvvInput.addEventListener('input', (event) => {
  event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4);
});

updateStepper();
