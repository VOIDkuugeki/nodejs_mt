document.addEventListener("DOMContentLoaded", () => {
  const allRoomsBtn = document.getElementById("allRoomsBtn");
  const doubleRoomBtn = document.getElementById("doubleRoomBtn");
  const familyRoomBtn = document.getElementById("familyRoomBtn");
  const luxuryRoomBtn = document.getElementById("luxuryRoomBtn");
  const singleRoomBtn = document.getElementById("singleRoomBtn");

  let rooms = []; // To store fetched rooms

  // Fetch rooms data from API
  async function fetchRooms() {
    try {
      const response = await fetch(
        "https://6720c39598bbb4d93ca5df7a.mockapi.io/T_room"
      );
      rooms = await response.json();
      displayRooms("All Rooms");
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  // Function to display rooms based on filter
  function displayRooms(roomType) {
    const roomCardsContainer = document.getElementById("room-cards");
    roomCardsContainer.innerHTML = ""; // Clear all current cards

    let filteredRooms;

    // Filter rooms based on the selected room type
    switch (roomType) {
      case "Double Room":
        filteredRooms = rooms.filter((room) => room.price >= 800); // Rooms with price >= 800
        break;
      case "Single Room":
        filteredRooms = rooms.filter((room) => room.price < 800); // Rooms with price < 800
        break;
      case "Family Room":
        filteredRooms = rooms.filter(
          (room) => room.room_type === "Family Room" || room.room_type === "Standard"
        ); // Family and Standard rooms
        break;
      case "Luxury Room":
        filteredRooms = rooms.filter(
          (room) => room.room_type === "Deluxe Room" || room.room_type === "Luxury"
        ); // Deluxe and Luxury rooms
        break;
      case "All Rooms":
        filteredRooms = rooms; // Display all rooms
        break;
      default:
        filteredRooms = []; // No valid room type
    }

    // Create and display card for each filtered room
    filteredRooms.forEach((room) => {
      const card = document.createElement("div");
      card.className = "col-md-3 mb-4";
      card.innerHTML = `
          <div class="card h-100">
            <img src="${room.room_image}" class="card-img-top" alt="${room.room_type}">
            <div class="card-body">
              <h5 class="card-title">${room.room_type}</h5>
              <p class="card-text"><strong>Price:</strong> ${room.price}</p>
              <p class="card-text" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                <strong>Description:</strong> ${room.description}
              </p>
              <button class="btn custom-btn w-100 mb-2" onClick="openBookingModal(${room.id})">Book Now</button>
              <button class="btn custom-btn w-100" onClick="fetchRoomDetails(${room.id})">Detail</button>
            </div>
          </div>
        `;
      roomCardsContainer.appendChild(card);
    });
  }

  // Event listeners for filtering buttons
  allRoomsBtn.addEventListener("click", () => displayRooms("All Rooms"));
  doubleRoomBtn.addEventListener("click", () => displayRooms("Double Room"));
  familyRoomBtn.addEventListener("click", () => displayRooms("Family Room"));
  luxuryRoomBtn.addEventListener("click", () => displayRooms("Luxury Room"));
  singleRoomBtn.addEventListener("click", () => displayRooms("Single Room"));

  fetchRooms(); // Initial fetch to load rooms
});
