
const content = document.querySelector('.middle__content');
const plus = document.querySelector('.middle__plus');
const addList = document.querySelector('.middle__addListBtn');
const listBtnContainer = document.querySelector('.middle__lstBtns');
const listContainer = document.querySelector('.middle__container');
const totalBox = document.querySelector('.middle__totalBox'); 
const totalValue = document.querySelector('.middle__totalValue'); 
const array = document.querySelector('.middle__array')

const modal = document.querySelector('.modal')
const instBtn = document.querySelector('.middle__instructions')

var count; 
let listCount = 0; 

let counter = new Array(); 
var quantityValue  = []; 
var productName = [];
var totalCombined = [];

let listBtnMenu = []; 
var totalMenu = []; 

let listID = 0; 
let listContent = [];
let idsPressed = []; 
var list;

var listBoxInner;
var total; 
var totalTitle; 

var once = 0;  

var binID; 
var sum = 0; 

var lastIDClicked = 0; 

const save = document.querySelector('.middle__save');

save.addEventListener('click', function(){
    console.log('save')
    console.log(totalMenu)
    // var new_data = counter; 
    
    // if(localStorage.getItem('price') == null){
    //     localStorage.setItem('price', '[]');
    // }

    // //save the old + new data tot the local storage 
    // localStorage.setItem('price', JSON.stringify(new_data))
    console.log(total)
    console.log(count)
    var new_data = {
        content: content.innerHTML, 
        totalHTML: total.innerHTML, 

        // count: count, 
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
        total: total, 
        totalTitle: totalTitle,  
         
        once: once,  
        
        binID: binID,  
        sum: sum,  
        
        lastIDClicked: lastIDClicked, 
        // totalHTML: total.innerHTML,   
    }

    if(localStorage.getItem('c') == null){
        localStorage.setItem('c', '[]');
    }

    localStorage.setItem('c', JSON.stringify(new_data))
    
})

window.onload = function (){
    console.log(count)
    
    let items = JSON.parse(localStorage.getItem('c'))
   
    if(items != null){
        modal.style.display = 'none'   

        content.innerHTML = items.content
        total.innerHTML = items.totalHTML

        // count = items.count
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
        total = items.total 
        totalTitle = items.totalTitle  
    
        once = items.once  
        
        binID = items.binID  
        sum = items.sum  
        
        lastIDClicked = items.lastIDClicked   
    
        addListFun()

    }
}

//show instructions at onload and when insturctions btn is pressed 
window.addEventListener('load', function(){
    const exitModal = this.document.querySelector('.modal__exit')
    exitModal.addEventListener('click', function(e){
        modal.style.display = 'none'   
    })
})

instBtn.addEventListener('click', function(){
    // console.log('inst')
    modal.style.display = 'block' 
    const exitModal = document.querySelector('.modal__exit')
    exitModal.addEventListener('click', function(e){
        modal.style.display = 'none'   
    })
})
const delList = document.querySelector('.middle__delList')
delList.addEventListener('click', function(){
    console.log('delList at: '+listID)
    // console.log(listBoxInner)
    listBoxInner[listID].remove();
    // console.log(idsPressed)
    idsPressed.splice(listID,1)
    // console.log()
    totalBox.children[listID].remove()
    
})

