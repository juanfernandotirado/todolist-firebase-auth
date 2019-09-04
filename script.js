//REF: https://firebase.google.com/docs/firestore/quickstart

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDhZWv_JoVfi9of3tmkW9s69Csnx3lOENQ",
    authDomain: "assignment-2-f6fd9.firebaseapp.com",
    databaseURL: "https://assignment-2-f6fd9.firebaseio.com",
    projectId: "assignment-2-f6fd9",
    storageBucket: "",
    messagingSenderId: "383048070552",
    appId: "1:383048070552:web:3ba20c0d6ecba84f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  if (window.firebase){
    alert('Firebase loaded!')
  };


let db = firebase.firestore();

var auth = firebase.auth();

//console.log(auth)

$("#sign-up").click(function(){

  $("#list").empty();

  let email = $("#email").val();
  let password = $("#password").val();

  let promise = auth.createUserWithEmailAndPassword(email,password);
  
  promise.then(function(result){
    console.log(result);
    return result.user.updateProfile({displayName: result.user.email})}).then(function (result){    
      $("#list").append('<p>New User: ' + auth.currentUser.displayName + '</p>')
    }).catch(function(error){
      $("#list").append('<p>' + error + '</p>')
    })

  console.log('Sign Up!');
});

$("#sign-in").click(function(){

  $("#list").empty();

  let email = $("#email").val();
  let password = $("#password").val();

  let promise = auth.signInWithEmailAndPassword(email,password);

  promise.then(function(result){
    console.log(result);
    
      $("#list").append('<p>Welcome ' + result.user.displayName + '!</p>');
      console.log('Log In Request');
    }).catch(function(error){
      $("#list").append('<p>' + error + '</p>')
    })


  console.log('Sign In');
});

$("#sign-out").click(function(){

  auth.signOut();

  $("#list").empty();

  console.log('Sign Out');

  location.reload();
});


firebase.auth().onAuthStateChanged( function(user) {
  if (user) {

    console.log("Successful Log In!");
    $("#form2").show();
    $("#list2").show();

    db.collection("mycollection").onSnapshot( function(snapshot) {


      snapshot.docChanges().forEach( function(change) {
    
         if (change.type === "added") {console.log("New doc: ", change.doc.data());
    
          }
          if (change.type === "modified") {console.log("Modified doc: ", change.doc.data());
    
          }
          if (change.type === "removed") {console.log("Removed doc: ", change.doc.data());
          }
          
          $("#list2").append('<div class="'+change.doc.id+'"><p>Name: '+ change.doc.data().title+'</p>'+'<p>Due: '+ change.doc.data().due+'</p>');
          $("."+change.doc.id+"").append('<button id="'+change.doc.id+'">Done</button>');
    
          $("#list2").find("."+change.doc.id+"").click(function(){
                
              //console.log( $(this).attr('id'))
              $("."+change.doc.id+"").remove();
              
              db.collection("mycollection").doc(change.doc.id).delete().then(()=>{
                $("."+change.doc.id+"").remove();
              })
                //console.log(change.doc.id);
    
              //db.collection("mycollection").doc($(this).attr('id')).delete().then(()=>{$("."+change.doc.id+"").remove(); });
          })
      });
    
    });


    
  } else {
    $("#form2").hide();
    $("#list2").hide();
  }
});

/* ++++++++++++++++++  TODO LIST ++++++++++++++++++++++++++++++++++ */


//let db = firebase.firestore();


$("#addBtn").click(function(){

  let task = $("#name").val();
  let date = $("#due").val();

  if (task == "" || date == ""){
      alert("Enter Task Name and Due Date");
  }

  else{

  db.collection("mycollection").add({
      title: task,
      due: date
  });
}});










