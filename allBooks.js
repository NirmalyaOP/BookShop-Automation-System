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
  
  // Reference availableBooks collection
  var bookRef = firebase.database().ref('availableBooks');

  getAllBooks();

  //getAllBooks Implementation
  function getAllBooks(){
  
    
    bookRef.once('value', function(snapshot){

        
        snapshot.forEach(
            function(ChildSnapshot){
                
                let bookName = ChildSnapshot.val().book;
                let isbn = ChildSnapshot.val().isbn;
                let authName = ChildSnapshot.val().author;
                let stock = ChildSnapshot.val().stock;
                let price = ChildSnapshot.val().price;
                let rack = ChildSnapshot.val().rack;

                
                    var ul=document.getElementById('list')

                    var displayBook = document.createElement('li');
                    var displayAuth = document.createElement('li');
                    var displayISBN = document.createElement('li');
                    var displayStock = document.createElement('li');
                    var displayPrice = document.createElement('li');
                    var displayRack = document.createElement('li');
                    var lineBreak = document.createElement('br');
                    var line = document.createElement('hr');

                    displayBook.innerHTML='Book: '+bookName;
                    displayAuth.innerHTML='Author: '+authName;
                    displayISBN.innerHTML='ISBN: '+isbn;
                    displayStock.innerHTML='Stock: '+stock;
                    displayPrice.innerHTML='Price: '+price;
                    displayRack.innerHTML='Rack Number: '+rack;
                    

                    ul.appendChild(displayBook);
                    ul.appendChild(displayAuth);
                    ul.appendChild(displayISBN);
                    ul.appendChild(displayStock);
                    ul.appendChild(displayPrice);
                    ul.appendChild(displayRack);
                    ul.appendChild(lineBreak);
                    ul.appendChild(line);
                
            }
        )

        
    })
  }