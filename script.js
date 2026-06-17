const predictBtn = document.getElementById("predictBtn");
const imageInput = document.getElementById("imageInput");
const resultDiv = document.getElementById("result");

predictBtn.addEventListener("click", async () => {
    const file = imageInput.files[0];

    if (!file) {
        alert("Pilih gambar dulu!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        resultDiv.innerHTML = "Memproses...";

        const response = await fetch(
            "https://plantcare-backend-b8ad.onrender.com/predict",
            {
                method: "POST",
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        // BARU bikin URL gambar setelah predict berhasil
        const imageUrl = URL.createObjectURL(file);

        resultDiv.innerHTML = `
            <img
                src="${imageUrl}"
                style="max-width:300px; border-radius:10px; margin-bottom:15px;"
            >

            <p><b>Filename:</b> ${data.filename}</p>

            <p><b>Prediksi:</b> ${data.prediction}</p>

            <p><b>Confidence:</b> ${(data.confidence * 100).toFixed(2)}%</p>
        `;

    } catch (error) {
        console.error(error);

        resultDiv.innerHTML = `
            <b>Terjadi Error</b><br>
            ${error.message}
        `;
    }
});