function addListFun (){
    addList.style.display = 'none'; 

    listBtnContainer.innerHTML = listBtnMenu.join(" ");  
    
    displayContent();

    //watches for the click of each list button to Change its COLOR_________
    list = document.querySelectorAll('.middle__lstBtn'); 
    list.forEach(function(l){
        // console.log(l.dataset.id);
        l.parentElement.children[lastIDClicked].style.background = '#62bace'
        
    })//_____________________________________________________________________
    
    list.forEach(function(lst){
        
        // lst.style.background = '#E9E8E8';
        lst.addEventListener('click', function(e){
            listID = e.currentTarget.dataset.id; 
            
            if(!idsPressed.includes(listID)){
                count = 0; //keeps count of number of items added to list
                // lst.style.background = '#62bace';
                console.log('new list')
                // lst.style.background = '#62bace';
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
                    lst.parentElement.children[i].style.background = '#62bace'
                    if(lst.parentElement.children[i].dataset.id != listID){
                        // lst.style.background = '#62bace'
                        lst.parentElement.children[i].style.background = '#E9E8E8'
                    } 
                }
                lastIDClicked = listID; 
            } 
            else {
                //already pressed the same list btn before, just display items this time
                console.log(totalBox.children)

                displayContent();
                displayTotal();
                
                //changes colour for the button you are on
                for(let i = 0; i <lst.parentElement.children.length; i++){
                    lst.parentElement.children[i].style.background = '#62bace'
                    if(lst.parentElement.children[i].dataset.id != listID){
                        // lst.style.background = '#62bace'
                        lst.parentElement.children[i].style.background = '#E9E8E8'
                    }
                }
                lastIDClicked = listID; 

                
                // lst.style.background = 'gray';
                // e.currentTarget.style.background = '#62bace'

                

                //initializes count to the last item's count
                if(counter[listID].length != 0){
                    let lastElementIndex = counter[listID].length - 1; 
                    count = counter[listID][lastElementIndex]; 
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
addList.addEventListener('click', function(e){
    listBtnMenu.push(`
        <button class="middle__lstBtn" data-id="${listCount}">List ${listCount+1}</button>
    `);
    listCount++; 
   addListFun(e);
});


//adding items 
plus.addEventListener('click', function(){
    //when New List btn is clicked --> opacity of addList btn is set to 0
    //first list should only run first time
    if(listID == 0 && once == 0){
        addList.style.display = 'block'; 
        once = 1; 
    }
    //shows the new list btn for all other lists excpt list1
    let lastBtnID = listBtnContainer.children[listBtnContainer.children.length-1].dataset.id; 
    //when an item is added to the last List --> set opacity to 1
    if(listID != 0 && listID == lastBtnID){
        addList.style.display = 'block'; 
    }

    //each time a plus is pressed, check listID, then push elements 
    //to the corresponding listContent id
    const listBox = document.querySelectorAll('.middle__listContent'); 
    console.log('clicked PLUS'+listID)

    // for(let i = 0; i< listBox.length; i++){
        //gets the correspoinding listContent to listID
        // console.log('listID: ' + listID)
        // console.log('list box id: ' + listBox[listID].getAttribute('id'))

        // if(listBox[i].getAttribute('id') == listID){ 
            // alrtUser("Item Added",'#62bace');
            
            listBox[listID].innerHTML += `
            <div class="middle__list" id = "list${count}">
                <div class="middle__column">
                    <input class="middle__product" id = "${count}" value= " " type="text">
                </div>
                <div class="middle__column">
                    <div class="middle__btnContainer"  id="${count}">
                        <input class="middle__quantity"  id="${count}" value = "0"   type="text" >
                    </div>
                
                </div>
                <div class="middle__column">
                    <input class="middle__price" id = "${count}" type="text">
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
            alrtUser("Item Removed", '#62bace');
            
        });
    });

})

//clearing lists
const clear = document.querySelector('.middle__btnClr');
clear.addEventListener('click', function(e){
    // console.log('cleared');

    
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
        // console.log(lID)
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
})


function setQuantity(quantity){
    quantity.forEach(function(q){
        q.addEventListener("keydown", function(e){
            let quantityID = e.currentTarget.parentElement.id; 

            if(e.key === "Enter"){
                if(q.value == "" || isNaN(q.value)){
                    q.setAttribute('value', 0);
                    displayTotal(); 
                    alrtUser("Must Enter A Number", '#dcaca7');
                }
                else {
                    e.currentTarget.style.background = '#62bace'
                    quantityValue[listID][quantityID] = e.currentTarget.value; 
                    e.currentTarget.setAttribute('value', quantityValue[listID][quantityID]); 
    
                    totalCombined[listID][quantityID] = counter[listID][quantityID]* quantityValue[listID][quantityID]; 
    
                    //recalculate sum after each delete
                    sum = totalCombined[listID].reduce(function(a, b){
                        return parseFloat(Number(a) + Number(b)).toFixed(2); 
                    }, 0 ); 
                    
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
                e.currentTarget.style.background = '#62bace'
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
    if(total != undefined){
        // console.log(listID)
        // console.log(total)
        calTotal();
        for(let i = 0; i<total.length; i++){

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
                    e.currentTarget.style.background = '#62bace'

                    if(prcs.value == "" || isNaN(prcs.value)){
                        prcs.setAttribute('value', 0);
                        displayTotal(); 
                        alrtUser("Must Enter A Number", '#dcaca7');
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
                    e.currentTarget.setAttribute('value', 0);
                    console.log('back');
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
