
const content = document.querySelector('.middle__content');
const plus = document.querySelector('.middle__plus');
const addList = document.querySelector('.middle__addListBtn');
const listBtnContainer = document.querySelector('.middle__lstBtns');
const listContainer = document.querySelector('.middle__container');
const totalBox = document.querySelector('.middle__totalBox'); 
const totalValue = document.querySelector('.middle__totalValue'); 
const array = document.querySelector('.middle__array')
const delLists = document.querySelector('.middle__delList')

const modal = document.querySelector('.modal')
const instBtn = document.querySelector('.middle__instructions')
const header = document.querySelector('.header')
const headerTitle = document.querySelector('.header__savedListTitle')
const middle = document.querySelector('.middle')
const btnAlign = document.querySelector('.middle__btnAlign')
const container = document.querySelector('.middle__container')
const darkMode = document.querySelector('.header__darkMode')
const body = document.querySelector('.body')

var count = 0; 
var listCount = 0; 

var counter = new Array(); 
var quantityValue  = []; 
var productName = [];
var totalCombined = [];

var listBtnMenu = []; 
var totalMenu = []; 

var listID = 0; 
var listContent = [];
var idsPressed = []; 
var list;

var listBoxInner;
var total; 
var totalTitle; 

var once = 0;  

var binID; 
var sum = 0; 

var lastIDClicked = 0;

let attr;  

const save = document.querySelector('.middle__save');


darkMode.addEventListener('click', function(){
        // body.style.background = 'rgb(207 227 225 / 48%)'
        // darkMode.style.color = 'white'

        // document.querySelector('.header__title').style.color = 'white'

        // body.classList.toggle('darkBackground')
        middle.classList.toggle('darkBackground')

        // body.style.background = 'rgb(0, 84, 88)'
        // console.log(darkMode.children)
        darkMode.classList.toggle('darkText')
        document.querySelector('.header__title').classList.toggle('darkText')
        document.querySelector('.middle__editIns').classList.toggle('lightText')
        
        
        

    }
)

save.addEventListener('click', function(){

    save.style.background = 'linear-gradient(180deg, rgba(2, 118, 107, 0.67) 41.15%, rgba(163, 235, 177, 0.67) 87.5%)'
    save.style.color = '#ffffff'
  
    setTimeout(()=>{
        save.style.background = '#E9E8E8'
        save.style.color = '#000000'
    }, 1000); 
    
    alrtUser('All List Items Saved','linear-gradient(180deg, rgba(33, 182, 168, 0.68) 0%, rgba(163, 235, 177, 0.68) 100%)' )

    //check the status on the display style of add list btn
    
    console.log('save')
    
    var new_data = {

        content: content.innerHTML, 
        totalBoxHTML: totalBox.innerHTML, 

        count: count, 
        listCount: listCount,  
    
        counter: counter, 
        quantityValue: quantityValue,   
        productName: productName, 
        totalCombined: totalCombined , 
        
        listBtnMenu: listBtnMenu, 
        totalMenu: totalMenu, 

        listID: listID,  
        listContent: listContent, 
        idsPressed: idsPressed, 
        list: list, 
        
        listBoxInner: listBoxInner, 
         
        once: once,  
        
        binID: binID,  
        sum: sum,  
        
        lastIDClicked: lastIDClicked,  
        attr: attr, 

    }

    if(localStorage.getItem('c') == null){
        localStorage.setItem('c', '[]');
    }

    localStorage.setItem('c', JSON.stringify(new_data))
    console.log(attr)
    window.location.reload()//reloads the page to reflect the change
    
    
})

var items = JSON.parse(localStorage.getItem('c'))
window.onload = function (){
    delLists.style.display = 'block'
    clear.style.display = 'none'
    
    //prevents total from displaying after page is refreshed until a list btn is pressed 
    totalBox.style.opacity = 0
   
    //sets all list btn colors to neutral since none are pressed yet  
    list = document.querySelectorAll('.middle__lstBtn'); 
    list.forEach(function(l){
        l.parentElement.children[lastIDClicked].style.background = '#E9E8E8'
    })    

    //grab all locally stored items and store them into their variables again
    if(items != null){
        attr = items.attr 

        let editIns = document.querySelector('.middle__editIns')
        editIns.style.display = 'block'
        
        modal.style.display = 'none'   

        content.innerHTML = items.content
        totalBox.innerHTML = items.totalBoxHTML
        count = items.count
        listCount = items.listCount
    
        counter = items.counter 
        quantityValue = items.quantityValue   
        productName = items.productName 
        totalCombined = items.totalCombined  
        
        listBtnMenu = items.listBtnMenu 
        listID = items.listID,  
        listContent = items.listContent 
        idsPressed = items.idsPressed 
        list = items.list 
        
        listBoxInner = items.listBoxInner 
        // total = items.total 
        // totalTitle = items.totalTitle  
    
        once = items.once  
        
        binID = items.binID  
        sum = items.sum  
        
        lastIDClicked = items.lastIDClicked

        

        addListFun()//run this again to display the lists instaed of having to press new list again
        
        //checks whether to display the addlist btn based on what display settings it had before reload
        if(attr == 1){
            addList.style.display = 'block'
        }
        if(attr == 0){
            addList.style.display = 'none'
        }
    }

}

