const extraServicePrice = {
  "Car & ATV Rental": 60,
  "Yacht Hiring": 70,
  "Postal/Parcel Services": 10,
  "Porter Service": 80,
  "Horse Back Riding": 20,
  "Room Service ": 100,
};

document.addEventListener("DOMContentLoaded", () => {
  const bookingModal = new bootstrap.Modal(
    document.getElementById("bookingModal")
  );

  // Function to open the booking modal
  window.openBookingModal = function (roomId) {
    // Open the modal
    bookingModal.show();

    // Apply date restrictions to the booking form
    applyDateRestrictions();

    // Fetch room data immediately when the modal opens
    fetchRoomData(roomId);
  };

  // Fetch room data based on the room ID
  async function fetchRoomData(roomId) {
    try {
      const response = await fetch(
        `https://6720c39598bbb4d93ca5df7a.mockapi.io/T_room/${roomId}`
      );
      // Log the response for debugging
      console.log("Fetched room data:", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const room = await response.json();
      console.log("Room details:", room); // Log the room details
      displayRoomInfo(room);
      displayExtraServices();
      updateNumberOptions(room.max_adults, room.max_children);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  }

  // Display the fetched room information
  function displayRoomInfo(room) {
    const roomInfoContainer = document.getElementById("roomInfo");
    roomInfoContainer.innerHTML = `
      <h5><strong>${room.room_type}</strong></h5>
      <p>${room.beds} Bed(s), ${room.max_adults} Adult(s), ${
      room.max_children
    } Child(ren)</p>
      <p>With ${room.features.join(", ")}</p>
    `;
  }

  function displayExtraServices() {
    const extraServiceContainer = document.getElementById(
      "extraServiceOptions"
    );
    extraServiceContainer.innerHTML = `
      <strong>Select Additional Service:</strong>
      ${Object.keys(extraServicePrice)
        .map(
          (service) => `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${service}" id="${service}">
          <label class="form-check-label" for="${service}">
            ${service} - $${extraServicePrice[service]}
          </label>
        </div>
      `
        )
        .join("")}
    `;
  }

  function updateNumberOptions(maxAdults, maxChildren) {
    const adultSelect = document.getElementById("adultCount");
    const childrenSelect = document.getElementById("childrenCount");
    console.log(maxAdults, maxChildren);
    // Clear existing options
    adultSelect.innerHTML = "";
    childrenSelect.innerHTML = "";

    // Populate Adult options
    for (let i = 1; i <= maxAdults; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i} Adult${i > 1 ? "s" : ""}`;
      adultSelect.appendChild(option);
    }

    // Populate Children options
    for (let j = 0; j <= maxChildren; j++) {
      const option = document.createElement("option");
      option.value = j;
      option.textContent = `${j} Child${j === 1 || 0 ? "" : "ren"}`;
      childrenSelect.appendChild(option);
    }
  }

  // Apply date restrictions to the booking form
  function applyDateRestrictions() {
    const today = new Date();
    const checkinDateInput = document.getElementById("checkinDate");
    const checkoutDateInput = document.getElementById("checkoutDate");

    // Format the date to YYYY-MM-DD for the input field
    const formattedDate = today.toISOString().split("T")[0];

    // Set the minimum check-in date to tomorrow
    const minCheckinDate = new Date();
    minCheckinDate.setDate(today.getDate() + 1);
    const formattedMinCheckinDate = minCheckinDate.toISOString().split("T")[0];

    // Set the minimum attributes
    checkinDateInput.setAttribute("min", formattedMinCheckinDate);
    checkoutDateInput.setAttribute("min", formattedMinCheckinDate);

    // Update checkout min date based on selected check-in date
    checkinDateInput.addEventListener("change", function () {
      const selectedCheckinDate = new Date(checkinDateInput.value);
      selectedCheckinDate.setDate(selectedCheckinDate.getDate() + 1); // Minimum stay of 1 night
      const formattedMinCheckoutDate = selectedCheckinDate
        .toISOString()
        .split("T")[0];
      checkoutDateInput.setAttribute("min", formattedMinCheckoutDate);
    });
  }

  // Process to the billing form
  document.getElementById('checkAvailability').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the selected values
    const checkinDate = new Date(document.getElementById('checkinDate').value);
    const checkoutDate = new Date(document.getElementById('checkoutDate').value);
    const adults = parseInt(document.getElementById('adultCount').value) || 0;
    const children = parseInt(document.getElementById('childrenCount').value) || 0;

    // Calculate the number of stay days
    const stayDays = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
    const totalGuests = adults + children;

    // Calculate service fee based on selected extra services
    let serviceFee = 0;
    document.querySelectorAll('#extraServiceOptions input[type="checkbox"]:checked').forEach((checkbox) => {
      const service = checkbox.value;
      serviceFee += extraServicePrice[service] || 0;
    });

    // Update billing information in the Complete Booking section
    document.getElementById('arrivalDate').value = checkinDate.toLocaleDateString();
    document.getElementById('departureDate').value = checkoutDate.toLocaleDateString();
    document.getElementById('stayDays').value = stayDays;
    document.getElementById('guestCount').value = totalGuests;
    document.getElementById('serviceFee').value = `${serviceFee}$`;
    document.getElementById('totalFee').value = `${serviceFee + (stayDays * 100)}$`; // Assuming a flat rate of 100$ per day for the room

    // Show the billing section by collapsing it
    const billingCollapse = new bootstrap.Collapse(document.getElementById('collapseTwo'), {
      toggle: true
    });
  });
});
