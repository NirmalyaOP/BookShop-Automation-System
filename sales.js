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
  
  // Reference messages collection
  var db = firebase.database()

  // Reference availableBooks collection
  var bookRef1 = firebase.database().ref('availableBooks');


  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', addBookToBill);
  
  // Submit form
  function addBookToBill(e){
    e.preventDefault();

    // var isbn = document.getElementById('isbn').value;

    // Get values
    var billNumber = getInputVal('billNumber');
    var isbn = getInputVal('isbn');
    var price = getInputVal('price');
    var copies = Number(getInputVal('copies'));


    bookRef1.once('value', function(snapshot){

      let flag=0;
      
      snapshot.forEach(
          function(ChildSnapshot){
              let db_isbn = ChildSnapshot.val().isbn;

              if(isbn==db_isbn){
                  

                  var bookRef = db.ref('availableBooks/'+isbn)
                  bookRef.once('value', function(snapshot){
                      var stock = Number(snapshot.val().stock);

                      if(copies<=stock){
                        
                        console.log("if");
                        var updateStock=stock-copies;          
                        
                        db.ref('availableBooks/' + isbn).update({
                          stock: updateStock
                        });
                
                        // Save Bill
                        saveBill(billNumber, isbn, price, copies);
                
                        // Show alert
                        document.querySelector('.alert').style.display = 'block';

                        // Hide alert after 3 seconds
                        setTimeout(function(){
                        document.querySelector('.alert').style.display = 'none';
                        },3000);

                        }
                        else {
                        console.log("else")
                        var ul = document.getElementById('list');
                
                            var displayMsg1 = document.createElement('h3');
                            var line = document.createElement('hr');
                
                            
                            displayMsg1.innerHTML= 'NOT ENOUGH STOCK FOR "'+ isbn +'". Total Available Stock is "'+stock+'".'
                          
                            ul.appendChild(displayMsg1);
                            ul.appendChild(line);
                        }
                  })
                  
                  flag=1;
              }
          }
      )
      if(flag==0){
          var ul = document.getElementById('list');

          var displayMsg1 = document.createElement('h3');
          var displayMsg2 = document.createElement('li');
          var line = document.createElement('hr');

          
          displayMsg1.innerHTML= 'ISBN "'+isbn + '": NOT FOUND'
          displayMsg2.innerHTML= 'Please Enter a Valid ISBN Number Which is Available.'

          ul.appendChild(displayMsg1);
          ul.appendChild(displayMsg2);
          ul.appendChild(line);

      }

  })      
  
    // Clear form
    document.getElementById('contactForm').reset();    
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveBill(billNumber, isbn, price, copies){
    
    db.ref('allBills/'+ billNumber+'/'+isbn).set({
        billNumber: billNumber,
        isbn: isbn,
        price: price,
        copies: copies
    })
  }

