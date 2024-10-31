document.addEventListener("DOMContentLoaded", () => {
    const allRoomsBtn = document.getElementById("allRoomsBtn");
    const doubleRoomBtn = document.getElementById("doubleRoomBtn");
    const familyRoomBtn = document.getElementById("familyRoomBtn");
    const luxuryRoomBtn = document.getElementById("luxuryRoomBtn");
    const singleRoomBtn = document.getElementById("singleRoomBtn");

    async function fetchRooms() {
      try {
        const response = await fetch("https://6720c39598bbb4d93ca5df7a.mockapi.io/T_room");
        const rooms = await response.json();
        displayRooms(rooms);

        // Add event listeners for filtering buttons
        allRoomsBtn.addEventListener("click", () => displayRooms(rooms));
        doubleRoomBtn.addEventListener("click", () => filterRooms(["Deluxe Room"], rooms));
        familyRoomBtn.addEventListener("click", () => filterRooms(["Family Room", "Standard Room", "Luxury Room"], rooms));
        luxuryRoomBtn.addEventListener("click", () => filterRooms(["Deluxe Room", "Luxury Room"], rooms));
        singleRoomBtn.addEventListener("click", () => filterRooms(["Standard Room"], rooms));
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }

    function displayRooms(rooms) {
      const roomCardsContainer = document.getElementById("room-cards");
      roomCardsContainer.innerHTML = ""; // Clear existing room cards
      rooms.forEach((room) => {
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

    function filterRooms(types, rooms) {
      const filteredRooms = rooms.filter((room) => types.includes(room.room_type));
      displayRooms(filteredRooms);
    }

    fetchRooms();
  });
  