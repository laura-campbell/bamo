document.addEventListener('DOMContentLoaded', () => {

  let contentContainer = document.getElementById('content')

  // for the nav
  let signInButton = document.getElementById('sign-in-button')
  signInButton.addEventListener('click', () => {
    Page.login(contentContainer)
  })

  // for the sidebar nav
  let signInSidebar = document.getElementById('sign-in-sidebar')
  signInSidebar.addEventListener('click', () => {
    Page.login(contentContainer)
  })

  let showsList = document.getElementById('shows')
  fetch('http://localhost:3000/api/v1/shows')
    .then(response => response.json())
    .then(shows => {

      let locations = []

      shows.forEach(show => {
        let showLi = document.createElement('li')
        showLi.setAttribute("class", "collection-item avatar")
        showLi.innerHTML =
          `<img src="images/drum-set.png" alt="" class="circle">
          <span class="title">${show["artist"]["name"]}</span>
          <p>${show["venue"]["name"]} <br>
             ${show["date"].split('-')[1]}/${show["date"].split('-')[2]}
          </p>
          <button id="modal-button" data-target="modal1" class="btn modal-trigger">Event Details</button>`

        // let modalButton = document.getElementById('modal-button')
        //
        // modalButton.addEventListener('click', function () {

          console.log('help')

        // let modalContent = document.getElementById('modal1')
        // modalContent.innerHTML =

      // })

// NEED TO PUT THIS OUTSIDE THE LOOP OR ANYTHING



        // `<div class="collapsible-header"><b>
        // <i class="material-icons">music_note</i>
        // <h6>${show["artist"]["name"]}</b>&nbspat&nbsp<b>${show["venue"]["name"]}</b></h6></div>`
        // showLi.innerHTML += `
        // <div class="collapsible-body">
        // <div class="row">
        // <div style="height:300px" class="col s4 card-panel grey lighten-5 z-depth-2 center"><p><br><img src="images/sportlights.png" height=65px></p><b>Venue:</b><p><a target="_blank" href= "${show["venue"]["songkick_url"]}">${show["venue"]["name"]}</a></p></div>
        // <div style="height:300px" class="col s4 card-panel grey lighten-5 z-depth-2 center"><br><img src="images/microphone.png" height=65px></p><b>Artist:</b><p><a target="_blank" href= "${show["artist"]["songkick_url"]}">${show["artist"]["name"]}</a></p></div>
        // <div style="height:300px" class="col s4 card-panel grey lighten-5 z-depth-2 center"><br><img src="images/music-festival-poster.png" height=65px></p><b>Date: </b>${show["date"].split('-')[1]}-${show["date"].split('-')[2]}-${show["date"].split('-')[0]}<br><b>Time: </b> ${show["time"].split(':')[0]-12}:${show["time"].split(':')[1]} PM <br><b>Setlist:</b><p>Insert Setlist Here</p></div>
        // </div>`

        showsList.append(showLi)
        let thisMap = document.getElementById('map')
        showLi.addEventListener('click', function(e) {
          L.popup().setLatLng([show["venue"]["lat"], show["venue"]["long"]]).setContent(`<center><b>${show["artist"]["name"]}</b><br>${show["venue"]["name"]}<br>${show["date"].split('-')[1]}/${show["date"].split('-')[2]}</center>`).openOn(map);
          map.setView([show["venue"]["lat"], show["venue"]["long"]], 13);
          let modalContent = document.querySelector('.modal-content')
          modalContent.innerHTML = `<h4>${show["artist"]["name"]}</h4>
                      <p>${show["venue"]["name"]}</p>
                      <p>Description: ${show["venue"]["description"]}</p>
                    </div>
                    <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>`
        });
        locations.push([show["artist"]["name"], show["venue"]["name"], show["venue"]["lat"], show["venue"]["long"], show["date"].split('-')[1] + `/` + show["date"].split('-')[2] + `/` + show["date"].split('-')[0]])

      })


      let setCenter = [40.748, -73.985]

      var map = L.map('map').setView(setCenter, 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGF1cmFlbGl6YWJldGg5MiIsImEiOiJjamd5OGtyOHIwMWl0MndyNGRsNmJkNW41In0.Y39YIj6lU_Sg6gEp6soLCA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibGF1cmFlbGl6YWJldGg5MiIsImEiOiJjamd5OGtyOHIwMWl0MndyNGRsNmJkNW41In0.Y39YIj6lU_Sg6gEp6soLCA'
        }).addTo(map);

      locations.forEach(location => {
        var marker = L.marker([location[2], location[3]]).bindPopup(`<center> <b>${location[0]}</b><br>${location[1]}<br>${location[4]}</center>`).openPopup().addTo(map);
        marker.addEventListener("click", function (){
          map.setView([location[2], location[3]], 13);
        })})

      }) // end of fetch


  })  // end of dom content loaded
