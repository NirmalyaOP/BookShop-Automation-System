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

  var billRef = firebase.database();
  var current = 0;
  
  getAllBills();

  function addItemsToList(isbn, copies, price, billNo) {
    var ul=document.getElementById('list')
    
    var displayISBN = document.createElement('li');
    var displayCopies = document.createElement('li');
    var displayPrice = document.createElement('li');
    var displayBillNo = document.createElement('h3');

    var lineBreak = document.createElement('br');
    var line = document.createElement('hr');

    displayISBN.innerHTML='ISBN: '+isbn;
    displayCopies.innerHTML='Copies: '+copies;
    displayBillNo.innerHTML='BILL NUMBER: '+billNo;
    displayPrice.innerHTML='Price: '+price;

    if(current!=billNo){
        current=billNo
        ul.appendChild(displayBillNo);
    }
    ul.appendChild(displayISBN);
    ul.appendChild(displayCopies);
    ul.appendChild(displayPrice);
    ul.appendChild(line);
  }

  
  function getAllBills(){

        var n=1;
        while(n<100)
        {
            billRef.ref('allBills/'+n).once('value',function(snapshot) {   

            snapshot.forEach(                

                function(ChildSnapshot){
                    let isbn = ChildSnapshot.val().isbn;
                    let copies = ChildSnapshot.val().copies;
                    let price = ChildSnapshot.val().price;
                    let billNo = ChildSnapshot.val().billNumber;
                    if(isbn!=undefined || isbn!=null){
                        addItemsToList(isbn, copies, price, billNo);
                    }
                    else{
                        // console.log("hi");
                        // console.log(isbn);
                        return;
                    }
                }
            )
            })
            n++;
        }                
                
  }
