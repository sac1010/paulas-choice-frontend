



let cartData = [{title:"2% BHA Liquid Exfoliant",qty:3,img:"https://www.paulaschoice.com/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/default/dwf0fd0988/images/products/skin-perfecting-2-percent-bha-liquid-2010-L.png?sw=360&sfrm=png",price:14, size:"5 oz"},
{title:"1% Retinol Treatment",img:"https://www.paulaschoice.com/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/en_US/dw20680a61/images/products/clinical-1-percent-retinol-treatment-8017-M.png?sw=360&sfrm=png",price:150, size:"10 oz"},
{title:"2% BHA Liquid Exfoliant",img:"https://www.paulaschoice.com/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/default/dwf0fd0988/images/products/skin-perfecting-2-percent-bha-liquid-2010-L.png?sw=360&sfrm=png",price:14, size:"5 oz"}]
var subtotal
displayCart(cartData)
function displayCart(cartData){
    if(cartData.length===0){
        document.getElementById("main").style.display = "none"
        document.getElementById("emptyAlert").style.display = "block"
    }
    else{
        document.getElementById("main").style.display = "flex"
        document.getElementById("emptyAlert").style.display = "none"
    }
    document.getElementById("container").innerText = ""
    document.getElementById("cartNum").innerText = `${cartData.length} items`;
    document.getElementById("dcount").innerText = cartData.length
     subtotal = 0;
    for(let i=0; i< cartData.length; i++){
        subtotal = subtotal+cartData[i].price*(cartData[i].qty||1)
    }
    var estTotal
    if(subtotal>=50){
       estTotal = subtotal 
       document.getElementById("shipping").innerText = `$0 (free shipping)`
    }
    else{
        document.getElementById("shipping").innerText = `$5`
     estTotal = subtotal+5
    }
    document.getElementById("price").innerText = `$${subtotal}`
    document.getElementById("total").innerText = `$${estTotal}`
cartData.map(function(elem, index){
    let mainDiv = document.createElement("div");
    let title = document.createElement("div");
    let titleAndPrice = document.createElement("div");
    let img = document.createElement("img");
    let price = document.createElement("div");
    let size = document.createElement("div");
    let qty = document.createElement("select")
    let total = document.createElement("div");
    let remove = document.createElement("div")
    let save = document.createElement("div");
    let mixDiv = document.createElement("div");
    let top = document.createElement("div")
    let bottom = document.createElement("div")
    top.className = "flex"
    bottom.className = "bottom"
    
    save.innerText = "  save for later"
    remove.innerText = `remove | ` 
    qty.innerHTML = `      <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>`
    qty.value = elem.qty || 1;
    title.innerText  = elem.title
    size.innerText = elem.size
    total.innerText = `$${elem.price*(elem.qty||1)}`
    img.src = elem.img;
    price.innerText = `$${elem.price}`
    titleAndPrice.append(title, price)
    top.append(qty, total)
    bottom.append(remove, save)
    mixDiv.append(top, bottom)
    mainDiv.append(img, titleAndPrice, size, mixDiv)
    document.getElementById("container").append(mainDiv)
    qty.addEventListener("change", function(){
        elem.qty = qty.value
        total.innerText = `$${elem.price*qty.value}`
        subtotal = 0
        for(let i=0; i< cartData.length; i++){
            subtotal = subtotal+cartData[i].price*(cartData[i].qty||1)
        }
        if(subtotal>=50){
            estTotal = subtotal 
            document.getElementById("shipping").innerText = `$0 (free shipping)`
         }
         else{
             document.getElementById("shipping").innerText = `$5`
          estTotal = subtotal+5
         }
        
        document.getElementById("price").innerText = `$${subtotal}`
        document.getElementById("total").innerText = `$${estTotal}`
    })
    remove.addEventListener("click", function(index){
        cartData.splice(index, 1)
        displayCart(cartData)
    })
    save.addEventListener("click", function(){
        let savedData =JSON.parse(localStorage.getItem("savedForLater")) || [];
        console.log(savedData)
        savedData.push(elem)
        localStorage.setItem("savedForLater", JSON.stringify(savedData))
        cartData.splice(index, 1)
        displayCart(cartData)  
        alert("product saved") 
        displaySaved()     
    })
})
}
document.getElementById("coupon-apply").addEventListener("click", ()=>{
    let code = document.getElementById("coupon-code").value
    if(code=="masai30"){
        console.log("good")
        document.getElementById("coupon").innerText = `coupon code applied(30% off)`
        document.getElementById("total").style.textDecoration = "line-through"
        document.getElementById("discounted").innerText = `$${0.70*subtotal}`
    }
    else{
        document.getElementById("coupon").innerText = `invalid code`
    }
})
displaySaved()
function displaySaved(){
    
    let savedData =JSON.parse(localStorage.getItem("savedForLater")) || []
    document.getElementById("savedItems").innerText = savedData.length
    if (savedData.length==0){
        document.getElementById("saved").innerText = "You have no saved products."
    }
    else{
        document.getElementById("saved").innerText = ""
        savedData.map(function(elem, index){
            let remove = document.createElement("div")
            let mainDiv = document.createElement("div")
            let title = document.createElement("div")
            let img = document.createElement("img")
            let add = document.createElement("button")
            remove.className = "removeBtn"
            img.src = elem.img;
            title.innerText = elem.title
            add.innerText = `ADD TO BAG`
            remove.innerText = `✕`
            mainDiv.append(remove,img, title, add)
            document.getElementById("saved").append(mainDiv)
            add.addEventListener("click", function(){
                cartData.push(elem)
                displayCart(cartData)
                savedData.splice(index, 1)
                localStorage.setItem("savedForLater", JSON.stringify(savedData))
                displaySaved()
            })

            remove.addEventListener("click", function(){
                savedData.splice(index, 1)
                localStorage.setItem("savedForLater", JSON.stringify(savedData))
                displaySaved();
            })
        })


        
    }
}

document.getElementById("estimate").addEventListener("click", ()=>{
    document.getElementById("zip").value = ""
    document.getElementById("zip").placeholder = `invalid zip code!`
    document.getElementById("zip").classList.add("err") 
})


