var alCart = JSON.parse(localStorage.getItem("addressdata"));

alCart.map(function(elem){
    var h2=document.createElement("h2");
    h2.textContent=elem.firstname+" "+elem.lastname;


    document.querySelector("#Rcont").append(h2)

})
 