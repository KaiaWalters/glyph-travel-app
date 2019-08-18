var sun = document.getElementsByClassName("fa-sun");
var msg = document.getElementsByClassName("message") //here
//var sun = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash"); //here!
// var button = document.getElementById("queryBtn");

Array.from(msg).forEach(function(element) {

  const isSelected = element.className.includes('selected')
  const quote = element.getElementsByTagName("span")[1].innerText

  fetch('messages', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        isSelected: !isSelected, //guarantee send opposite is sent to db
        quote : quote
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
    })
  })

//   fetch('messages', {
//     method: 'put',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       sun: 'stuff'
//     })
//   })
//   .then(response => {
//     if (response.ok) return response.json()
//   })
//   .then(data => {
//     console.log(data)
//   })
// })

// document.getElementById("queryBtn").addEventListener('click', function(){
//   const name = this.parentNode.parentNode.childNodes[1].innerText
//   const quote = this.parentNode.parentNode.childNodes[3].innerText
//   fetch('messages', {
//     method: 'put',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       'name': name,
//       'quote': quote,
//       'location':location
//     })
//   })
//   .then(response => {
//     if (response.ok) return response.json()
//   })
//   .then(data => {
//     console.log(data)
//     window.location.reload(true)
//   })
// });

//trying to update by turning the icon red if the user clicks it to mark that message for posting later
// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const order = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name'   : name,
//             'quote'  : quote,
//             'thumbUp': true
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// LETS FIX THIS DELETE HONEY BUN!!!

Array.from(trash).forEach(function(element) {

      element.addEventListener('click', function(){
        //const name = this.parentNode.parentNode.childNodes[1].innerText
        const quote = this.parentNode.parentNode.childNodes[3].innerText

        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quote : quote
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

// SUN =====================

// Array.from(sun).forEach(function(element) {
//
//       element.addEventListener('click', function(){
//         alert("Success")
//         fetch('thumbDown', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'sun': true
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         alert("big cousin taye")
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'quote': quote
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });


//toggle to make box appear
