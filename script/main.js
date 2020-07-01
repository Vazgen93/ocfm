const products = document.querySelector(".floorings");
async function Request(url, data = null) {
  const response = await fetch(url, data);
  return await response.json();
}
function Pagination(selector) {
  selector = document.querySelectorAll(selector);

  selector.forEach((li) => {
    li.addEventListener("click", (e) => {
      selector.forEach((tag) => {
        tag.className = "";
      });
      li.className = "active";
      let data = new FormData();
      data.append("pag", li.innerText);

      Request("server.php", {
        method: "POST",
        body: data,
      }).then((res) => {
        products.innerHTML = "";
        for (const data of res) {
          addProduct(data);
        }
        Zoom();
        new Buy({
          el: ".product",
        });
      });
    });
  });
}

Pagination(".pagination > ul li");

Request("server.php").then((res) => {
  products.innerHTML = "";
  for (const data of res) {
    addProduct(data);
  }
  Zoom();
  new Buy({
    el: ".product",
  });
  getBtn(document.querySelectorAll(".buy"));
});
function addProduct(data) {
  products.innerHTML += `
                        <div class="product" data-id="${data.id}">
                        <div class="product_name">
                            <a href="">${data.name}</a>
        
                        </div>
                        <div class="product_img">
                            <img src="./img/product/${data.images}" alt="">
                        </div>
                        
                        <div class="product_info">
                            <div class="quantiti">
                                <h2>QUANTITY OF CASE :</h2>
                                <input class="quantity_value" type="number" min="1" value="${data.quantity}">
                            </div>
                            <div class="outer_info">
                                <p>Square Feet:${data.covers}   <span>Subtotal:</span> <span>${data.price} $</span></p>
                            </div>
                        </div>
                        <div class="product_price">
                            <p>$<span>${data.sq}</span> /sq. ft.</p>
                            <p><span>${data.covers}</span> sq. ft.</p>
                            <p>$<span>${data.price}</span> /case</p>
                        </div>
                        <div class="free">
                            <div>
                                <img src="./img/Head/free-shipping_2.png" alt="">
                                <p>FREE  NATIONWIDE  SHIPPING</p>
                            </div>
                            <button class="buy">Buy</button>
                        </div>
                    </div> 
    `;
}
function Zoom() {
  const images = document.querySelectorAll(".product_img > img");
  images.forEach((img) => {
    img.addEventListener("click", () => {
      let modal = document.querySelector(".modal");
      modal.style = "display: flex";
      modal.children[0].addEventListener("click", () => {
        close(modal);
      });
      modal.children[1].addEventListener("click", () => {
        close(modal);
      });
      modal.children[2].src = img.src;
    });
  });
  function close(modal) {
    modal.style = "display: none";
  }
}
class Buy {
  constructor(config) {
    this.el = document.querySelectorAll(config.el);
    this.getQuantity();
  }
  getQuantity() {
    this.el.forEach((elem) => {
      let quantity = elem.querySelector("input");

      quantity.addEventListener("input", async function () {
        let data = new FormData();
        data.append("id", elem.dataset.id);
        await fetch("config/getprice.php", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            res.forEach((data) => {
              let price = elem.querySelector(".outer_info");
              price.innerHTML = `
            <p>Square Feet:${(data.covers * this.value).toFixed(2)}   
              <span>Subtotal:</span>: 
              <span>${(data.price * this.value).toFixed(2)} $</span>
            </p>`;

              getDinamicPrice({
                name: data.name,
                quantity: this.value,
                square: (data.covers * this.value).toFixed(2),
                subtotal: (data.price * this.value).toFixed(2),
              });
            });
          });
      });
    });
  }
}
let defaultPrice;
let dinamicPrice;
function getDinamicPrice(params) {
  dinamicPrice = params;
}
function getDefautPrice(params) {
  defaultPrice = params;
}
function getBtn(buy) {
  for (const btn of buy) {
    btn.addEventListener("click", BuyProduct);
  }
  function BuyProduct(e) {
    const form = document.querySelector("form");
    const buy_window = document.querySelector(".buy_window");

    buy_window.style = "display: block";
    let productName = this.parentElement.parentElement.querySelector(
      ".product_name> a"
    );

    let square = this.parentElement.parentElement.querySelector(
      ".product_price"
    ).children[1].children[0];
    let subtotal = this.parentElement.parentElement.querySelector(
      ".product_price"
    ).children[2].children[0];

    getDefautPrice({
      name: productName.innerText,
      quantity: 1,
      square: square.innerText,
      subtotal: subtotal.innerText,
    });

    let name = form.querySelector("#name"),
      quantity = form.querySelector("#quantity"),
      subtotalval = form.querySelector("#subtotal"),
      squareval = form.querySelector("#square"),
      close = form.parentElement.querySelector(".button"),
      overlay = form.parentElement.querySelector('.overlay')
    close.addEventListener("click", () => {
      form.parentElement.style = "display:none";
    });

    overlay.addEventListener("click", () => {
      form.parentElement.style = "display:none";
    });

    
    
    form.addEventListener("submit", getUserData);
    if (dinamicPrice === undefined) {
      name.value = defaultPrice.name;
      quantity.value = defaultPrice.quantity;
      subtotalval.value = defaultPrice.square;
      squareval.value = defaultPrice.subtotal;
    } else {
      name.value = dinamicPrice.name;
      quantity.value = dinamicPrice.quantity;
      subtotalval.value = dinamicPrice.square;
      squareval.value = dinamicPrice.subtotal;
    }

    function getUserData(e) {
      e.preventDefault();
      let data = new FormData(form);
      console.log(Array.from(data));
      
    }
  }
}
