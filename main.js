let title =document.getElementById('title');
let price =document.getElementById('price');
let texes =document.getElementById('texes');
let ads =document.getElementById('ads');
let total =document.getElementById('total');
let discount =document.getElementById('discount');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mood ='create';
let tmp;
///////////////total price
function getTotal(){
 if (price.value != '')
    {
        let result =( +price.value + +texes.value+ +ads.value)- +discount.value;
        total.innerHTML= (result + ' EGP');
        total.style.backgroundColor='green';
    }
    else {
     total.style.backgroundColor='red';
     total.innerHTML=' ';
    }

}
////////////////////// create Product
let datapro;

if(localStorage.product != null)
    {
 datapro=JSON.parse(localStorage.product)
    }
    else
        {datapro=[];}

submit.onclick = function(){
    let newPro={
        title:title.value.toLowerCase(),
         price:price.value,
          ads:ads.value,
           texes:texes.value,
            discount:discount.value,
             count:count.value,
              category:category.value.toLowerCase(),
               total:total.innerHTML,
    }
    if (title.value !='' && price.value !=''&& category.value !=''&&datapro.count<100) {
        if(mood ==='create'){
    if(newPro.count>1){
        for (let i = 0; i < newPro.count; i++) 
            {
           datapro.push(newPro)   ; 
            }
    }
    else{datapro.push(newPro)};
    }
    else{ 
        datapro[ tmp ]  = newPro; 
        submit.innerHTML='create';
        count.style.display='block';


     }
     clearData();
    }
    
    
    localStorage.setItem('product',JSON.stringify(datapro))
    console.log(datapro)
    showData()
}
//////////clearDaTa
function clearData(){
     title.value='';
     price.value='';
     texes.value='';
     ads.value='';
     discount.value='';
     count.value='';
     category.value='';
     total.innerHTML='';
}
/////////////////////read data in table
function showData(){
    getTotal()
    let table ='';
    for (let i = 0; i < datapro.length; i++) {
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
          <td>${datapro[i].texes}</td>
           <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
             <td>${datapro[i].count}</td>
              <td>${datapro[i].category}</td>
              <td>${datapro[i].total}</td>
              <td><button onclick="updateData(${i})">update</button></td>
              <td><button onclick="deleteitem(${i})">delete</button></td>
        <tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let deleteAll=document.getElementById('btnmDelete');
 if(datapro.length>0)
    {
        deleteAll.innerHTML=`<button onclick="deleteAll()">delete all (${datapro.length})</button>`
     }else{deleteAll.innerHTML=``}
}
showData()

////////////////// delete item
function deleteitem(i){
datapro.splice(i,1)
localStorage.product=JSON.stringify(datapro)
showData()
}
////////////////////////delet all data
function deleteAll(){
datapro.splice(0)
localStorage.clear();
showData();
}
//////////////////////////update
function updateData(i){
title.value=datapro[i].title;
price.value=datapro[i].price;
texes.value=datapro[i].texes;
ads.value=datapro[i].ads;
discount.value=datapro[i].discount;
getTotal();
count.style.display='none';
category.value=datapro[i].category;
submit.innerHTML='Update'
mood ='update'
tmp=i;
scroll({ top:0,
    behavior:'smooth',
}); 
}
///////////////////////////////search
let searchMood='title';
function getsearchMood(id){
    let search=document.getElementById('search')
if(id =='searchTitle'){
searchMood = 'title';
search.placeholder='search by title';
}
else{
    searchMood ='category'
search.placeholder='search by category';
}
    search.focus();
    search.value='';
    showData();
}
function searchData(value){
    
    let table=``;
if(searchMood=='title')
{
    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i].title.includes(value.toLowerCase())) {
            table +=`
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
          <td>${datapro[i].texes}</td>
           <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
             <td>${datapro[i].count}</td>
              <td>${datapro[i].category}</td>
              <td>${datapro[i].total}</td>
              <td><button onclick="updateData(${i})">update</button></td>
              <td><button onclick="deleteitem(${i})">delete</button></td>
        <tr>
        `
            
        }
        
    }

}
else{
   for (let i = 0; i < datapro.length; i++) {
        if (datapro[i].category.includes(value.toLowerCase())) {
            table +=`
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
          <td>${datapro[i].texes}</td>
           <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
             <td>${datapro[i].count}</td>
              <td>${datapro[i].category}</td>
              <td>${datapro[i].total}</td>
              <td><button onclick="updateData(${i})">update</button></td>
              <td><button onclick="deleteitem(${i})">delete</button></td>
        <tr>
        `
            
        }
        
    }

}
document.getElementById('tbody').innerHTML=table;
}
