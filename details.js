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

  // Create an array to hold the features in order
  const orderedFeatures = [];

  // Map beds, adults, children from the featureArray
  if (featureArray[0] > 0) {
    orderedFeatures.push(
      `${featureArray[0]} Bed${featureArray[0] > 1 ? "s" : ""}`
    );
  }
  if (featureArray[1] > 0) {
    orderedFeatures.push(
      `${featureArray[1]} Adult${featureArray[1] > 1 ? "s" : ""}`
    );
  }
  if (featureArray[2] > 0) {
    orderedFeatures.push(
      `${featureArray[2]} Child${featureArray[2] > 1 ? "ren" : ""}`
    );
  }

  // Append any other features from the featureArray
  if (featureArray.length > 3) {
    const otherFeatures = featureArray.slice(3);
    orderedFeatures.push(...otherFeatures);
  }

  // Render the features with icons
  orderedFeatures.forEach((feature) => {
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
    renderFeaturelItem([
      data.beds,
      data.max_adults,
      data.max_children,
      ...data.features,
    ]);

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
