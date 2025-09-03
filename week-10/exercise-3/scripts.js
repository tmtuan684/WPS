document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(event) {
      let hasError = false;
      let errorMessage = "";
  
      // Check for empty fields
      const inputs = form.querySelectorAll('input[required]');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          hasError = true;
          errorMessage += `Please fill out the ${input.name} field.\n`;
        }
      });

      // Validate age
      const age = form.querySelector('input[name="age"]');
      if (age && (Number(age.value) > 90 || Number(age.value) < 16)) {
        hasError = true;
        errorMessage += "Please enter a valid age.\n";
      }

      // Validate phone number to be a number
      const phone = form.querySelector('input[name="phone"]');
      if (phone && (isNaN(phone.value) || phone.value.trim().length === 0)) {
        hasError = true;
        errorMessage += "Please enter a valid phone number.\n";
      }

      // Validate email (optional)
  
      // If there's an error, prevent form submission and show alert
      if (hasError) {
        alert(errorMessage);
        event.preventDefault();
      }
    }, false);
  });
  