
const recommendation_url = "./travel_recommendation_api.json";
let recommendations = [];

let recommendations_opts = {
    'beaches': 'beaches',
    'beach': 'beaches',
    'countries': 'countries',
    'country': 'countries',
    'temples': 'temples',
    'temple': 'temples'
}


fetch(recommendation_url)
    .then((result) => result.json())
    .then((data) => {
        recommendations = data;
        console.log(recommendations);
    })



function searchRecommendations() {
    const value = document.getElementById("seachInput").value;
    const normalizedValue = value.toLowerCase();

    const recommendationType = recommendations_opts[normalizedValue];

    let recommendations_filtered = [];

    if (recommendationType != undefined) {

        switch (recommendationType) {

            case 'temples':
            case 'beaches':
                recommendations_filtered = recommendations[recommendationType]
                break;

            case 'countries':
                recommendations_filtered = recommendations[recommendationType].reduce((acc, country) => {
                    return acc.concat(country.cities);
                }, []);
                break;
        }

    }

    // Render
    const container = document.querySelector(".recommendations-content");
    container.innerHTML = ""; // clear previous

    if (!recommendations_filtered.length) {
        container.innerHTML =
            '<div style="color:#666;font-size:14px;">No results found.</div>';
        return;
    }

    const frag = document.createDocumentFragment();
    recommendations_filtered.forEach(({ name, imageUrl, description }) => {
        const card = document.createElement("div");
        card.className = "recommendation-card";

        const img = document.createElement("img");
        img.src = imageUrl || "https://via.placeholder.com/700x400?text=Travel";
        img.alt = name || "Destination";

        const body = document.createElement("div");
        body.className = "card-body";

        const h3 = document.createElement("h3");
        h3.textContent = name || "Unknown place";

        const p = document.createElement("p");
        p.textContent =
            description ||
            "Discover this amazing destination and plan your next trip.";

        const btn = document.createElement("button");
        btn.className = "btn-visit";
        btn.type = "button";
        btn.textContent = "Visit";
        btn.addEventListener("click", () => {
            console.log("Visit:", name);
            // add your navigation/action here
        });

        body.appendChild(h3);
        body.appendChild(p);
        body.appendChild(btn);

        card.appendChild(img);
        card.appendChild(body);

        frag.appendChild(card);
    });

    container.appendChild(frag);
}

function resetInput() {
    document.getElementById("seachInput").value = '';
}