//deletes or clears the local stored data so you can start fresh
delLists.addEventListener('click', function(){
    let conf = confirm("are you sure? ")
    if(conf == true){
        console.log('confirmed')

        delLists.style.background = 'linear-gradient(180deg, #08665d 0%, rgb(147 243 165) 100%)'
        delLists.style.color = '#ffffff'
    
        setTimeout(()=>{
            delLists.style.background = 'linear-gradient(180deg, #A3EBB1 0%, rgba(163, 235, 177, 0) 100%)'
            delLists.style.color = '#000000'
        }, 500); 

        localStorage.clear() //clears all locally stored data
        window.location.reload()//reloads the page to reflect the change
    }
    else{
        console.log('clearing all not confirmed')
    }
})

//show instructions at onload and when insturctions btn is pressed 
window.addEventListener('load', function(){
    const exitModal = this.document.querySelector('.modal__exit')
    exitModal.addEventListener('click', function(){
        modal.style.display = 'none'   
    })
})

instBtn.addEventListener('click', function(){

    instBtn.style.background = 'linear-gradient(180deg, #08665d 0%, rgb(147 243 165) 100%)'
    instBtn.style.color = '#ffffff'
  
    setTimeout(()=>{
        instBtn.style.background = 'linear-gradient(180deg, #A3EBB1 0%, rgba(163, 235, 177, 0) 100%)'
        instBtn.style.color = '#000000'
    }, 500); 

    modal.style.display = 'block' 
    const exitModal = document.querySelector('.modal__exit')
    exitModal.addEventListener('click', function(e){
        modal.style.display = 'none'   
    })
})

