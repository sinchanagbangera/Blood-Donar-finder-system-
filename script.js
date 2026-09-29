// Sample donor data
let donors = [
    {
        name: "Ananya Rao",
        age: 24,
        group: "O+",
        phone: "9876543210",
        location: "Puttur"
    },
    {
        name: "Rahul Shetty",
        age: 27,
        group: "A+",
        phone: "9876501234",
        location: "Mangaluru"
    },
    {
        name: "Kavya Bhat",
        age: 22,
        group: "B+",
        phone: "9988776655",
        location: "Mangaluru"
    },
    {
        name: "Arjun Kumar",
        age: 30,
        group: "O-",
        phone: "9845012345",
        location: "Puttur"
    },
    {
        name: "Nisha Pai",
        age: 25,
        group: "AB+",
        phone: "9911223344",
        location: "Udupi"
    },
    {
        name: "Vivek Rao",
        age: 29,
        group: "A-",
        phone: "9900112233",
        location: "Bantwal"
    }
];


// Display donors when website opens
document.addEventListener("DOMContentLoaded", function () {

    displayDonors(donors);

    updateDonorCount();

    // Search button
    document.getElementById("searchBtn").addEventListener("click", searchDonors);

    // Registration form
    document.getElementById("donorForm").addEventListener("submit", registerDonor);

});


// Display donor cards
function displayDonors(donorList) {

    const donorResults = document.getElementById("donorResults");

    const emptyState = document.getElementById("emptyState");

    donorResults.innerHTML = "";

    if (donorList.length === 0) {

        emptyState.classList.remove("hidden");

        return;

    } else {

        emptyState.classList.add("hidden");

    }


    donorList.forEach(function (donor) {

        const card = document.createElement("div");

        card.className = "donor-card";

        card.innerHTML = `

            <div class="donor-top">

                <div class="avatar">
                    ${donor.name.charAt(0)}
                </div>

                <div>
                    <div class="donor-name">
                        ${donor.name}
                    </div>

                    <div class="verified">
                        ✓ Available donor
                    </div>
                </div>

                <div class="blood-badge">
                    ${donor.group}
                </div>

            </div>


            <div class="donor-meta">

                <span>📍 ${donor.location}</span>

                <span>👤 ${donor.age} years</span>

            </div>


            <button
                class="call-btn"
                onclick="contactDonor('${donor.phone}')">

                📞 Contact Donor

            </button>

        `;

        donorResults.appendChild(card);

    });


    document.getElementById("resultCount").textContent =
        donorList.length +
        " donor" +
        (donorList.length === 1 ? "" : "s") +
        " found";
}



// Search donors
function searchDonors() {

    const bloodGroup =
        document.getElementById("searchGroup").value;

    const location =
        document.getElementById("searchLocation").value
        .toLowerCase()
        .trim();


    const filteredDonors = donors.filter(function (donor) {

        const groupMatch =
            bloodGroup === "" ||
            donor.group === bloodGroup;

        const locationMatch =
            location === "" ||
            donor.location.toLowerCase().includes(location);


        return groupMatch && locationMatch;

    });


    displayDonors(filteredDonors);

}



// Register a new donor
function registerDonor(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const age =
        document.getElementById("age").value;

    const group =
        document.getElementById("group").value;

    const phone =
        document.getElementById("phone").value.trim();

    const location =
        document.getElementById("location").value.trim();


    const newDonor = {

        name: name,

        age: Number(age),

        group: group,

        phone: phone,

        location: location

    };


    donors.push(newDonor);


    // Save donor in browser
    localStorage.setItem(
        "bloodDonors",
        JSON.stringify(donors)
    );


    // Update website
    displayDonors(donors);

    updateDonorCount();


    // Clear form
    document.getElementById("donorForm").reset();


    alert(
        "🎉 Registration successful! Thank you for becoming a donor."
    );


    // Go to donor section
    document.getElementById("find").scrollIntoView({
        behavior: "smooth"
    });

}



// Contact donor
function contactDonor(phone) {

    window.location.href =
        "tel:" + phone;

}



// Update donor count
function updateDonorCount() {

    const count = donors.length;

    document.getElementById("heroDonors").textContent = count;

    document.getElementById("statDonors").textContent = count;

}