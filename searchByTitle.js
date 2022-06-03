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

  // Listen for search name button click
  document.getElementById('searchName').addEventListener('click', searchBookByName);

  //Listen for search author button click 
  document.getElementById('searchAuthor').addEventListener('click', searchBookByAuthor);

  //Search using Book Name
  function searchBookByName(e){
  
    // Get value
    var book = document.getElementById('book').value;
    var lowBook = book.toLowerCase();
    
    bookRef.once('value', function(snapshot){

        document.getElementById('book').value = "";

        let flag=0;
        
        snapshot.forEach(
            function(ChildSnapshot){
                
                let bookName = ChildSnapshot.val().book;
                let isbn = ChildSnapshot.val().isbn;
                let rack = ChildSnapshot.val().rack;
                let authName = ChildSnapshot.val().author;
                let stock = ChildSnapshot.val().stock;
                let lowBookName = bookName.toLowerCase();


                if(lowBookName==lowBook){
                    var ul=document.getElementById('list')

                    var displayBook = document.createElement('li');
                    var displayAuth = document.createElement('li');
                    var displayISBN = document.createElement('li');
                    var displayRack = document.createElement('li');
                    var displayStock = document.createElement('li');
                    var displayBtn = document.createElement('button');
                    var lineBreak = document.createElement('br');
                    var line = document.createElement('hr');

                    displayBook.innerHTML='Book: '+bookName;
                    displayAuth.innerHTML='Author: '+authName;
                    displayISBN.innerHTML='ISBN: '+isbn;
                    displayRack.innerHTML='Rack: '+rack;
                    displayStock.innerHTML='Stock: '+stock;
                    displayBtn.innerText='Please Tell the ISBN & number of copies to Sales Clerk for buying';
                    

                    ul.appendChild(displayBook);
                    ul.appendChild(displayAuth);
                    ul.appendChild(displayISBN);
                    ul.appendChild(displayRack);
                    ul.appendChild(displayStock);
                    ul.appendChild(lineBreak);
                    ul.appendChild(displayBtn);
                    ul.appendChild(line);
                    flag=1;
                }
                
            }
        )

        if(flag==0 && book!=""){
            var ul = document.getElementById('list');

            var displayMsg1 = document.createElement('h3');
            var displayMsg2 = document.createElement('li');
            var line = document.createElement('hr');

            
            displayMsg1.innerHTML= book + ': NOT FOUND'
            displayMsg2.innerHTML= 'Please Click on Request For A Book Button & give details of Book'

            ul.appendChild(displayMsg1);
            ul.appendChild(displayMsg2);
            ul.appendChild(line);
        }
    })
  }




  //Search using Author name
  function searchBookByAuthor(e){
  
    // Get author value
    var author = document.getElementById('author').value;
    let flag=0;
    
    bookRef.once('value', function(snapshot){

        document.getElementById('author').value = "";
        
        snapshot.forEach(
            function(ChildSnapshot){
                let bookName = ChildSnapshot.val().book;
                let isbn = ChildSnapshot.val().isbn;
                let rack = ChildSnapshot.val().rack;
                let authName = ChildSnapshot.val().author;
                let stock = ChildSnapshot.val().stock;

                if(authName==author){
                    var ul=document.getElementById('list')

                    var displayBook = document.createElement('li');
                    var displayAuth = document.createElement('li');
                    var displayISBN = document.createElement('li');
                    var displayRack = document.createElement('li');
                    var displayStock = document.createElement('li');
                    var displayBtn = document.createElement('button');
                    var lineBreak = document.createElement('br');
                    var line = document.createElement('hr');

                    displayBook.innerHTML='Book: '+bookName;
                    displayAuth.innerHTML='Author: '+authName;
                    displayISBN.innerHTML='ISBN: '+isbn;
                    displayRack.innerHTML='Rack: '+rack;
                    displayStock.innerHTML='Stock: '+stock;
                    displayBtn.innerText='Please Tell the ISBN & number of copies to Sales Clerk for buying';
                    

                    ul.appendChild(displayBook);
                    ul.appendChild(displayAuth);
                    ul.appendChild(displayISBN);
                    ul.appendChild(displayRack);
                    ul.appendChild(displayStock);
                    ul.appendChild(lineBreak);
                    ul.appendChild(displayBtn);
                    ul.appendChild(line);
                    flag=1;
                }
            }
        )
        if(author!="" && flag==0){
            var ul = document.getElementById('list');

            var displayMsg1 = document.createElement('h3');
            var displayMsg2 = document.createElement('li');
            var line = document.createElement('hr');

            
            displayMsg1.innerHTML= author + ': NOT FOUND'
            displayMsg2.innerHTML= 'Please Click on Request For A Book Button & give details of Book'

            ul.appendChild(displayMsg1);
            ul.appendChild(displayMsg2);
            ul.appendChild(line);

        }

    })
  }