function addListFun (){

    listBtnContainer.innerHTML = listBtnMenu.join(" ");  
    
    calTotal();

    product = document.querySelectorAll('.middle__product');
    quantity = document.querySelectorAll('.middle__quantity'); 
    
    setQuantity(quantity);
    setProduct(product);

    displayContent();
    displayTotal();


    //watches for the click of each list button to Change its COLOR_________
    list = document.querySelectorAll('.middle__lstBtn'); 
    list.forEach(function(l){
        // console.log(l.dataset.id);
        l.parentElement.children[lastIDClicked].style.background = ' linear-gradient(180deg, #21b6a8ab 0%, #21b6a859 95.83%)'
        
    })//_____________________________________________________________________
    //display only works when a new list is added 
    totalBoxInner = document.querySelector('.middle__totalBox'); 

    for(let i = 0; i<totalBoxInner.length; i++){
        total[i].style.display="block"; 
        totalTitle[i].style.display= "block"; 
        console.log('block')
    }


    list.forEach(function(lst){     
        
        lst.addEventListener('click', function(e){

            clear.style.display = 'block'
            delLists.style.display = 'none'

            let editIns = document.querySelector('.middle__editIns')
            editIns.style.display = 'none'

            totalBox.style.opacity = 1

            e.stopPropagation();
            listID = e.currentTarget.dataset.id; 
            // console.log(idsPressed)
            if(!idsPressed.includes(listID)){

                count = 0; //keeps count of number of items added to list
                
                console.log('new list')
                //create a new container for each listID once only 
                content.innerHTML += `
                    <div class="middle__listContent" id= "${listID}">
                    </div>`;
                //hides other visible lists other than the one newly selected 
                listBoxInner = document.querySelectorAll('.middle__listContent');
                displayContent();  

               

                totalBox.innerHTML += `
                    <h2 class="middle__total">List ${parseInt(listID)+1} Total</h2>
                    <h1 class="middle__totalValue" id="${listID}">0</h1>
                `; 
                totalTitle = document.querySelectorAll('.middle__total'); 
                total = document.querySelectorAll('.middle__totalValue');
                
                

                productName.push([]);
                counter.push([]);
                quantityValue.push([]);

                totalCombined.push([]);

                
                displayTotal();
                
                //changes colour for the button you are on
                for(let i = 0; i <lst.parentElement.children.length; i++){
                    lst.parentElement.children[i].style.background = 'linear-gradient(180deg, rgba(2, 118, 107, 0.67) 41.15%, rgba(163, 235, 177, 0.67) 87.5%)'
                    if(lst.parentElement.children[i].dataset.id != listID){
                        lst.parentElement.children[i].style.background = ' linear-gradient(180deg, #21b6a8ab 0%, #21b6a859 95.83%)'
                    } 
                }
                lastIDClicked = listID; 
            } 
            else {
                //already pressed the same list btn before, just display items this time
                // console.log(totalBox.children)

                displayContent();
                displayTotal();
                
                //changes colour for the button you are on
                for(let i = 0; i <lst.parentElement.children.length; i++){
                    lst.parentElement.children[i].style.background = 'linear-gradient(180deg, rgba(2, 118, 107, 0.67) 41.15%, rgba(163, 235, 177, 0.67) 87.5%)'
                    if(lst.parentElement.children[i].dataset.id != listID){
                        lst.parentElement.children[i].style.background = ' linear-gradient(180deg, #21b6a8ab 0%, #21b6a859 95.83%)'
                    }
                }
                lastIDClicked = listID; 

                //initializes count to the last item's count
                if(counter[listID].length != 0){
                    let lastElementIndex = counter[listID].length - 1; 
                    count = lastElementIndex+1; 
                }


            }

            idsPressed.push(listID); 
            listContainer.style.opacity = 1;   

            
        });

    });
    
    displayContent();   
    displayTotal();
}
//adds new list buttons 
addList.addEventListener('click', function(){
    delLists.style.display = 'none'//clear all 
    clear.style.display = 'block'//clear
    
    listBtnMenu.push(`
        <button class="middle__lstBtn" type = "button" data-id="${listCount}">List ${listCount+1}</button>
    `);
    listCount++; 

    addList.style.display = 'none'; 

    attr = 0;
    addListFun();
});


//adding items 
let padding = 90; 
plus.addEventListener('click', function(){
    
   middle.style.paddingBottom = `${padding}px`
   padding = parseInt(padding) + 50; 

    plus.style.background = 'linear-gradient(180deg, #08665d 0%, rgb(147 243 165) 100%)'
    plus.style.color = '#ffffff'
  
    setTimeout(()=>{
        plus.style.background = '#A3EBB1'
        plus.style.color = '#000000'
    }, 500); 

    if(listID == 0 && once == 0){
        addList.style.display = 'block'; 
        
        attr = 1; 
        once = 1; 
    }
    //shows the new list btn for all other lists excpt list1
    let lastBtnID = listBtnContainer.children[listBtnContainer.children.length-1].dataset.id; 
    //when an item is added to the last List --> set opacity to 1
    if(listID != 0 && listID == lastBtnID){
        addList.style.display = 'block'; 
        attr = 1; 
 
    }
    


    //each time a plus is pressed, check listID, then push elements 
    //to the corresponding listContent id
    const listBox = document.querySelectorAll('.middle__listContent'); 
    // console.log('clicked PLUS'+listID)

    // for(let i = 0; i< listBox.length; i++){
        //gets the correspoinding listContent to listID
        // console.log('listID: ' + listID)
        // console.log('list box id: ' + listBox[listID].getAttribute('id'))

        // if(listBox[i].getAttribute('id') == listID){ 
            alrtUser("Item Added",'linear-gradient(180deg, rgba(33, 182, 168, 0.68) 0%, rgba(163, 235, 177, 0.68) 100%)');
            // console.log(count)        
            listBox[listID].innerHTML += `
            <div class="middle__list" id = "list${count}">
                <div class="middle__column">
                    <input class="middle__product" id = "${count}" placeholder = "eg. eggs" value= "" type="text">
                </div>
                <div class="middle__column">
                    <div class="middle__btnContainer"  id="${count}">
                        <input class="middle__quantity"  id="${count}" value = " "   type="text" >
                    </div>
                
                </div>
                <div class="middle__column">
                    <input class="middle__price" id = "${count}" value = " " type="text">
                </div>
                <div class="middle__del" id = "${count}">
                    <i class="fas fa-trash-alt"></i>
                </div>
                
        
            </div>`;

            count++; 
            counter[listID].push('');
            productName[listID].push('');
            quantityValue[listID].push('');
            
            totalCombined[listID].push('0');

            

            //these are created after this line so must stay here
            const product = document.querySelectorAll('.middle__product');
            const quantity = document.querySelectorAll('.middle__quantity'); 
            
            calTotal();
            
            setQuantity(quantity);
            setProduct(product);

            displayTotal();
            displayContent();
        //}
    // }   
});

