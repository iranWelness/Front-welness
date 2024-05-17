const publicVapidKey = 'BPBc8omBrJ-NtB_XcIW0S_QS4pVe_dNVECdvRiDWH3DsIQF2CshhYYUgep2U9DWlu7Huns5dzkrlypdRIrIgp8Q';
async function sendNotif(minute, hour, body) {
    // Register Service Worker
    console.log("Registering service worker...");
    console.log(minute, hour, body)
    let printdata = {
        body: body,
        minute: minute,
        hour: hour
    };
    console.log(JSON.stringify(printdata))
    const register = await navigator.serviceWorker.register("../../service-worker.js", {
        scope: "/profile/notifications"
    });
    console.log("Service Worker Registered...");
    console.log(register)
    if (!('PushManager' in window)) {
        console.log('Push messaging isn\'t supported.');
        return;
    }
    //
    if (Notification.permission === 'denied') {
        console.log('The user has blocked notifications.');
        return;
    }
    // Register Push.
    await navigator.serviceWorker.ready;
    console.log("Registering Push...");
    let subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered...");
    if (minute) {
        let data = {
            subscription: JSON.stringify(subscription),
            body: body,
            minute: minute,
            hour: hour
        };
        console.log(JSON.stringify(data))
        // Send Push Notification
        console.log("Sending Push...");
        await fetch("https://tame-rose-clownfish-ring.cyclic.app/api/v1/notifs/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.getItem('jwt')}`,
            }
        });
        console.log("Push Sent...");
    } else {
        let data = {
            subscription: JSON.stringify(subscription),
            body: body,
        };
        console.log(JSON.stringify(data))
        // Send Push Notification
        console.log("Sending Push...");
        await fetch("https://tame-rose-clownfish-ring.cyclic.app/api/v1/subscribe", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                'Authorization': `bearer ${localStorage.getItem('jwt')}`,
            }
        });
        console.log("Push Sent...");
    }

}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default sendNotif;