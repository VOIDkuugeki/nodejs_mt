// Room API
const roomAPI = "https://6720c39598bbb4d93ca5df7a.mockapi.io/T_room"; // Replace with your actual API URL

// Icons for room features
const featureIcons = {
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

// Function to render room features with icons
function renderFeaturelItem(featureArray) {
  const featureContainer = document.getElementById("roomFeatures");
  featureContainer.innerHTML = ""; // Clear existing content

  featureArray.forEach((feature) => {
    // Extract the key part of the feature (e.g., "Bed" from "1 Bed")
    const key = Object.keys(featureIcons).find((key) => feature.includes(key));
    const iconClass = featureIcons[key] || ""; // Get corresponding icon class

    // Create the HTML structure for the feature with icon
    const featureDiv = document.createElement("div");
    featureDiv.innerHTML = `<i class="${iconClass} icon-spacing"></i> ${feature}`;
    featureContainer.appendChild(featureDiv);
  });
}

// Function to render room facilities with images and icons
function renderFacilityItem(facilitysArray) {
  const facilityContainer = document.getElementById("roomFacilities");
  facilityContainer.innerHTML = ""; // Clear existing facilities

  facilitysArray.forEach((facility) => {
    const facilityDiv = document.createElement("div");
    facilityDiv.classList.add("col-md-3", "facility-card");

    // Get the corresponding image URL and icon class from the mappings
    const imgSrc = facilityImages[facility] || null;
    const iconClass = facilityIcons[facility] || "";

    facilityDiv.innerHTML = `
              <div class="facility-container">
                  <div class="facility-card">
                      <span><i class="${iconClass} icon-spacing"></i>${facility}</span>
                      <img src="${imgSrc}" alt="${facility}" class="img-fluid">
                  </div>
              </div>
          `;

    facilityContainer.appendChild(facilityDiv);
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

    // Render room features
    renderFeaturelItem(data.features);

    // Render room facilities
    renderFacilityItem(data.facilities);

    // Show the content on the modal for room features
    const modal = new bootstrap.Modal(
      document.getElementById("roomDetailModal")
    );
    modal.show();
  } catch (error) {
    console.error("Error fetching room features:", error);
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
