// Initialize User

if (user === undefined) {
    var user = {
        name: 'Anonymous',
        img: '/images/no-foto.jpg'
    };
}

console.log('user:', user);


var isWriting = false;
var timeDelay = 3000;
var writingTimeout = null;
var writingMessage = null;
var socket = io();
socket.on("chat-message", function (msg) {
    let nombre = document.getElementById("nombre")
    let texto = document.getElementById("mensaje")
    let fecha = new Date();
    let li = document.createElement("li");
    let m = document.querySelector("ul#messages")
    let d = document.querySelector("div#message")
    li.innerHTML = (msg);
    texto.value = ""
    m.appendChild(li);
    d.scrollTop = d.scrollHeight - d.clientHeight


})

socket.on("new-connection", function (obj) {
    console.log("this is the user id" + obj.id)
    user.id = obj.id
    obj.messages.forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = (element);
        document.querySelector("ul#messages").appendChild(li)
    });


})
socket.on("start-writing", function (another_user) {
    console.log("detecta escritura")
    if (another_user.id != user.id) {
        console.log("detecta usuario diferente")
        writingMessage = document.getElementById('writing-message');
        writingMessage.innerText = another_user.name + " is writing...";
        writingMessage.style.display = "block"
    }
});
socket.on("stop-writing", function (user) {
    console.log("detecta paro de escritura")
    writingMessage = document.getElementById('writing-message');
    writingMessage.style.display = "none"
    console.log(message)
})
var bot = document.getElementById("btn");
var mensaje = document.getElementById("mensaje");
bot.addEventListener("click", function (e) {
    e.preventDefault();
    let nombre = document.getElementById("nombre")
    console.log(nombre)
    let fecha = new Date();
    console.log(fecha)
    console.log(user.img)

    socket.emit('chat-message', `<img src=${user.img} alt="Smiley face" height="30" width="30">` + mensaje.value + "  " + "    " + "\n //Sent By: " + nombre.innerText + " at " + fecha);
    console.log("c")
    e.preventDefault();
})

if (mensaje) {
    mensaje.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            socket.emit('stop-writing', user);
        } else {
            socket.emit('start-writing', user);
            if (!isWriting) {
                isWriting = true;
            } else {
                clearTimeout(writingTimeout);
            }
            writingTimeout = setTimeout(function () {
                isWriting = false;
                socket.emit('stop-writing', user);
            }, timeDelay);
        }
    })
}


