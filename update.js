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
  var db = firebase.database()

  // Listen for Update Book submit button
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){

    e.preventDefault();

    var isbn = document.getElementById('isbn').value;
    console.log(isbn);

      // Get values
      var book = getInputVal('book');
      var author = getInputVal('author');
      var isbn = getInputVal('isbn');
      var price = getInputVal('price');
      var stock = getInputVal('stock');
      var rack = getInputVal('rack');
    
      var updates = {
        book: book,
        author: author,
        isbn: isbn,
        price: price,
        stock: stock,
        rack:rack
        }
    


    bookRef.once('value', function(snapshot){

      let flag=0;
      
      snapshot.forEach(
          function(ChildSnapshot){

              let db_isbn = ChildSnapshot.val().isbn;
              // console.log(db_isbn)

              if(isbn==db_isbn){
                  
                  // console.log('Hi'+book);
                  
                  db.ref('availableBooks/' + isbn).update(updates);
                  
                  flag=1;

                  // Show alert
                  document.querySelector('.alert').style.display = 'block';
                
                  // Hide alert after 3 seconds
                  setTimeout(function(){
                    document.querySelector('.alert').style.display = 'none';
                  },3000);

              }
          }
      )
      if(flag==0){
          var ul = document.getElementById('list');

          var displayMsg1 = document.createElement('h3');
          var displayMsg2 = document.createElement('li');
          var line = document.createElement('hr');

          
          displayMsg1.innerHTML= isbn + ': NOT FOUND'
          displayMsg2.innerHTML= 'Please Enter a Valid ISBN Number & give details of Book'

          ul.appendChild(displayMsg1);
          ul.appendChild(displayMsg2);
          ul.appendChild(line);

      }

  })  
  
    // Clear form
    //document.getElementById('contactForm').reset();
  }

  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }