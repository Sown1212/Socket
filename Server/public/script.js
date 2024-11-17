const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

const client = new WebSocket(`ws://${window.location.host}`);

client.onmessage = (event) => {
    const data = decode(event);
    handleEvent(data);
};

function decode(event){
    const rawData = JSON.parse(event.data);
    const decodeData = String.fromCharCode(...rawData.data);
    const data = JSON.parse(decodeData);
    return data;
}

function handleEvent(data){
    if (data.type == 'message'){
        const item = document.createElement('div');
        item.textContent = data.message;
        console.log(data.message);
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value){
        client.send("{\"type\":\"message\", \"message\":\""+ input.value + "\"}")
        input.value = '';
    }
});