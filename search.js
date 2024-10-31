
  async function fetchRoomsForForm() {
    try {
      const response = await fetch("https://6720c39598bbb4d93ca5df7a.mockapi.io/T_room");
      return await response.json();
    } catch (error) {
      console.error("Error fetching rooms for form:", error);
      return [];
    }
  }

  function displayRoomsForForm(rooms) {
    const roomCardsContainer = document.getElementById("room-cards-form");
    roomCardsContainer.innerHTML = "";
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

  document.addEventListener("DOMContentLoaded", async () => {
    const rooms = await fetchRoomsForForm();

    document.getElementById("reservationForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const selectedRoomType = formData.get('room-type');
      const filteredRooms = rooms.filter(room => room.room_type === selectedRoomType);
      displayRoomsForForm(filteredRooms);
      $('#checkoutModalForm').modal('show');
    });
  });
