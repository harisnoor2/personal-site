let local_time = null;

function updateLocalTime() {
    if (!local_time) {return;}
    console.log();
    const timeString = local_time.toLocaleTimeString("en-US", {hour12 : true, hour : "numeric", minute: "2-digit"});
    console.log(timeString);
    document.getElementById("local-time").textContent = "Time in Edmonton: " + timeString;
    local_time.setSeconds(local_time.getSeconds() + 1);
}

async function fetchTime() {
    try {
            const res = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Canada/Mountain");

            const data = await res.json();
            local_time = new Date(data.dateTime);

            setInterval(updateLocalTime, 1000);
            updateLocalTime();

    } catch (e) {
            document.getElementById("local-time").textContent = "failed to load time";
            setTimeout(fetchTime, 5000);
    }
}

fetchTime();