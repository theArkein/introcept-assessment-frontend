(async () => {
    const url = `https://thearkein-introcept-assessment.herokuapp.com/client`;
    let clients = [];

    // fetch clients
    let fetchClients = async () => {
        let response = await fetch(url)
        if (response.status != 200) {
            window.alert("Something went wrong with api. Please contact admin")
        }
        let result = await response.json()
        if (result.error) {
            window.alert("Something went wrong with api. Please contact admin")
        }
        clients = result.data
        clients.forEach((client, index) => {
            client.id = index + 1
        });
        console.log(clients)
        displayClientCards(clients)
    }

    let displayClientCards = (clients) => {
        if (!clients.length) {
            document.querySelector('.cards').innerHTML = "No clients found in database. Add one"
        }
        document.querySelector('.cards').innerHTML = "";
        clients.forEach(client => {
            let card = `
            <div class="card">
                <div class="left">
                    <div class="icon">${client.firstname[0]}</div>
                    <div class="name">${client.firstname} ${client.lastname}</div>
                    <button class="view-client-detail-btn" client-target="${client.id}" href="#" >View Details</button>
                </div>
            </div>`
            let container = document.querySelector('.cards')
            container.innerHTML = container.innerHTML + card

        });
    }


    await fetchClients()
})()