//deleting items 
listContainer.addEventListener('click', function(){
        
    total = document.querySelectorAll('.middle__totalValue');
    let bins = document.querySelectorAll('.middle__del');

    bins.forEach(function(bin){
        bin.addEventListener('click', function(e){
            padding = parseInt(padding) - 10; 
            middle.style.paddingBottom = `${padding}px`
        
            e.currentTarget.parentElement.remove();//works really well
            binID = e.currentTarget.id ; 
            let index = counter[listID].indexOf(counter[listID][binID]);


            counter[listID][index] = 0; 
            quantityValue[listID][index] = 0;
            productName[listID][index] = 0; 

            // console.log(productName);
            totalCombined[listID][index] = 0; 

            //recalculate sum after each delete
            sum = totalCombined[listID].reduce(function(a, b){
                return parseFloat(Number(a) + Number(b)).toFixed(2); 
            }, 0 ); 
            
            total[listID].innerHTML = sum; 
            //________________________________

            calTotal();
            alrtUser("Item Removed", 'linear-gradient(180deg, rgba(33, 182, 168, 0.68) 0%, rgba(163, 235, 177, 0.68) 100%)');
            
        });
    });

})

//clearing lists
const clear = document.querySelector('.middle__btnClr');
clear.addEventListener('click', function(e){
    let conf = confirm("are you sure? ")
    if(conf == true){
        console.log('confirmed')

        clear.style.background = 'linear-gradient(180deg, #08665d 0%, rgb(147 243 165) 100%)'
        clear.style.color = '#ffffff'
    
        setTimeout(()=>{
            clear.style.background = 'linear-gradient(180deg, #A3EBB1 0%, rgba(163, 235, 177, 0) 100%)'
            clear.style.color = '#000000'
        }, 500); 

        const product = document.querySelectorAll('.middle__product');
        const quantity = document.querySelectorAll('.middle__quantity'); 
        const price = document.querySelectorAll('.middle__price'); 

        product.forEach(function(p){
            let lID = p.parentElement.parentElement.parentElement.id; 
            if(lID == listID){
                p.value = 0; 
                p.setAttribute('value', p.value)
                p.style.background = 'white'
            }
        }) 
        quantity.forEach(function(q){
            let lID = q.parentElement.parentElement.parentElement.parentElement.id; 
            if(lID == listID){
                q.value = 0; 
                q.setAttribute('value', q.value)
                q.style.background = 'white'
            }
        })
        price.forEach(function(r){
            let lID = r.parentElement.parentElement.parentElement.id; 
            if(lID == listID){
                r.value = 0; 
                r.setAttribute('value', r.value)
                r.style.background = 'white'
            }
        })   

        counter[listID]= []; 
        quantityValue[listID] = [];
        productName[listID] = []; 

        totalCombined[listID] = []; 

        //recalculate sum after each delete
        sum = 0;  
        
        total[listID].innerHTML = sum; 
        calTotal();
        
    }
    else {
        console.log('no')

    }
    
})


function setQuantity(quantity){
    quantity.forEach(function(q){
        q.addEventListener("keydown", function(e){
            let quantityID = e.currentTarget.parentElement.id; 

            if(e.key === "Enter"){
                if(q.value == "" || isNaN(q.value)){
                    q.setAttribute('value', 0);
                    displayTotal(); 
                    alrtUser("Must Enter A Number", 'rgb(33 182 168 / 33%)');
                }
                else {
                    e.currentTarget.style.background = 'rgb(33 182 168 / 33%)'
                    quantityValue[listID][quantityID] = e.currentTarget.value; 
                    e.currentTarget.setAttribute('value', quantityValue[listID][quantityID]); 
    
                    totalCombined[listID][quantityID] = counter[listID][quantityID]* quantityValue[listID][quantityID]; 
    
                    //recalculate sum after each delete
                    sum = totalCombined[listID].reduce(function(a, b){
                        return parseFloat(Number(a) + Number(b)).toFixed(2); 
                    }, 0 ); 
                    console.log(total)
                    total[listID].innerHTML = sum; 
                }
                 
            }
            if(e.key === "Backspace"){
                e.currentTarget.style.background = 'white'

            }
            
    
        });
    })
}

