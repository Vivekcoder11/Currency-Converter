const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Currency → Country Code (for flags)
const countries = {
    "USD": "US",
    "INR": "IN",
    "EUR": "EU",
    "AUD": "AU",
    "GBP": "GB",
    "JPY": "JP",
    "CAD": "CA"
};

// Dummy exchange rates (for offline testing)
const rates = {
    "USD": { "INR": 83, "EUR": 0.92, "AUD": 1.52, "GBP": 0.79, "JPY": 148, "CAD": 1.37 },
    "INR": { "USD": 0.012, "EUR": 0.011, "AUD": 0.018, "GBP": 0.0095, "JPY": 1.78, "CAD": 0.016 },
    "EUR": { "USD": 1.09, "INR": 90, "AUD": 1.65, "GBP": 0.86, "JPY": 160, "CAD": 1.47 }
    // add more if needed
};

// 1️⃣ Add currencies to dropdowns
for (let select of dropdowns) {
    for (let currCode in countries) {
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;
        if (select.name === "from" && currCode === "USD") {
            option.selected = true;
        }
        if (select.name === "to" && currCode === "INR") {
            option.selected = true;
        }
        select.append(option);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// 2️⃣ Update flag when currency changes
function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countries[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// 3️⃣ Convert Currency (using dummy rates)
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let from = fromCurr.value;
    let to = toCurr.value;

    if (from === to) {
        msg.innerText = `${amtVal} ${from} = ${amtVal} ${to}`;
        return;
    }

    if (rates[from] && rates[from][to]) {
        let rate = rates[from][to];
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
    } else {
        msg.innerText = "Conversion rate not available!";
    }
});
