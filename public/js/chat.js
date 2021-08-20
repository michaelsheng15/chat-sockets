const socket = io();

//Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");

const $messages = document.querySelector("#messages"); //div where messages are rendered

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

socket.on("locationMessage", (locationObject)=>{
  console.log(locationObject);
  const location = Mustache.render(locationTemplate, {
    location: locationObject.url,
    createdAt: moment(locationObject.createdAt).format('h:mm a')
  })
  $messages.insertAdjacentHTML('beforeend', location)
})

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
      createdAt: moment(message.createdAt).format('h:mm a'),
      message: message.text //passing the data into template
  })
  $messages.insertAdjacentHTML('beforeend', html)
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //disabled send button here since client has just pressed send
  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    //re-enable
    $messageFormButton.removeAttribute("disabled");

    //clear textbox ince sent
    $messageFormInput.value = "";

    //brings cursor back to input box
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  //disabled button while sending
  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      },
      () => {
        //re-enables button
        $sendLocationButton.removeAttribute("disabled");
        console.log("Location Shared!");
      }
    );
  });
});
