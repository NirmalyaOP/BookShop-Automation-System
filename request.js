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
  var bookRef = firebase.database().ref('requestBooks');
  
  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', requestBook);
  
  // Submit form
  function requestBook(e){
    e.preventDefault();
  
    // Get values
    var book = getInputVal('book');
    var author = getInputVal('author');
    var isbn = getInputVal('isbn');
    var price = getInputVal('price');
    var details = getInputVal('publisherDetails');
  
    // Save message
    saveBook(book, author, isbn, price, details);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('contactForm').reset();
    
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveBook(book, author, isbn, price, details){
    var newBookRef = bookRef.push();
    newBookRef.set({
        book: book, 
        author: author, 
        isbn: isbn, 
        price: price, 
        details: details
    });
  }

