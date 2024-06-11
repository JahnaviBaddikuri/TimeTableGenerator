// default function triggered on page load
window.onload = function () {
	PageLoad();
	console.log("Hello there!");
	Class_Dropdown_Builder();
	Table_Ddl_Builder();
	ClassDdlChanged();
}

// list of subjects and teachers combination to be diplayed in dropdown
var subjects = ["",
				"Maths - Sunitha K Mam",
				"Maths - Veeresh Sir",
				"Maths - Gururaj Sir",
				"SE - Prathibha Mam",
				"SE - ShwethaShree Mam",
				"DAA - Kiran M Sir",
				"DAA - Srisailnath Sir",
				"MC - Rajashree V Mam",
				"CIPE - Maheshwari V J Mam",
				"Basic Aptitude and Soft Skills - 1",
				"Basic Aptitude and Soft Skills - 2",
				"Basic Aptitude and Soft Skills - 3",
				"R Prog - Kulkarni Sir",
				"R Prog - Sreenivasa M Sir",
				"UHV - RaviTeja",
				"DAA LAB - Kiran M Sir",
				"DAA LAB - Srisailnath Sir",
				"DAA LAB - Swathi Mam",
				"IPCC LAB - Pratibha Mam",
				"IPCC LAB - Alekhya V Mam",
				"IPCC LAB - ShwethaShree Mam",
				"MES LAB - Virupakska Sir",
				"MES LAB - Narasimha Raju Sir",
				"MES LAB - Hayath Sir",
				"Bridge Course - Prahalad Sir",
				"Bridge Course - Shushila Mam",
				];
// names of Sections or classes
var classes = ["Sem 4 - Sec A",
				"Sem 4 - Sec B",
				"Sem 4 - Sec C"];
var noOfDays = 6;

//temporary timetable array that stores all classes timetable when on this page 
var timeTableData = new Array();


function PageLoad() {
	//reload the user details from session storage
	var userName = sessionStorage.getItem("UserName");
	var userRole = sessionStorage.getItem("UserRole");
	const emptyValues = ["", '', null];
	//if no user details are in session, then ask user to login
	if(emptyValues.includes(userRole) || emptyValues.includes(userName)){
		window.location = "login.html";
	}
	//if user is admin, only then show submit button
	else if(userRole == "Admin"){
		document.getElementById("SubmitBtn").style.display = "inline-block"
	}
	//if user is not admin then hide the submit button
	else{
		document.getElementById("SubmitBtn").style.display = "none"
	}
	document.getElementById("username").innerHTML = userName;


	//if any timetable is already in session storage then load that array into timeTableData
	if(sessionStorage.getItem("timeTableData")!=null){
		timeTableData = JSON.parse(sessionStorage.getItem("timeTableData"));
	}
	// if no timetable was already loaded then create array having noOfDays and noOfClasses
	if(timeTableData.length==0){
		for (var j = 0; j < classes.length; j++) {
			var classtable = new Array();
			for (var day = 0; day < noOfDays; day++) {
				classtable.push(new Array())
			}
			timeTableData.push(classtable)
		}
	}
////creating a default array for testing
	// timeTableData = [
	// 		[
	// 			["","","","","","","",""],
	// 			["","","","","","","",""],
	// 			["","","","","","","",""],
	// 			["","","","","","","",""],
	// 			["","","","","","","",""],
	// 			["","","","","","","",""],
	// 			],
	// 		[
	// 			["Subject 1","Subject 2","Subject 3","Subject 4","Subject 5","Subject 6","Subject 7","Subject 8"],
	// 			["Subject 8","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5","Subject 6","Subject 7"],
	// 			["Subject 7","Subject 8","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5","Subject 6"],
	// 			["Subject 6","Subject 7","Subject 8","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5"],
	// 			["Subject 5","Subject 6","Subject 7","Subject 8","Subject 1","Subject 2","Subject 3","Subject 4"],
	// 			["Subject 4","Subject 5","Subject 6","Subject 7","Subject 8","Subject 1","Subject 2","Subject 3"],
	// 			],
	// 		[
	// 			["Subject 4","Subject 5","Subject 6","Subject 7","Subject 8","Subject 1","Subject 2","Subject 3"],
	// 			["Subject 1","Subject 2","Subject 3","Subject 4","Subject 5","Subject 6","Subject 7","Subject 8"],
	// 			["Subject 8","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5","Subject 6","Subject 7"],
	// 			["Subject 7","Subject 8","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5","Subject 6"],
	// 			["Subject 6","Subject 7","Subject 8","Subject 1","Subject 2","Subject 3","Subject 4","Subject 5"],
	// 			["Subject 5","Subject 6","Subject 7","Subject 8","Subject 1","Subject 2","Subject 3","Subject 4"],
	// 			],
	// 	]	
}





