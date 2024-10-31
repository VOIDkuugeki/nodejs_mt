const roomAPI = "https://6720c39598bbb4d93ca5df7a.mockapi.io/T_room";
let rooms = [];

async function fetchRooms() {
  try {
    const response = await fetch(roomAPI);
    rooms = await response.json();
    displayRooms('All Rooms');
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}

function displayRooms(roomType) {
  const roomCardsContainer = document.getElementById("room-cards");
  roomCardsContainer.innerHTML = '';

  let filteredRooms;

  switch (roomType) {
    case 'Double Room':
      filteredRooms = rooms.filter(room => (room.price >= 800));
      break;
    case 'Single Room':
      filteredRooms = rooms.filter(room => (room.price < 800));
      break;
    case 'Family Room':
      filteredRooms = rooms.filter(room => room.room_type === 'Family Room' || room.room_type === 'Standard Room');
      break;
    case 'Luxury Room':
      filteredRooms = rooms.filter(room => room.room_type === 'Deluxe Room' || room.room_type === 'Luxury Room');
      break;
    case 'All Rooms':
      filteredRooms = rooms;
      break;
    default:
      filteredRooms = [];
  }

  filteredRooms.forEach((room) => {
    const card = document.createElement("div");
    card.className = "col-md-3 mb-4";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${room.room_image}" class="card-img-top" alt="${room.room_type}">
        <div class="card-body">
          <h5 class="card-title">${room.room_type}</h5>
          <p class="card-text"><strong>Price:</strong> $${room.price}/night</p>
          <div class="d-flex flex-column">
            <button class="btn btn-custom mb-2" onClick="openBookingModal(${room.id})">Book Now</button>
            <button class="btn btn-custom" onClick="fetchRoomDetails(${room.id})">Detail</button>
          </div>
        </div>
      </div>
    `;
    roomCardsContainer.appendChild(card);
  });
}

document.querySelectorAll('.btn-outline-warning').forEach(button => {
  button.addEventListener('click', (e) => {
    const roomType = e.target.innerText;
    displayRooms(roomType);
  });
});

document.addEventListener("DOMContentLoaded", fetchRooms);
