let qr;

function generateQR() {
  let qrText = document.getElementById("qrText").value;
  let qrContainer = document.getElementById("qrCode");

  qrContainer.innerHTML = "";
  if (!qrText) {
    alert("Please enter text or URL");
    return;
  }

  qr = new QRCode(qrContainer, {
    text: qrText,
    width: 200,
    height: 200
  });
}
