"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var publicVapidKey = 'BPBc8omBrJ-NtB_XcIW0S_QS4pVe_dNVECdvRiDWH3DsIQF2CshhYYUgep2U9DWlu7Huns5dzkrlypdRIrIgp8Q';

function sendNotif(minute, hour, body) {
  var printdata, register, subscription, data, _data;

  return regeneratorRuntime.async(function sendNotif$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Register Service Worker
          console.log("Registering service worker...");
          console.log(minute, hour, body);
          printdata = {
            body: body,
            minute: minute,
            hour: hour
          };
          console.log(JSON.stringify(printdata));
          _context.next = 6;
          return regeneratorRuntime.awrap(navigator.serviceWorker.register("../../service-worker.js", {
            scope: "/profile/notifications"
          }));

        case 6:
          register = _context.sent;
          console.log("Service Worker Registered...");
          console.log(register);

          if ('PushManager' in window) {
            _context.next = 12;
            break;
          }

          console.log('Push messaging isn\'t supported.');
          return _context.abrupt("return");

        case 12:
          if (!(Notification.permission === 'denied')) {
            _context.next = 15;
            break;
          }

          console.log('The user has blocked notifications.');
          return _context.abrupt("return");

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(navigator.serviceWorker.ready);

        case 17:
          console.log("Registering Push...");
          _context.next = 20;
          return regeneratorRuntime.awrap(register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
          }));

        case 20:
          subscription = _context.sent;
          console.log("Push Registered...");

          if (!minute) {
            _context.next = 31;
            break;
          }

          data = {
            subscription: JSON.stringify(subscription),
            body: body,
            minute: minute,
            hour: hour
          };
          console.log(JSON.stringify(data)); // Send Push Notification

          console.log("Sending Push...");
          _context.next = 28;
          return regeneratorRuntime.awrap(fetch("https://tame-rose-clownfish-ring.cyclic.app/api/v1/notifs/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
              'Authorization': "bearer ".concat(localStorage.getItem('jwt'))
            }
          }));

        case 28:
          console.log("Push Sent...");
          _context.next = 37;
          break;

        case 31:
          _data = {
            subscription: JSON.stringify(subscription),
            body: body
          };
          console.log(JSON.stringify(_data)); // Send Push Notification

          console.log("Sending Push...");
          _context.next = 36;
          return regeneratorRuntime.awrap(fetch("https://tame-rose-clownfish-ring.cyclic.app/api/v1/subscribe", {
            method: "POST",
            body: JSON.stringify(_data),
            headers: {
              "content-type": "application/json",
              'Authorization': "bearer ".concat(localStorage.getItem('jwt'))
            }
          }));

        case 36:
          console.log("Push Sent...");

        case 37:
        case "end":
          return _context.stop();
      }
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

var _default = sendNotif;
exports["default"] = _default;