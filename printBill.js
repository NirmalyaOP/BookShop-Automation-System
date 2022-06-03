// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
    apiKey: "AIzaSyDb6tNG4wbPcud7OsO_HIvnMC6lEbieQBs",
    authDomain: "book-shop-automation.firebaseapp.com",
    databaseURL: "https://book-shop-automation-default-rtdb.firebaseio.com",
    projectId: "book-shop-automation",
    storageBucket: "book-shop-automation.appspot.com",
    messagingSenderId: "904591453076",
    appId: "1:904591453076:web:bf5cdedcf16c62ecc37d81",
  };
  firebase.initializeApp(config);
  

  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){ 

    e.preventDefault();
    
    var billNumber = document.getElementById('billNumber').value;

    // Reference allBills/nillNumber collection
    var bookRef = firebase.database().ref('allBills/'+billNumber);
    // var maxBillNo = firebase.database().ref('maxBillNo').update({
    //     max: billNumber
    // })

    var totalCost=0;

    
    bookRef.once('value', function(snapshot){

        
        snapshot.forEach(
            function(ChildSnapshot){
                
                let isbn = ChildSnapshot.val().isbn;
                let copies = ChildSnapshot.val().copies;
                let price = ChildSnapshot.val().price;

                let cost = Number(copies)*Number(price);
                //console.log(cost);
                totalCost+=cost;

                
                    var ul=document.getElementById('list')

                    var displayISBN = document.createElement('li');
                    var displayCopies = document.createElement('li');
                    var displayPrice = document.createElement('li');
                    var displayCost = document.createElement('li');

                    var lineBreak = document.createElement('br');
                    var line = document.createElement('hr');

                    displayISBN.innerHTML='ISBN: '+isbn;
                    displayCopies.innerHTML='No. of Copies purchased: '+copies;
                    displayPrice.innerHTML='Each Book Price: '+price;
                    displayCost.innerHTML='Price for '+copies+' is '+cost 
                    

                    ul.appendChild(displayISBN);
                    ul.appendChild(displayCopies);
                    ul.appendChild(displayPrice);
                    ul.appendChild(displayCost);
                    ul.appendChild(lineBreak);
                    ul.appendChild(line);
                
            }
        )

        var ul=document.getElementById('list')
            
        var displayTotalCost = document.createElement('h3');
        var line = document.createElement('hr');

        if(totalCost!=0){
            displayTotalCost.innerHTML='Total price for BILL NUMBER "'+billNumber+'" is '+totalCost+".";
        }else{
            displayTotalCost.innerHTML='There are no items for BILL NUMBER "'+billNumber+'". Please add books first.';
        }

        ul.appendChild(line);
        ul.appendChild(displayTotalCost);
        ul.appendChild(line);

    })
  }