document.getElementById("searchBtn").addEventListener("click", function () {
    const ip = document.getElementById("ipInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (ip === "") {
        resultDiv.innerHTML = "<p style='color: red;'>Please enter an IP address!</p>";
        return;
    }

    fetch(`https://ipinfo.io/${ip}/geo`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultDiv.innerHTML = "<p style='color: red;'>Invalid IP address!</p>";
                return;
            }

            // Generate random phone number based on country
            const country = data.country || "Unknown";
            const phonePrefixes = {
                "IQ": "07",
                "US": "1-555",
                "UK": "44-79",
                "FR": "33-6",
                "Unknown": "00"
            };
            const randomPhone = phonePrefixes[country] || phonePrefixes["Unknown"];
            const randomNumber = randomPhone + Math.floor(10000000 + Math.random() * 90000000);

            resultDiv.innerHTML = `
                <p><strong>IP:</strong> ${data.ip || "غير متوفرة"}</p>
                <p><strong>القارة:</strong> غير متوفرة</p>
                <p><strong>الدولة:</strong> ${data.country || "غير متوفرة"}</p>
                <p><strong>المنطقة:</strong> ${data.region || "غير متوفرة"}</p>
                <p><strong>المدينة:</strong> ${data.city || "غير متوفرة"}</p>
                <p><strong>مزود الخدمة:</strong> Hulum</p>
                <p><strong>العملة:</strong> غير متوفرة</p>
                <p><strong>التوقيت:</strong> ${data.timezone || "غير متوفرة"}</p>
                <p><strong>رقم الهاتف:</strong> ${randomNumber}</p>
                <p><strong>المحلة:</strong> none</p>
                <p><strong>الزقاق:</strong> none</p>
                <p><strong>اسم الضحية:</strong> none</p>
                <p><strong>صورة الضحية:</strong> none</p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = "<p style='color: red;'>An error occurred. Please try again!</p>";
        });
});
