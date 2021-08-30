let list_of_project = new Array();
let id =0;

//Add Project Details In Local Storage With Key Name Data 
const add_project = () =>{
	const proj_title = document.getElementById("proj_title").value;
	const proj_desc = document.getElementById("proj_desc").value;
	const proj_logo = document.getElementById("proj_img_url").value;
	if(proj_title !='' && proj_desc!='' && proj_logo!='')
	{
		const project = {};

		project.projectTitle = proj_title;
		project.projectDesc = proj_desc;
		project.proj_logo = proj_logo;

		if(localStorage.getItem("Data")===null)
		{
			project.pid = id++;
			list_of_project.push(project);
			localStorage.setItem("Data",JSON.stringify(list_of_project));
		}
		else
		{
			var data = JSON.parse(localStorage.getItem('Data'));
			project.pid = Math.floor(Math.random()*100000+1);
			data.push(project);
			localStorage.setItem('Data',JSON.stringify(data));
		}	
	}
	else
	{
		alert("Please Fill All FIelds");
	}
	document.getElementById("proj_title").value = '';
	document.getElementById("proj_desc").value = '';
	document.getElementById("proj_img_url").value = '';
}

//Fetch All Project Details In Tabular Format From Local Storage In Project.html File
const fetch_project = () =>{
	document.getElementById("proj_list").innerHTML = '';
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0; i<project_data.length;i++)
	{
		document.getElementById("proj_list").innerHTML += `<tr>
										<td>${project_data[i].projectTitle}</td>
										<td>${project_data[i].projectDesc}</td>
										<td>${project_data[i].proj_logo}</td>
										<td><button onClick="get_proj_data(${project_data[i].pid})" class="btn btn-primary mt-3" data-toggle="modal" data-target="#exampleModal">Edit</button>
                       					<button onClick="delete_project(${project_data[i].pid})" class="btn btn-danger mt-3">Delete</button>
                       					<button class="btn btn-warning mt-3" data-toggle="modal" data-target="#modules" onClick="display_modules(${project_data[i].pid});">See Modules</button></td>
										</tr>`; 

	}	
}

//Get A Particular Project Deails From Local Storage To Update Form
const get_proj_data = (project_id) =>{
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0;i<project_data.length;i++)
	{
		if(project_data[i].pid === project_id)
		{
			document.getElementById("edit_proj_title").value = project_data[i].projectTitle;;
			document.getElementById("edit_proj_desc").value = project_data[i].projectDesc;
			document.getElementById("update_button").innerHTML = `<button type="button" class="btn btn-primary" onClick="update_project(${project_data[i].pid});">Save changes</button>`;
		}	
	}	
}

// Update Project From Local Storage
const update_project = (project_id) =>
{
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0; i<project_data.length;i++)
	{
		if(project_data[i].pid === project_id)
		{
			project_data[i].projectTitle = document.getElementById("edit_proj_title").value;
			project_data[i].projectDesc = document.getElementById("edit_proj_desc").value;
		}
	}		
	localStorage.setItem('Data',JSON.stringify(project_data));
	fetch_project();
}

// Delete Project From Local Storage
const delete_project = (project_id) =>
{
	var confirm_delete_project = confirm("Are You Sure You Want To Delete This Project");
	if(confirm_delete_project == true)
	{
		var project_data = JSON.parse(localStorage.getItem("Data"));
		project_data=removeByAttr(project_data,"pid",project_id);
		localStorage.setItem('Data',JSON.stringify(project_data));
		fetch_project();
	}
	else
	{

	}
}

//Fetching Project List For Module.html
const fetch_project_list = () =>{
	document.getElementById("list_of_project").innerHTML = '<option>Select Project</option>';
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0; i<project_data.length;i++)
	{
		document.getElementById("list_of_project").innerHTML +=`<option value="${project_data[i].pid}">${project_data[i].projectTitle}</option>`;
	}	
}

//Search Project
const searchProject = (searchByName) =>{
	console.log(searchByName);
	document.getElementById("proj_list").innerHTML='';
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0; i<project_data.length;i++)
	{
		if(project_data[i].projectTitle.toUpperCase().includes(searchByName.toUpperCase()))
		{

			console.log("HAHAHA");
			document.getElementById("proj_list").innerHTML += `<tr>
										<td>${project_data[i].projectTitle}</td>
										<td>${project_data[i].projectDesc}</td>
										<td>${project_data[i].proj_logo}</td>
										<td><button onClick="get_proj_data(${project_data[i].pid})" class="btn btn-primary mt-3" data-toggle="modal" data-target="#exampleModal">Edit</button>
                       					<button onClick="delete_project(${project_data[i].pid})" class="btn btn-danger mt-3">Delete</button>
                       					<button class="btn btn-warning mt-3" data-toggle="modal" data-target="#modules" onClick="display_modules(${project_data[i].pid});">See Modules</button></td>
										</tr>`; 
		}
	}
} 
//Create A Module In Project
const add_module = () =>{
	let proj_id = Number(document.getElementById("list_of_project").value);
	const module_title = document.getElementById("module_title").value;
	const module_desc = document.getElementById("module_desc").value;
		const proj_module = {};
		proj_module.moduleTitle = module_title;
		proj_module.moduleDesc = module_desc;

		var project_data = JSON.parse(localStorage.getItem("Data"));

		for(var i = 0;i<project_data.length;i++)
		{
			if(project_data[i].pid === proj_id)
			{
				if(project_data[i].modules === undefined)
				{
					let modules_list = new Array();
					proj_module.mid = 0;
					modules_list.push(proj_module);
					project_data[i].modules = modules_list;
					localStorage.setItem("Data", JSON.stringify(project_data));
				}	
				else
				{
					for(var j=0; j<project_data[i].modules.length;j++)
					{
		 				var id = project_data[i].modules[j].mid++;
					}
					proj_module.mid = id;
					project_data[i].modules.push(proj_module);
					localStorage.setItem("Data",JSON.stringify(project_data));
				}
			}
		}
	document.getElementById("list_of_project").value ='';
	document.getElementById("module_title").value ='';
	document.getElementById("module_desc").value = '';
}

