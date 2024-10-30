const roomAPI = "https://6720c39598bbb4d93ca5df7a.mockapi.io/T_room";

async function fetchRooms() {
    try {
      const response = await fetch(roomAPI);
      const rooms = await response.json();
      const roomCardsContainer = document.getElementById('room-cards');

      rooms.forEach(room => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4';
        card.innerHTML = `
          <div class="card h-100">
            <img src="${room.room_image}" class="card-img-top" alt="${room.room_type}">
            <div class="card-body">
              <h5 class="card-title">${room.room_type}</h5>
              <p class="card-text"><strong>Price:</strong> $${room.price}/per night</p>
              <button class="btn btn-primary w-100" onClick="openBookingModal(${room.id})">Book Now</button>
            </div>
          </div>
        `;
        roomCardsContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', fetchRooms);