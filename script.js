const API = `https://61c46c02f1af4a0017d99522.mockapi.io/people`;

const controller = async (path, method="GET", obj) =>{

	const options = {
		method: method,
		headers: {
			"content-type": "application/json"
		}
	}

	if(obj){
		options.body = JSON.stringify(obj);
	}

	try{

		let request = await fetch(path, options),
			response = await request.json();

		return response;

	} catch(err){
		console.log(err);
		return [];
	}

}

// FORM

const heroesForm = document.querySelector(`#heroesForm`);

heroesForm.addEventListener(`submit`, async e=>{
	e.preventDefault();

	let heroName = e.target.querySelector(`input[data-name="heroName"]`).value;
	let heroComics = e.target.querySelector(`select[data-name="heroComics"]`).value;

	let heroFavourite = e.target.querySelector(`input[data-name="heroFavourite"]:checked`);

	if(heroFavourite){
		console.log(heroName, heroComics, `true`);

	} else {
		console.log(heroName, heroComics, `false`)
	}

	let people = await controller(API);
	console.log(people);

	let personExist = people.find(person => person.name === heroName);
	// console.log(personExist);
	

	if(personExist){
		if(personExist.name === heroName){
		console.log(`Person exist`)
		} 
	} else {
			console.log(`Person not exists`)
	}


});


let body = document.querySelector(`body`);
bodyload = async function(){

	let heroComics = heroesForm.querySelector(`select[data-name="heroComics"]`);

	let universes = await controller(API, "GET");
	for(let key in universes){
		heroComics.innerHTML += `<option value="${universes[key].country}">${universes[key].country}</option>`
	}
	// console.log(heroComics);

}
body.addEventListener(`load`, bodyload());


// TABLE


const heroesTable = document.querySelector(`#heroesTable`);

let table = document.createElement(`table`);

table.innerHTML = `<th>
            <tr>
                <th>Name Surname</th>
                <th>Comics</th>
                <th>Favourite</th>
                <th>Actions</th>
            </tr>
            <tr>
                <td>Checking 1</td>
                <td>Checking 2</td>
                <td>Checking 3</td>
                <td>Checking 4</td>
            </tr>
        </th>`;

 heroesTable.append(table);
 // console.log(heroesTable);