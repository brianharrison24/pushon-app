// Function to move the counting bubble with the slider
function updateBubble(slider, bubbleId) {
    const bubble = document.getElementById(bubbleId);
    const val = slider.value;
    const min = slider.min ? slider.min : 0;
    const max = slider.max ? slider.max : 100;
    
    bubble.innerHTML = val;

    // Calculate percentage position
    const newVal = Number(((val - min) * 100) / (max - min));
    
    // Position bubble (fine-tuned math to stay centered over the thumb)
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

// Function to calculate final targets
function calculateMacros() {
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const goal = document.querySelector('input[name="goal"]:checked').value;
    const activity = parseFloat(document.querySelector('input[name="activity"]:checked').value);

    // BMR Calculation (Mifflin-St Jeor)
    let bmr = (10 * (weight * 0.453592)) + (6.25 * (height * 2.54)) - (5 * age);
    bmr = (gender === "male") ? bmr + 5 : bmr - 161;

    let tdee = bmr * activity;

    // Adjust for goal
    if (goal === "lose") tdee -= 500;
    if (goal === "gain") tdee += 500;

    const protein = (tdee * 0.3) / 4;
    const carbs = (tdee * 0.45) / 4;
    const fats = (tdee * 0.25) / 9;

    const resultDiv = document.getElementById('macro-result');
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <div class="result-item"><div class="result-label">Calorie Target</div><div class="result-value">${Math.round(tdee)} Calories</div></div>
        <div class="result-item"><div class="result-label">Protein Target</div><div class="result-value">${Math.round(protein)} Grams</div></div>
        <div class="result-item"><div class="result-label">Carbohydrates Target</div><div class="result-value">${Math.round(carbs)} Grams</div></div>
        <div class="result-item"><div class="result-label">Fats Target</div><div class="result-value">${Math.round(fats)} Grams</div></div>
    `;
    
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Initialize bubbles on page load
window.onload = function() {
    updateBubble(document.getElementById('age'), 'age-bubble');
    updateBubble(document.getElementById('height'), 'height-bubble');
    updateBubble(document.getElementById('weight'), 'weight-bubble');
};