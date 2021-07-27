const url = `https://thearkein-introcept-assessment.herokuapp.com/client`;

// send data on form submit
let form = document.querySelector('form');
form.onsubmit = async (e) => {
    e.preventDefault()
    // show loader
    let laoder = document.querySelector('.loader');
    laoder.style.display = "flex";

    // field feedbacks
    let fieldFeedbacks = {
        firstname: [],
        lastname: [],
        email: [],
        phone: [],
        gender: [],
        dob: [],
        nationality: [],
        address: [],
        educationLevel: [],
        contactMode: []
    }

    // get all form data in json form
    let data = {};
    let formData = new FormData(form);
    formData.forEach((value, key) => data[key] = value);

    // reset field feedbacks before new response
    resetFieldFeedbacks(fieldFeedbacks)

    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": 'application/json'
        }
    })
    // hide loader
    laoder.style.display = "none";

    // display response
    if (response.status === 201) {
        let result = await response.json()
        alert("Client successfully added")
    } else {
        let result = await response.json()

        // format error message into separate field feedbacks
        result.message.forEach(error => {
            let feedbackField = error.split(' ')[0]
            fieldFeedbacks[feedbackField].push(error)
        })
        // display field feedbacks
        Object.keys(fieldFeedbacks).forEach(key => {
            let fieldFeedback = document.querySelector(`.${key}.feedback`)
            fieldFeedback.innerHTML = fieldFeedbacks[key][0] || ""
            fieldFeedback.classList.add('error')
            fieldFeedback.style.display = 'block'
        })
    }
}

let resetFieldFeedbacks = (fields) => {
    Object.keys(fields).forEach(key => {
        let fieldFeedback = document.querySelector(`.${key}.feedback`)
        fieldFeedback.innerHTML = ""
        fieldFeedback.classList.remove('error')
        fieldFeedback.style.display = 'none'
    })
}