//loads the classes or sections available into the Class dropdown
function Class_Dropdown_Builder() {
	var ddl = document.getElementById("classddl");
	for (var i = 0; i < classes.length; i++) {
		ddl.options[i] =  new Option(classes[i], i);
	}
}
//is triggered when the class or section is changed in dropdown
function ClassDdlChanged(){
	var ddl = document.getElementById("classddl");
	document.getElementById("heading1").innerHTML = "Timetable for " + classes[ddl.value];
	LoadTimetable(); // load timetable for the selected class	
}

//loads available subjects-teacher combination into specified period dropdown id
function Subject_Dropdown_Builder(elementId) {
	var ddl = document.getElementById(elementId);
	for (var i = 0; i < subjects.length; i++) {
		ddl.options[i] =  new Option(subjects[i], subjects[i]);
	}
	var idArr = elementId.split("-");
	//attach the onchange trigger to validate the period selection
	ddl.addEventListener("change",(e) => {
		Validate_Function(idArr[0],idArr[1]);
	})
}
// load all the period dropdowns and update them in loop
function Table_Ddl_Builder() {
	var listOfDropdowns=document.getElementsByClassName("period");
	for (var i = 0; i < listOfDropdowns.length; i++) {
		Subject_Dropdown_Builder(listOfDropdowns[i].id);
	}
}


// validate and check if the same subject and teacher is selected in some other class for same time
function Validate_Function(day,period) {
	var selectedValue = document.getElementById(day+"-"+period).value;
	if(selectedValue!=""){
		var currentClass = document.getElementById("classddl").value;
		for (var i = 0; i < classes.length ; i++) {
			if(currentClass!=i){
				if(timeTableData[i][day][period]==selectedValue){
					alert("This Subject is already alotted for another class in this timeslot!");
					document.getElementById(day+"-"+period).value = "";
					return;
				}
			}
		}
	}
}

// load the selected subjects for selected class (main timetable itself)
function LoadTimetable() {
	try{
		var currentClass = document.getElementById("classddl").value;
		for (var day = 0; day < noOfDays; day++) {
			
			for (var period = 0; period < 7; period++) {
				var periodDdl = document.getElementById(day+"-"+period)
				periodDdl.value = timeTableData[currentClass][day][period];
			}
		}		
	}
	catch(error){
		console.log(error);
	}
}
//save the timetable into local array (timeTableData) as well as session storage
function Submit_Function() {
	var currentClass = document.getElementById("classddl").value;
	for (var day = 0; day < noOfDays; day++) {
		for (var period = 0; period < 7; period++) {
			var periodDdl = document.getElementById(day+"-"+period)
			timeTableData[currentClass][day][period] =  periodDdl.value; // compare with same day same time but different class
		}
	}
	sessionStorage.setItem("timeTableData", JSON.stringify(timeTableData));
	alert("Saved Timetable successfully!");
}

//logout the user and clear session username
function Logout() {
	sessionStorage.setItem("UserRole",'');
	sessionStorage.setItem("UserName",'');
	window.location = "login.html";
}