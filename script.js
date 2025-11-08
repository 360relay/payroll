// FORM SUBMISSION HANDLER FOR PAYROLL ASSISTANT APPLICATION
document.addEventListener("DOMContentLoaded", function () {
  const applicationForm = document.getElementById("payrollApplication");
  const submitBtn = document.querySelector(".submit-btn");
  const formMessage = document.getElementById("form-message");

  if (applicationForm) {
    applicationForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
      }

      // Show loading message
      if (formMessage) {
        formMessage.textContent = "Submitting your application...";
        formMessage.style.color = "#3498db";
        formMessage.style.padding = "10px";
      }

      try {
        // Get form data
        const formData = getFormData();
        console.log("Submitting form data:", formData);

        // Send to Google Sheets
        await submitToGoogleSheets(formData);

        // Show success message and next steps
        showSuccessMessage();

        // Reset form
        applicationForm.reset();
      } catch (error) {
        console.error("Submission error:", error);
        showMessage(
          "There was an error submitting your application. Please try again.",
          "error"
        );
      } finally {
        // Reset button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Application";
        }
      }
    });
  }

  // Get form data as object
  function getFormData() {
    const formData = new FormData(applicationForm);
    return {
      fullName: formData.get("fullName") || "",
      address: formData.get("address") || "",
      city: formData.get("city") || "",
      state: formData.get("state") || "",
      zipCode: formData.get("zipCode") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      supplyTimeline: formData.get("supplyTimeline") || "",
      comments: formData.get("comments") || "",
      timestamp: new Date().toLocaleString(),
      source: "Payroll Assistant Website",
    };
  }

  // Submit data to Google Sheets
  async function submitToGoogleSheets(formData) {
    // REPLACE THIS WITH YOUR ACTUAL GOOGLE APPS SCRIPT URL
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwn6TMyRTnC-QFZBZgq_HCaFkk-x98xgkz8sM91Ki9U1L4NTw1aYqsUWZQi9YnDb4A/exec";

    try {
      // Using no-cors mode for Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // With no-cors mode, we can't read the response, so we assume success
      console.log("Form submitted to Google Sheets");
      return { result: "success" };
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      throw new Error("Failed to submit application");
    }
  }

  // Show message to user
  function showMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.style.color = type === "success" ? "#2ecc71" : "#e74c3c";
      formMessage.style.padding = "10px";
      formMessage.style.borderRadius = "4px";
      formMessage.style.backgroundColor =
        type === "success" ? "#d1fae5" : "#fee2e2";
      formMessage.style.border =
        type === "success" ? "1px solid #a7f3d0" : "1px solid #fecaca";

      // Auto remove after 5 seconds for errors, keep success messages
      if (type === "error") {
        setTimeout(() => {
          formMessage.textContent = "";
          formMessage.style.backgroundColor = "transparent";
          formMessage.style.border = "none";
        }, 5000);
      }
    }
  }

  // Show success message with next steps
  function showSuccessMessage() {
    const successHTML = `
      <div style="color: #2ecc71; padding: 15px; background: #d1fae5; border-radius: 8px; border: 1px solid #a7f3d0; margin-bottom: 15px;">
        <strong>✓ Application submitted successfully!</strong><br>
        We will contact you soon.
      </div>
    `;

    if (formMessage) {
      formMessage.innerHTML = successHTML;
    }
  }
});
