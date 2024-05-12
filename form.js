let myformE1 = document.getElementById("myform");

let nameE1 = document.getElementById("name");
let nameErrMsgE1 = document.getElementById("nameErrMsg");

let EmailE1 = document.getElementById("Email");
let EmailErrMsgE1 = document.getElementById("EmailErrMsg");

let workingstatusE1 = document.getElementById("status");
let gendermaleE1 = document.getElementById("gendermale");
let genderfemaleE1 = document.getElementById("genderfemale");

let formData = {
    name: "",
    Email: "",
    status: "Active",
    Gender: "Male"
};

nameE1.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsgE1.textContent = "Required *";
    } else {
        nameErrMsgE1.textContent = "";
    }
    formData.name = event.target.value;
});

EmailE1.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        EmailErrMsgE1.textContent = "Required *";
    } else {
        EmailErrMsgE1.textContent = "";
    }
    formData.Email = event.target.value;
});

workingstatusE1.addEventListener("change", function(event) {
    formData.status = event.target.value;
});

gendermaleE1.addEventListener("change", function(event) {
    formData.Gender = event.target.value;
});

genderfemaleE1.addEventListener("change", function(event) {
    formData.Gender = event.target.value;
});

function validateFromData(formData) {
    let {
        name,
        Email
    } = formData;
    if (name === "") {
        nameErrMsgE1.textContent = "Required *";
    }
    if (Email === "") {
        EmailErrMsgE1.textContent = "Required *";
    }
}

function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f",
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    EmailErrMsgE1.textContent = "Email Already Exists";
                }
            }
        });
}
myformE1.addEventListener("submit", function(Event) {
    event.preventDefault();
    validateFormData(formData);
    submitFormData(formData);
});