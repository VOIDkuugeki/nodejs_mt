// Room API
const roomAPI = "https://6720c39598bbb4d93ca5df7a.mockapi.io/T_room"; // Replace with your actual API URL

// Icons for room details
const detailIcons = {
  Adult: "fas fa-user",
  Child: "fas fa-child",
  Bed: "fas fa-bed",
  Bathroom: "fas fa-bath",
  Kitchen: "fas fa-utensils",
};

// Icons for room facilities
const facilityIcons = {
  "Full Breakfast": "fas fa-utensils",
  "Service Bar": "fas fa-glass-cheers",
  "Cable/Satellite TV": "fas fa-tv",
  "Internet Access": "fas fa-wifi",
  "Free Laundry": "fas fa-tshirt",
  "Free Telephone Calls": "fas fa-phone",
  "Complimentary Laptop": "fas fa-laptop",
  "Hair Dresser": "fas fa-cut",
};

const facilityImages = {
  "Full Breakfast":
    "https://restinn.webinane.com/wp-content/uploads/2017/08/wsi-imageoptim-1-1.jpg",
  "Service Bar":
    "https://restinn.webinane.com/wp-content/uploads/2017/08/wsi-imageoptim-2-1.jpg",
  "Cable/Satellite TV":
    "https://restinn.webinane.com/wp-content/uploads/2017/08/wsi-imageoptim-3-1.jpg",
  "Internet Access":
    "https://restinn.webinane.com/wp-content/uploads/2017/08/wsi-imageoptim-4-1.jpg",
  "Free Laundry":
    "https://restinn.webinane.com/wp-content/uploads/2017/08/wsi-imageoptim-5-1-2.jpg",
  "Free Telephone Calls":
    "https://restinn.webinane.com/wp-content/uploads/2017/08/wsi-imageoptim-6-1.jpg",
  "Complimentary Laptop":
    "https://restinn.webinane.com/wp-content/uploads/2017/08/wsi-imageoptim-7-1.jpg",
  "Hair Dresser":
    "https://restinn.webinane.com/wp-content/uploads/2017/08/wsi-imageoptim-8-1.jpg",
};

// Function to render room details with icons
function renderDetailIcons(detailsArray) {
  const roomDetailsContainer = document.getElementById("roomDetails");
  roomDetailsContainer.innerHTML = ""; // Clear existing content

  detailsArray.forEach((detail) => {
    // Extract the key part of the detail (e.g., "Bed" from "1 Bed")
    const key = Object.keys(detailIcons).find((key) => detail.includes(key));
    const iconClass = detailIcons[key] || ""; // Get corresponding icon class

    // Create the HTML structure for the detail with icon
    const detailDiv = document.createElement("div");
    detailDiv.innerHTML = `<i class="${iconClass}"></i> ${detail}`;
    roomDetailsContainer.appendChild(detailDiv);
  });
}

// Function to render room facilities with images and icons
function renderFacilityImages(facilitiesArray) {
  const facilitiesContainer = document.getElementById("roomFacilities");
  facilitiesContainer.innerHTML = ""; // Clear existing facilities

  facilitiesArray.forEach((facility) => {
    const facilityDiv = document.createElement("div");
    facilityDiv.classList.add("col-md-3", "facility-card"); // Add any additional classes for styling

    // Get the corresponding image URL and icon class from the mappings
    const imgSrc = facilityImages[facility] || null;
    const iconClass = facilityIcons[facility] || ""; // Get corresponding icon class

    facilityDiv.innerHTML = `
              <div class="facility-container">
                  <div class="facility-card">
                      <span><i class="${iconClass} icon-spacing"></i>${facility}</span>
                      <img src="${imgSrc}" alt="${facility}" class="img-fluid">
                  </div>
              </div>
          `;

    facilitiesContainer.appendChild(facilityDiv);
  });
}

// Function to fetch room data by room_id
async function fetchRoomDetails(roomId) {
  try {
    // Fetch data from API
    const response = await fetch(`${roomAPI}/${roomId}`);
    const data = await response.json();

    // Update modal content dynamically
    document.getElementById("roomType").textContent = data.room_type || "Room";
    document.getElementById("roomDescription").textContent =
      data.description || "No description available";

    // Render room details
    renderDetailIcons(data.with);

    // Render room facilities if needed (example code)
    renderFacilityImages(data.facilities);

    // Show the content on the modal for room details
    const modal = new bootstrap.Modal(
      document.getElementById("roomDetailModal")
    );
    modal.show();
  } catch (error) {
    console.error("Error fetching room details:", error);
  }
}

// Function to close the modal
function closeModal() {
  const modalElement = document.getElementById("roomDetailModal");

  // Remove the 'show' class to hide the modal
  modalElement.classList.remove("show");

  // Remove 'display' and 'aria-hidden' attributes to fully close
  modalElement.style.display = "none";
  modalElement.setAttribute("aria-hidden", "true");

  // Remove backdrop (if present)
  document.querySelector(".modal-backdrop").remove();

  // Remove 'modal-open' class from body to reset scrolling
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("padding-right");
}