function setProduct(product){
    for (let i = 0; i<product.length; i++){//increase.length = 0 is the increase btn0 
        product[i].addEventListener("keydown", function(e){
            let productID = e.currentTarget.id; 
            // console.log(productName) 
            // console.log('prodID '+productID)
            if(e.key === "Enter"){
                e.currentTarget.style.background = 'rgb(33 182 168 / 33%)'
                productName[listID][productID] = product[i].value; 
                product[i].setAttribute('value', productName[listID][productID]);
                // console.log(productName)
                // console.log(product[i].value)
            
            }
            else if(e.key === "Backspace"){
                e.currentTarget.style.background = 'white'
                
            }

        });
    }
}

function displayContent(){
    listBoxInner = document.querySelectorAll('.middle__listContent');

    if(listBoxInner != undefined){

        for(let i = 0; i<listBoxInner.length; i++){
            // console.log('listID: '+ listID);
            if (listBoxInner[i].getAttribute('id') != listID){
                //hide the not matching listBox 
                listBoxInner[i].style.display= "none"; 

            }
            else{
                //show the matching listBox
                listBoxInner[i].style.display="block"; 
            }
        }
    }
    else{
        // console.log('undefined ListBox');
    }
}

function displayTotal(){
    totalTitle = document.querySelectorAll('.middle__total'); 
    total = document.querySelectorAll('.middle__totalValue');

    
    if(total != undefined){
        // console.log(listID)
        // console.log(total)
        calTotal();
        
        // console.log(totalTitle)

        for(let i = 0; i<total.length; i++){

            // console.log('total id: '+total[i].getAttribute('id'))
            // console.log('listID: '+listID)
            if (total[i].getAttribute('id') != listID){
                total[i].style.display= "none"; 
                totalTitle[i].style.display= "none"; 
            }
            else{
                total[i].style.display="block"; 
                totalTitle[i].style.display= "block"; 
            }
        }

    }
    
}

                            
function calTotal(){
    let innerPrice = document.querySelectorAll('.middle__price'); 
    innerPrice.forEach(function(prcs){
        prcs.addEventListener("keydown", function(e){
                
                let id = parseInt(prcs.parentElement.parentElement.parentElement.id); 
                
                let itemID = prcs.parentElement.parentElement.id.replace(/[^0-9]/g, '');
                total = document.querySelectorAll('.middle__totalValue');
                
                // console.log('currentPrice ID: '+ prcs.id);
                if(e.key === "Enter"){
                    //if nothing or a non numerical value is entered
                    e.currentTarget.style.background = 'rgb(33 182 168 / 33%)'

                    if(prcs.value == "" || isNaN(prcs.value)){
                        prcs.setAttribute('value', 0);
                        displayTotal(); 
                        alrtUser("Must Enter A Number", 'rgb(33 182 168 / 33%)');
                    }
                    //if a proper number is entered 
                    else{
                        currentVal = e.currentTarget.value; 
                        // console.log("currentVal " + currentVal);
                        // console.log("currentQuantity " + totalCombined[listID][itemID]);
                        //total combined = quantity[i]*price[i]
                        // console.log(counter[listID]);
                        counter[listID][itemID] = currentVal; 
                        
                        totalCombined[listID][itemID] = counter[listID][itemID]* quantityValue[listID][itemID]; 
                        
                        // console.log(counter[listID]);
                        sum = totalCombined[listID].reduce(function(a, b){
                            return parseFloat(Number(a) + Number(b)).toFixed(2); 
                        }, 0 ); 

                        //totalCombined = quantity * counter
                        // console.log(totalCombined[listID]);
                        // console.log('sum '+sum+' ______')
                        console.log(total)
                        total[id].innerHTML = sum; 

                        // console.log("Total " + total[id].innerHTML);
                    
                        prcs.setAttribute('value', prcs.value);
                        displayTotal(); 

                    }
                }
                if(e.key === "Backspace"){
                    e.currentTarget.style.background = 'white'
                }

        })

    })
    
}

function alrtUser(string, color){
    let alrt = document.querySelector('.middle__alert');
    alrt.innerHTML = `${string}`; 
    alrt.style.display = "block";
    alrt.style.background = `${color}`; 
    setTimeout(()=>{
        alrt.style.display = "none";  
        alrt.innerHTML = ''; 
    }, 1000); 
}
