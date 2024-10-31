const guestAPI = "https://6720c7ef98bbb4d93ca5fa06.mockapi.io/T_guest";
const billAPI = "https://6720c7ef98bbb4d93ca5fa06.mockapi.io/T_billing";

const extraServicePrice = {
  "Car & ATV Rental": 60,
  "Yacht Hiring": 70,
  "Postal/Parcel Services": 10,
  "Porter Service": 80,
  "Horse Back Riding": 20,
  "Room Service": 100,
};

let roomPrice = 0; // Initialize a variable to hold the room price

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
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const room = await response.json(); // Move this line here to ensure 'room' is declared properly
      console.log("Room details:", room); // Log the room details
      
      roomPrice = room.price; // Store the room price for later use

      displayRoomInfo(room);
      displayExtraServices();
      updateNumberOptions(room.max_adults, room.max_children);

      // Save the initial room price as the total fee (to be updated later)
      document.getElementById("totalFee").value = `$${roomPrice}`; // Store the base room price in totalFee
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  }

  // Display the fetched room information
  function displayRoomInfo(room) {
    const roomInfoContainer = document.getElementById("roomInfo");
    roomInfoContainer.innerHTML = `
      <h5><strong>${room.room_type}</strong></h5>
      <p>${room.beds} Bed(s), ${room.max_adults} Adult(s), ${room.max_children} Child(ren)</p>
      <p>With ${room.features.join(", ")}</p>
    `;
  }

  function displayExtraServices() {
    const extraServiceContainer = document.getElementById("extraServiceOptions");
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
    const formattedMinCheckinDate = new Date(today);
    formattedMinCheckinDate.setDate(today.getDate() + 1);
    checkinDateInput.setAttribute("min", formattedMinCheckinDate.toISOString().split("T")[0]);
    checkoutDateInput.setAttribute("min", formattedMinCheckinDate.toISOString().split("T")[0]);

    // Update checkout min date based on selected check-in date
    checkinDateInput.addEventListener("change", function () {
      const selectedCheckinDate = new Date(checkinDateInput.value);
      selectedCheckinDate.setDate(selectedCheckinDate.getDate() + 1); // Minimum stay of 1 night
      const formattedMinCheckoutDate = selectedCheckinDate.toISOString().split("T")[0];
      checkoutDateInput.setAttribute("min", formattedMinCheckoutDate);
    });
  }

  // Process to the billing form
  document.getElementById("checkAvailability").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the selected values
    const checkinDate = new Date(document.getElementById("checkinDate").value);
    const checkoutDate = new Date(document.getElementById("checkoutDate").value);
    const adults = parseInt(document.getElementById("adultCount").value) || 0;
    const children = parseInt(document.getElementById("childrenCount").value) || 0;

    // Calculate the number of stay days
    const stayDays = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
    const totalGuests = adults + children;

    // Calculate service fee based on selected extra services
    let serviceFee = 0;
    document.querySelectorAll('#extraServiceOptions input[type="checkbox"]:checked').forEach((checkbox) => {
      const service = checkbox.value;
      serviceFee += extraServicePrice[service] || 0;
    });

    // Calculate total fee (room price * stayDays + serviceFee)
    const totalFee = roomPrice * stayDays + serviceFee;

    // Update billing information in the Complete Booking section
    document.getElementById("arrivalDate").value = checkinDate.toLocaleDateString();
    document.getElementById("departureDate").value = checkoutDate.toLocaleDateString();
    document.getElementById("stayDays").value = stayDays;
    document.getElementById("guestCount").value = totalGuests;
    document.getElementById("serviceFee").value = `$${serviceFee}`; // Show $ symbol
    document.getElementById("totalFee").value = `$${totalFee}`; // Show $ symbol

    // Show the billing section by collapsing it
    const billingCollapse = new bootstrap.Collapse(document.getElementById("collapseTwo"), {
      toggle: true,
    });
  });

  // Event listener for the confirm billing form
  document.getElementById("confirmBill").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Gather customer info
    const customerInfo = {
      name: document.getElementById("customerName").value,
      email: document.getElementById("customerEmail").value,
      phone: document.getElementById("customerPhone").value,
      address: document.getElementById("customerAddress").value,
    };

    // Gather billing info
    const billingInfo = {
      arrivalDate: document.getElementById("arrivalDate").value,
      departureDate: document.getElementById("departureDate").value,
      stayDays: parseInt(document.getElementById("stayDays").value),
      guestCount: parseInt(document.getElementById("guestCount").value),
      serviceFee: parseFloat(document.getElementById("serviceFee").value.replace("$", "")), // Strip $ for API submission
      totalFee: parseFloat(document.getElementById("totalFee").value.replace("$", "")), // Strip $ for API submission
    };

    // Post customer info to the guest API
    fetch(guestAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Return the customer data including customerId
      })
      .then((data) => {
        // Once the customer info is saved, proceed to save billing info
        billingInfo.id = data.id; // Attach the customerId to the billing info

        // Post billing info to the billing API
        return fetch(billAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(billingInfo),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Booking confirmed successfully!");
        // Optionally close the modal or reset the form here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});