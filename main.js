const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");

//İzleme İşlemleri
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

//Toplam State'i (durum)

let toplam = 0;

function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

//Harcama Oluşturma
function addExpense(e) {
  e.preventDefault();

  //Doğrulama Yapma
  if (!fiyatInput.value || !harcamaInput.value) {
    alert("Formları Doldurun");

    return;
  }

  //Div Oluşturma
  const harcamaDiv = document.createElement("div");
  //Class Ekleme
  harcamaDiv.classList.add("harcama");
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  //İçerik Ayarlama
  harcamaDiv.innerHTML = `
    <h2>${harcamaInput.value}</h2>
    <h2 id="value">${fiyatInput.value}</h2>
    <div class="buttons">
      <img id="payment" src="images/icons8-payment-50.png" alt="" />
      <img id="remove" src="images/icons8-delete-100.png" alt="" />
    </div>
       `;
  //Html i Gönderme
  liste.appendChild(harcamaDiv);
  //Toplamı Güncelle
  updateToplam(fiyatInput.value);
  //Formu Temizle
  harcamaInput.value = "";
  fiyatInput.value = "";
}

//Listeye Tıklanma Olayı
function handleClick(e) {
  //Tıklanınlan Elemanı Alma
  const element = e.target;
  if (element.id === "remove") {
    //Tıklanılan Sil Butonunun Kapsayıcısını Alma
    const wrapperElement = element.parentElement.parentElement;

    //Silinen Elemanın Fiyatını Alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;

    //Silinenin Fiyatını Toplamdan Çıkarma
    updateToplam(-Number(deletedPrice));
    //Kapsayıcıyı Html den Kaldırma
    wrapperElement.remove();
  }
}

function handleFilter(e) {
    const items = liste.childNodes;
    items.forEach((item)=>{
        switch(e.target.value){
            case 'all':
              item.style.display ='flex';
              break;

            case 'payed':
                if(!item.classList.contains('payed')){
                    item.style.display ='none';
                }else{
                    item.style.display='flex';
                }

                break;

                case 'not-payed':
                  if (item.classList.contains('payed')){
                    item.style.display ='none';
                  }else {
                    item.style.display ='flex'
                  }

        }
    });

}

