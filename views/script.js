
function displayAppointmentData(data) {
    const itemList = document.getElementById('items');
    itemList.innerHTML = ''; // Clear the existing list items
    itemList.addEventListener('click', handleItemClick);

    // Loop through localStorage and display the data
    data.forEach((item)=> {
        const {name,Email,Phone,Time,date,_id} =item;
        var deleteBtn = document.createElement('button');
        var editBtn = document.createElement('button');
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const combinedText = `${name} ${Email}-${Phone} (${item.date} at ${item.Time})`;
        li.appendChild(document.createTextNode(combinedText));
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.dataset.key = _id;
        deleteBtn.appendChild(document.createTextNode('Delete'));
        editBtn.className = 'btn btn-warning btn-sm float-right edit';
        editBtn.dataset.key = _id;
        editBtn.appendChild(document.createTextNode('Edit'));
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        itemList.appendChild(li);
    });
}

function handleItemClick(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this item?')) {

            const key = e.target.dataset.key;
            
            axios.delete(`https://crudcrud.com/api/c2e5500d85af4be18be03f0f32ac9ed6/appointmentData/${key}`)
            .then((response)=>{
                console.log(response);
                fetchDataAndDisplay();
            })
            .catch((err)=>console.log(err));
        }
    } else if (e.target.classList.contains('edit')) {
        const key = e.target.dataset.key;
        
        axios.get(`https://crudcrud.com/api/c2e5500d85af4be18be03f0f32ac9ed6/appointmentData/${key}`)
            .then((response)=>{
                const data =response.data;
            
           
       
        document.getElementById("name").value = data.name;
        document.getElementById("email").value =data.Email;
        document.getElementById("phone").value =data.Phone;
        document.getElementById("date").value = data.date;
        document.getElementById("time_for_call").value = data.Time;
        document.getElementById("submitBtn").textContent = "Save";
        
        // Set a custom attribute 'data-key' to store the key value
        document.getElementById("submitBtn").setAttribute('data-key', key);
    })
    .catch((err)=>console.log(err));
    }
}
function fetchDataAndDisplay() {
    axios.get(`https://crudcrud.com/api/c2e5500d85af4be18be03f0f32ac9ed6/appointmentData`)
        .then((response) => {
            const data = response.data;
            displayAppointmentData(data);
        })
        .catch((err) => console.log(err));
}
document.getElementById("submitBtn").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const timeForCall = document.getElementById("time_for_call").value;
    const key = document.getElementById("submitBtn").getAttribute('data-key');

    if (key) {
        // If key exists, it means we are editing an existing item
        let myObj = {
            name: name,
            Email: email,
            Phone: phone,
            date: date,
            Time: timeForCall
        };
        let myObj_serialized = JSON.stringify(myObj);
        axios.put(`https://crudcrud.com/api/c2e5500d85af4be18be03f0f32ac9ed6/appointmentData/${key}`, myObj_serialized, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response);
            // Refresh the data after successful update
            fetchDataAndDisplay();
        })
        .catch((err) => console.log(err));
       
        document.getElementById("submitBtn").textContent = "Add Data";
       // document.getElementById("submitBtn").removeAttribute("data-key");
    } else {
        // If key doesn't exist, it means we are adding a new item
        
        let myObj = {
            name: name,
            Email: email,
            Phone: phone,
            date: date,
            Time: timeForCall
        };
        let myObj_serialized = JSON.stringify(myObj);
        axios.post("https://crudcrud.com/api/c2e5500d85af4be18be03f0f32ac9ed6/appointmentData", myObj_serialized,{
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then((response) => {
            fetchDataAndDisplay(); 
          console.log(response);
        })
        .catch((err) => console.log(err));
        
    }

   
    clearInputFields();
});

function clearInputFields() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("date").value = '';
    document.getElementById("time_for_call").value = '';
}

fetchDataAndDisplay();