//Display All Modules In Particular Project
const display_modules = (project_id) =>
{
	document.getElementById("module_list").innerHTML = '';
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0; i<project_data.length;i++)
	{
		if(project_data[i].pid === project_id)
		{
			for(var j = 0; j<project_data[i].modules.length;j++)
			{
				document.getElementById("module_list").innerHTML += `<tr>
						<td>${JSON.stringify(project_data[i].modules[j].moduleTitle)}</td>
						<td>${JSON.stringify(project_data[i].modules[j].moduleDesc)}</td>
						<td>
							<button class="btn btn-success" onClick="edit_module(${project_id},${project_data[i].modules[j].mid});">Edit Module</button>
							<button class="btn btn-danger mt-3" onClick="delete_module(${project_id},${project_data[i].modules[j].mid});">Delete Module</button>
						</td>
						</tr>`; 

			}
		}
	}
}

const display_all_modules = () =>
{
	document.getElementById("created_modules").innerHTML ='';
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0; i<project_data.length;i++)
	{
			for(var j = 0; j<project_data[i].modules.length;j++)
			{
				document.getElementById("created_modules").innerHTML += `<tr>
						<td>${project_data[i].projectTitle}</td>
						<td>${JSON.stringify(project_data[i].modules[j].moduleTitle)}</td>
						<td>${JSON.stringify(project_data[i].modules[j].moduleDesc)}</td>
						<td>
							<button class="btn btn-danger mt-3" onClick="delete_module(${project_data[i].pid},${project_data[i].modules[j].mid});">Delete Module</button>
						</td>
						</tr>`; 
			}
	}
}

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

const delete_module = (project_id,mid) =>
{
	var confirm_delete_module = confirm("Are You Sure You Want To Delete This Module");
	if(confirm_delete_module == true)
	{
		var project_data = JSON.parse(localStorage.getItem("Data"));
		for(var i=0; i<project_data.length;i++)
		{
			if(project_data[i].pid === project_id)
			{
				project_data[i].modules = removeByAttr(project_data[i].modules,"mid",mid);
			}	
		}
		localStorage.setItem('Data',JSON.stringify(project_data));
		display_all_modules();
		$('#modules').hide();
	}
	else
	{

	}
	
}

const edit_module = (project_id,module_id) =>{
	document.getElementById("edit_module").style.display = "block";
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0; i<project_data.length;i++)
	{
		if(project_data[i].pid === project_id)
		{
			var module_data = project_data[i].modules.find(({mid})=>
				mid === module_id
			)
		}
	}		
	document.getElementById("mid").value = module_id;
	document.getElementById("proj_id").value = project_id;
	document.getElementById("edit_module_title").value=module_data.moduleTitle;
	document.getElementById("edit_module_desc").value=module_data.moduleDesc;

	display_modules(project_id);

}

const update_module = () =>
{
	const proj_module = {};
	var mid = Number(document.getElementById("mid").value)
	proj_module.mid = mid;
	proj_module.moduleTitle = document.getElementById("edit_module_title").value;
	proj_module.moduleDesc = document.getElementById("edit_module_desc").value;
	
	proj_id = Number(document.getElementById("proj_id").value);
	var data = JSON.parse(localStorage.getItem('Data'));
	for(var i=0; i<data.length;i++)
	{
		if(data[i].pid === proj_id)
		{
			data[i].modules = removeByAttr(data[i].modules,"mid",mid);
		}	
	}
	localStorage.setItem('Data',JSON.stringify(data));
	for(var i=0; i<data.length;i++)
	{
		if(data[i].pid === proj_id)
		{
			data[i].modules.push(proj_module);
		}
	}		
	localStorage.setItem("Data",JSON.stringify(data));
		$('#modules').hide();
}

const searchModule = (searchByModule) =>{
	document.getElementById("created_modules").innerHTML = '';
	var project_data = JSON.parse(localStorage.getItem("Data"));
	for(var i=0; i<project_data.length;i++)
	{
		for(var j = 0; j<project_data[i].modules.length;j++)
		{
			if(project_data[i].modules[j].moduleTitle.toUpperCase().includes(searchByModule.toUpperCase()))
			{
				document.getElementById("created_modules").innerHTML += `<tr>
						<td>${project_data[i].projectTitle}</td>
						<td>${JSON.stringify(project_data[i].modules[j].moduleTitle)}</td>
						<td>${JSON.stringify(project_data[i].modules[j].moduleDesc)}</td>
						<td>
							<button class="btn btn-danger mt-3" onClick="delete_module(${project_data[i].pid},${project_data[i].modules[j].mid});">Delete Module</button>
						</td>
						</tr>`; 
			}
		}	
	}
}