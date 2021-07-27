(async () => {
    const url = `https://thearkein-introcept-assessment.herokuapp.com/client`;
    let clients = [];

    // fetch clients
    let fetchClients = async () => {
        let response = await fetch(url);
        if (response.status != 200) {
            window.alert("Something went wrong with api. Please contact admin");
        }
        let result = await response.json();
        if (result.error) {
            window.alert("Something went wrong with api. Please contact admin");
        }
        clients = result.data;
        clients.forEach((client, index) => {
            client.id = index + 1;
        });
        console.log(clients);
        displayClientCards(clients);
    }

    // display client cards in page
    let displayClientCards = (clients) => {
        if (!clients.length) {
            document.querySelector('.cards').innerHTML = "No clients found in database. Add one";
        }
        document.querySelector('.cards').innerHTML = "";

        // render client card ui 
        clients.forEach(client => {
            let card = `
            <div class="card">
                <div class="left">
                    <div class="icon">${client.firstname[0]}</div>
                    <div class="name">${client.firstname} ${client.lastname}</div>
                    <button class="view-client-detail-btn" data-target="${client.id}" href="#" >View Details</button>
                </div>
            </div>`;
            let container = document.querySelector('.cards');
            container.innerHTML = container.innerHTML + card;
        });

        // show client detail view on view details button click for targeted client
        let btns = document.querySelectorAll('.view-client-detail-btn')
        btns.forEach(btn => {
            let target = btn.getAttribute('data-target')
            btn.addEventListener('click', () => {
                let detailView = document.querySelector('.view-client-detail-wrapper')
                setClientDetails(target)
                detailView.style.display = "flex"
            })
        })
    }

    // functionality for client search
    let searchbox = document.querySelector('.searchbar input');
    searchbox.addEventListener('keyup', (event) => {
        let matchedClients = [];
        let query = document.querySelector('.searchbar input').value;
        clients.forEach(client => {
            let name = (client.firstname + " " + client.lastname).toLowerCase();
            if (name.includes(query.toLowerCase())) {
                matchedClients.push(client);
            }
        })
        if (!matchedClients.length) {
            document.querySelector('.cards').innerHTML = "Search result: No such clients found";
        } else {
            displayClientCards(matchedClients);
        }
    })

    // change data on client detail view for targeted client 
    let setClientDetails = (target) => {
        let client = clients[target - 1];
        document.querySelector('.client-detail-card .icon').innerHTML = client.firstname[0];
        document.querySelector('.client-detail-card .name').innerHTML = client.firstname + " " + client.lastname;
        document.querySelector('.client-detail-card .details').innerHTML = `
            Gender: ${client.gender}<br>
            Dob: ${client.dob}<br>
            Nationlaity: ${client.nationality}<br>
            Email: ${client.email}<br>
            Address: ${client.address}<br>
            Education Level: ${client.educationLevel}<br>
            Preferred mode of contact: ${client.contactMode}
        `;
    }

    // hide client detail view on close button click
    let btn = document.querySelector('.close-btn');
    btn.addEventListener('click', () => {
        let clientDetailViewWrapper = document.querySelector('.view-client-detail-wrapper');
        clientDetailViewWrapper.style.display = "none";
    })

    await fetchClients()
})()