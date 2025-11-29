document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".kb-form");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Disable button
    const submitBtn = form.querySelector(".kb-forms-submit");
    if (submitBtn) submitBtn.disabled = true;

    // Remove the old success/error message (if exists)
    const oldMsg = form.querySelector(".kb-form-message");
    if (oldMsg) oldMsg.remove();

    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xrbdnyyp", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // Clear all fields
        form.reset();

        // Kadence-style success message
        const msg = document.createElement("div");
        msg.className = "kb-form-message kb-form-success";
        msg.textContent = "Hvala! Vaša poruka je uspešno poslata.";

        form.appendChild(msg);
      } else {
        // Kadence-style error message
        const error = document.createElement("div");
        error.className = "kb-form-message kb-form-error";
        error.textContent = "Došlo je do greške. Pokušajte ponovo.";

        form.appendChild(error);
      }
    } catch {
      // Kadence-style error message
      const error = document.createElement("div");
      error.className = "kb-form-message kb-form-error";
      error.textContent = "Proverite internet konekciju pa pokušajte ponovo.";

      form.appendChild(error);
    }

    if (submitBtn) submitBtn.disabled = false;
  });
});
