// modal.js

document.addEventListener('DOMContentLoaded', () => {
  const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));

  // Function to open the booking modal
  window.openBookingModal = function(roomId = null) {
    // Open the modal
    bookingModal.show();

    // Set up room selection if no room ID is provided
    if (!roomId) {
      document.getElementById('roomType').value = '';  // Reset room selection dropdown
    } else {
      // Populate the form with the selected room (if roomId is available)
      // You can also pre-fill other form fields if needed
    }
  };

  // Event listener for collapse toggle - changing color of the active accordion header
  document.getElementById('bookingAccordion').addEventListener('show.bs.collapse', function (event) {
    let activeHeader = event.target.previousElementSibling.querySelector('.accordion-button');
    activeHeader.classList.add('active-header');
  });

  document.getElementById('bookingAccordion').addEventListener('hide.bs.collapse', function (event) {
    let inactiveHeader = event.target.previousElementSibling.querySelector('.accordion-button');
    inactiveHeader.classList.remove('active-header');
  });

  // Add event listener to "Check Availability" button
  document.getElementById('checkAvailabilityBtn').addEventListener('click', () => {
    let roomAvailable = true;  // Simulated check (you can replace with actual API call)

    if (roomAvailable) {
      // Collapse the Check Availability section and expand the Complete Booking section
      const collapseAvailability = new bootstrap.Collapse(document.getElementById('collapseAvailability'), {
        toggle: false
      });
      const collapseComplete = new bootstrap.Collapse(document.getElementById('collapseComplete'), {
        toggle: false
      });

      collapseAvailability.hide();
      collapseComplete.show();
    } else {
      alert('Sorry, the room is not available.');
    }
  });

  // Handle complete booking form submission
  document.getElementById('completeBookingForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const billingInfo = document.getElementById('billingInfo').value;

    // Perform the booking (add actual booking logic here)
    alert(`Booking confirmed for ${customerName}. Details have been sent to ${customerEmail}.`);

    // Close the modal
    bookingModal.hide();
  });
});
