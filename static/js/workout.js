function nextStep(step) {
    document.querySelector(`#step-${step - 1}`).style.display = 'none';
    document.querySelector(`#step-${step}`).style.display = 'block';
}

function prevStep(step) {
    document.querySelector(`#step-${step + 1}`).style.display = 'none';
    document.querySelector(`#step-${step}`).style.display = 'block';
}

document.getElementById('multiStepForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        age: document.getElementById('age').value,
        goal: document.getElementById('goal').value,
        activity: document.getElementById('activity').value,
    };

    const responseContainer = document.getElementById('response-container');
    const outputElement = document.getElementById('response-output');

    try {
        const response = await fetch('/getFitnessAdvice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.advice) {
            responseContainer.style.display = 'block';
            outputElement.textContent = data.advice;
        } else {
            responseContainer.style.display = 'block';
            outputElement.textContent = data.error || 'An error occurred.';
        }
    } catch (error) {
        responseContainer.style.display = 'block';
        outputElement.textContent = 'Error fetching advice.';
    }
});
