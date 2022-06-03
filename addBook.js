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
  var bookRef = firebase.database().ref('availableBooks');
  var db = firebase.database()

  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', addBookFun);


  
  // Submit form
  function addBookFun(e){
    e.preventDefault();

      // Get values
      var book = getInputVal('book');
      var author = getInputVal('author');
      var isbn = getInputVal('isbn');
      var price = getInputVal('price');
      var stock = getInputVal('stock');
      var rack = getInputVal('rack');
      
    bookRef.once('value', function(snapshot){

      let flag=0;
      
      snapshot.forEach(
          function(ChildSnapshot){

              let db_isbn = ChildSnapshot.val().isbn;
              console.log(db_isbn)

              if(isbn==db_isbn){
                  
                  console.log('Hi'+book);
                  
                  var ul = document.getElementById('list');

                  var displayMsg1 = document.createElement('h3');
                  var displayMsg2 = document.createElement('li');
                  var line = document.createElement('hr');

                  
                  displayMsg1.innerHTML= '"'+ isbn + '"' + ': Already Present in Database.'
                  displayMsg2.innerHTML= 'Please Enter Another Valid ISBN Number & give details of Book'

                  ul.appendChild(displayMsg1);
                  ul.appendChild(displayMsg2);
                  ul.appendChild(line);

                  flag=1;
              }
          }
      )
      if(flag==0){
        

        // Save message
        saveBook(book, author, isbn, price, stock, rack);

        // Show alert
        document.querySelector('.alert').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
        },3000);
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
  function saveBook(book, author, isbn, price, stock, rack){
    // var newBookRef = bookRef.push();
    // newBookRef.set({
    //     book: book, 
    //     author: author, 
    //     isbn: isbn, 
    //     price: price, 
    //     stock: stock, 
    //     rack: rack
    // });
    db.ref('availableBooks/'+ isbn).set({
        book: book, 
        author: author, 
        isbn: isbn, 
        price: price, 
        stock: stock, 
        rack: rack
    })
  }

