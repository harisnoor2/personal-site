let local_time = null;

function updateLocalTime() {
    if (!local_time) return;
    const timeString = local_time.toLocaleTimeString();
    document.getElementById("local-time").innerHTML = "its " + timeString + " for me";
    local_time = new Date(local_time.getTime() + 1000);
}

async function fetchTime() {
    try {
            const res = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Canada/Mountain");

            const data = await res.json();
            local_time = new Date(data.dateTime);

            setInterval(updateLocalTime, 1000);
            updateLocalTime();

    } catch (e) {
            console.error("Time fetch failed:", e);
            document.getElementById("local-time").innerHTML = "{failed to load time}";
    }
}

fetchTime();