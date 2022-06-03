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
  var bookRef = firebase.database().ref('requestBooks');

  getAllRequestedBooks();

  //getAllBooks Implementation
  function getAllRequestedBooks(){
  
    
    bookRef.once('value', function(snapshot){

        
        snapshot.forEach(
            function(ChildSnapshot){
                
                let bookName = ChildSnapshot.val().book;
                let isbn = ChildSnapshot.val().isbn;
                let authName = ChildSnapshot.val().author;
                let details = ChildSnapshot.val().details;

                
                    var ul=document.getElementById('list')

                    var displayBook = document.createElement('li');
                    var displayAuth = document.createElement('li');
                    var displayISBN = document.createElement('li');
                    var displayDetails = document.createElement('li');
                    var lineBreak = document.createElement('br');
                    var line = document.createElement('hr');

                    displayBook.innerHTML='Book: '+bookName;
                    displayAuth.innerHTML='Author: '+authName;
                    displayISBN.innerHTML='ISBN: '+isbn;
                    displayDetails.innerHTML='Details: '+details;
                    

                    ul.appendChild(displayBook);
                    ul.appendChild(displayAuth);
                    ul.appendChild(displayISBN);
                    ul.appendChild(displayDetails);
                    ul.appendChild(lineBreak);
                    ul.appendChild(line);
                
            }
        )

        
    })
  }