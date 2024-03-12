let kelimeler = JSON.parse(localStorage.getItem("kelimeler")) || ["elma", "armut", "mandalina", "kivi", "muz","portakal","karpuz","kavun","greyfurt"];
let secilenKelime = "";
let tahminKelime = [];
let yanlisKelime = 0;

function kelimeGoruntule() {
  let kelimelerContainer = document.getElementById("kelimeler-container");
  let kelimelerList = document.getElementById("kelimeler-liste");

  if (kelimelerContainer.style.display === "none") {
    kelimelerContainer.style.display = "block";
    kelimelerList.innerHTML = "";
    kelimeler.forEach(kelime => {
      let listItem = document.createElement("li");
      listItem.textContent = kelime;

      let silButton = document.createElement("span");
      silButton.textContent = " ➖";
      silButton.style.cursor = "pointer";
      silButton.onclick = function() { kelimeSil(kelime); };
      
      listItem.appendChild(silButton);
      
      kelimelerList.appendChild(listItem);
    });
  } else {
    kelimelerContainer.style.display = "none";
  }
}

function yeniOyun() {
  secilenKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];
  tahminKelime = Array(secilenKelime.length).fill('*');
  yanlisKelime = 0;
  goruntu();
}

function goruntu() {
  document.getElementById("kelime-goruntule").textContent = tahminKelime.join(" ");
  document.getElementById("tahmin-say").textContent = yanlisKelime;
}

function tahminEt() {
  let tahminGir = document.getElementById("tahmin-Gir");
  let tahmin = tahminGir.value.toLowerCase();

  if (tahmin.length === 1 && /^[a-z]+$/.test(tahmin)) {
    if (secilenKelime.includes(tahmin)) {
      for (let i = 0; i < secilenKelime.length; i++) {
        if (secilenKelime[i] === tahmin) {
          tahminKelime[i] = tahmin;
        }
      }
    } else {
      yanlisKelime++;
    }

    tahminGir.value = "";
    goruntu();

    if (tahminKelime.join("") === secilenKelime) {
      alert("Tebrikler,Kelimeyi buldun!");
      yeniOyun();
    } else if (yanlisKelime >= 4) {
      alert("Kaybettin! Doğru kelime: " + secilenKelime);
      yeniOyun();
    }
  } else {
    alert("Lütfen harf giriniz!");
  }
}
window.onload = function() {
  let kelimelerContainer = document.getElementById("kelimeler-container");
  kelimelerContainer.style.display = "none";
};
function kelimeEkle() {
  let yeniKelimeInput = document.getElementById("yeni-kelime");
  let yeniKelime = yeniKelimeInput.value.toLowerCase();

  if (yeniKelime.trim() !== "") {
    kelimeler.push(yeniKelime);
    localStorage.setItem("kelimeler", JSON.stringify(kelimeler));
    kelimeGoruntule();
    yeniKelimeInput.value = "";
  } else {
    alert("Lütfen bir kelime girin!");
  }
}

function kelimeSil(silinecekKelime) {
  let index = kelimeler.indexOf(silinecekKelime);
  if (index !== -1) {
    kelimeler.splice(index, 1);
    localStorage.setItem("kelimeler", JSON.stringify(kelimeler));
    kelimeGoruntule();
  }
}

yeniOyun();