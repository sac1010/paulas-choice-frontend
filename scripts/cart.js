let cartData = [{title:"2% BHA Liquid Exfoliant",img:"https://www.paulaschoice.com/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/default/dwf0fd0988/images/products/skin-perfecting-2-percent-bha-liquid-2010-L.png?sw=360&sfrm=png",price:14, size:"5oz"},
{title:"2% BHA Liquid Exfoliant",img:"https://www.paulaschoice.com/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/default/dwf0fd0988/images/products/skin-perfecting-2-percent-bha-liquid-2010-L.png?sw=360&sfrm=png",price:14, size:"5oz"}]

displayCart(cartData)
function displayCart(cartData){
    document.getElementById("container").innerText = ""
    document.getElementById("cartNum").innerText = `${cartData.length} items`
    var subtotal = 0;
    for(let i=0; i< cartData.length; i++){
        subtotal = subtotal+cartData[i].price
    }
    var estTotal = subtotal+5
    document.getElementById("price").innerText = `$${subtotal}`
    document.getElementById("total").innerText = `$${estTotal}`
cartData.map(function(elem){
    let mainDiv = document.createElement("div");
    let title = document.createElement("div");
    let titleAndPrice = document.createElement("div");
    let img = document.createElement("img");
    let price = document.createElement("div");
    let size = document.createElement("div");
    let qty = document.createElement("select")
    let total = document.createElement("div");
    let remove = document.createElement("div")
    remove.innerText = "remove"
    qty.innerHTML = `      <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>`
    title.innerText  = elem.title
    size.innerText = elem.size
    total.innerText = elem.price
    img.src = elem.img;
    price.innerText = `$${elem.price}`
    titleAndPrice.append(title, price)
    mainDiv.append(img, titleAndPrice, size, qty, total)
    document.getElementById("container").append(mainDiv)
    qty.addEventListener("change", function(){
        elem.qty = qty.value
        total.innerText = elem.price*qty.value
        document.getElementById("price").innerText = `$${subtotal+elem.price*(qty.value-1)}`
        document.getElementById("total").innerText = `$${subtotal+elem.price*(qty.value-1)+5}`
    })
})
}
