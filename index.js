function test() { console.log("Test"); }

// Course
const coursesDiv = document.getElementById("courses");
const addCourseButton = document.getElementById("addCourse");
// GPA
const gpa = document.getElementById("gpa");
const calculate = document.getElementById("calculate");
const warn = document.getElementById("warn");
// Grade's Key
const gradesKey = document.getElementById("gradesKey");
// Edit Grade's Key
const gradeKeyEditTbody = document.getElementById("gradeKeyEdit");
const gradeKeyEditCheckBox = document.getElementById("gradeKeyEditCheckBox");
const editGradeKey = document.getElementById("editGradeKey");
const cancelGradeKeyEdit = document.getElementById("cancelGradeKeyEdit");
const saveGradeKeyEdit = document.getElementById("saveGradeKeyEdit");
const editGradeKeyWarn = document.getElementById("editGradeKeyWarn");

var plusMinus = true;

// + and -
const letterToGPA_PM = {
    "A+": 4, "A": 4, "A-": 3.7,
    "B+": 3.3, "B": 3, "B-": 2.7,
    "C+": 2.3, "C": 2, "C-": 1.7,
    "D+": 1.3, "D": 1, "D-": 0.7,
    "F": 0
};
const GPAToPercentage_PM = {
    "4": { max: 100, min: 93 },
    "3.7": { max: 92, min: 90 },
    "3.3": { max: 89, min: 87 },
    "3": { max: 86, min: 83 },
    "2.7": { max: 82, min: 80 },
    "2.3": { max: 79, min: 77 },
    "2": { max: 76, min: 73 },
    "1.7": { max: 72, min: 70 },
    "1.3": { max: 69, min: 67 },
    "1": { max: 66, min: 63 },
    "0.7": { max: 62, min: 60 },
    "0": { max: 59, min: 0 }
};
const LetterToPercentage_PM = {
    "A+": { max: 100, min: 97 },
    "A": { max: 96, min: 93 },
    "A-": { max: 92, min: 90 },
    "B+": { max: 89, min: 87 },
    "B": { max: 86, min: 83 },
    "B-": { max: 82, min: 80 },
    "C+": { max: 79, min: 77 },
    "C": { max: 76, min: 73 },
    "C-": { max: 72, min: 70 },
    "D+": { max: 69, min: 67 },
    "D": { max: 66, min: 63 },
    "D-": { max: 62, min: 60 },
    "F": { max: 59, min: 0 }
};
// No + and -
const letterToGPA = {
    "A": 4,
    "B": 3,
    "C": 2,
    "D": 1,
    "F": 0
};
const GPAToPercentage = {
    "4": { max: 100, min: 90 },
    "3": { max: 89, min: 80 },
    "2": { max: 79, min: 70 },
    "1": { max: 69, min: 60 },
    "0": { max: 59, min: 0 }
};
const LetterToPercentage = {
    "A": { max: 100, min: 90 },
    "B": { max: 89, min: 80 },
    "C": { max: 79, min: 70 },
    "D": { max: 69, min: 60 },
    "F": { max: 59, min: 0 }
};

// Add Course
const coursesTypes = ["Regular", "Honors", "AP", "IB", "College"];
function addCourse() {
    // <tr>
    const tr = document.createElement("tr");
    tr.className = "course";

    // <td><span>-</span></td>
    const td1 = document.createElement("td");
    const span = document.createElement("span");
    span.innerHTML = "Ⓧ";
    span.addEventListener("click", () => (coursesDiv.children.length !== 1) ? tr.parentElement.removeChild(tr) : null);
    td1.appendChild(span);
    tr.appendChild(td1);
    
    /**
     * <td>
     *     <select>
     *         <option>Regular</option>
     *         <option>Honors</option>
     *         <option>AP</option>
     *         <option>IB</option>
     *         <option>College</option>
     *     </select>
     * </td>
     */
    const td2 = document.createElement("td");
    const select = document.createElement("select");
    coursesTypes.forEach(course => {
        const option = document.createElement("option");
        option.innerHTML = course;
        select.appendChild(option);
    });
    td2.appendChild(select);
    tr.appendChild(td2);
    
    // <td><input type="text" placeholder="Course Name"></td>
    const td3 = document.createElement("td");
    const input1 = document.createElement("input");
    input1.type = "text";
    input1.placeholder = "Course Name";
    td3.appendChild(input1);
    tr.appendChild(td3);
    
    // <td><input type="text" maxlength="3" placeholder="Grade"></td>
    const td4 = document.createElement("td");
    const input2 = document.createElement("input");
    input2.type = "text";
    input2.maxLength = "3";
    input2.placeholder = "Grade";
    td4.appendChild(input2);
    tr.appendChild(td4);
    
    // <td><input type="number" min="0" placeholder="Credits"></td>
    const td5 = document.createElement("td");
    const input3 = document.createElement("input");
    input3.type = "number";
    input3.min = "0";
    input3.placeholder = "Credits";
    td5.appendChild(input3);
    tr.appendChild(td5);
    
    coursesDiv.appendChild(tr);
}
addCourseButton.addEventListener("click", addCourse);
addCourse();

// Calculate GPA
calculate.addEventListener("click", () => {
    warn.style.display = "none";
    const coursesTrs = [...document.getElementsByClassName("course")];
    const letters = (plusMinus) ? ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"] : ["A", "B", "C", "D", "F"];
    var credits = 0;
    var gradeUnweighted = 0;
    var gradeWeighted = 0;
    // Get all courses
    coursesTrs.forEach(tr => {
        const tds = [...tr.children];
        // Check if empty
        if (tds[3].firstChild.value.length === 0 || tds[4].firstChild.value.length === 0) return warn.style.display = "block";
        // Check if grade is an alphabet
        if (letters.indexOf(tds[3].firstChild.value.toUpperCase()) >= 0) {
            gradeUnweighted += letterToGPA_PM[tds[3].firstChild.value.toUpperCase()] * Number(tds[4].firstChild.value);
            gradeWeighted += letterToGPA_PM[tds[3].firstChild.value.toUpperCase()] * Number(tds[4].firstChild.value) + ((tds[1].firstChild.value === "Regular" || letterToGPA_PM[tds[3].firstChild.value.toUpperCase()] === 0) ? 0 : (tds[1].firstChild.value === "Honors") ? 0.5 : 1);
        }
        // Check if grade is a number
        else if (/^\d+$/.test(tds[3].firstChild.value)) {
            for (const g in GPAToPercentage_PM) if (GPAToPercentage_PM[g].min <= Number(tds[3].firstChild.value) && Number(tds[3].firstChild.value) <= GPAToPercentage_PM[g].max) {
                gradeUnweighted += Number(g) * Number(tds[4].firstChild.value);
                gradeWeighted += Number(g) * Number(tds[4].firstChild.value) + ((tds[1].firstChild.value === "Regular" || Number(g) === 0) ? 0 : (tds[1].firstChild.value === "Honors") ? 0.5 : 1);
                break;
            }
        } else return warn.style.display = "block";
        credits += Number(tds[4].firstChild.value);
    });
    if (credits !== 0) {
        gpa.firstChild.innerHTML = Math.round(gradeUnweighted / credits * 100) / 100;
        gpa.lastChild.innerHTML = Math.round(gradeWeighted / credits * 100) / 100;
    }
});

// Set the grade to the Grade's Key
function setGradesKey() {
    gradesKey.innerHTML = "";
    var LToGPA = {};
    var LToP = {};
    if (plusMinus) {
        LToGPA = letterToGPA_PM;
        LToP = LetterToPercentage_PM;
    } else {
        LToGPA = letterToGPA;
        LToP = LetterToPercentage;
    }
    for (const letter in LToGPA) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerHTML = letter;
        tr.appendChild(td1);
        const td2 = document.createElement("td");
        td2.innerHTML = LToGPA[letter];
        tr.appendChild(td2);
        const td3 = document.createElement("td");
        td3.innerHTML = `${LToP[letter].min}-${LToP[letter].max}`;
        tr.appendChild(td3);
        gradesKey.appendChild(tr);
    }
}
setGradesKey();

// + and - check box
function plusMinusLetters() {
    gradeKeyEditTbody.innerHTML = "";
    var letters;
    // Check + and - letters check box
    if (gradeKeyEditCheckBox.checked) letters = ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","F"];
    else letters = ["A","B","C","D","F"];
    letters.forEach(letter => {
        // Add letter
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerHTML = letter;
        tr.appendChild(td1);
        // Add GPA
        const td2 = document.createElement("td");
        const select1 = document.createElement("select");
        for (let i = 50; i >= 0; i--) {
            const option = document.createElement("option");
            option.innerHTML = i / 10;
            select1.appendChild(option);
        }
        td2.appendChild(select1);
        tr.appendChild(td2);
        // Add Percentage
        const td3 = document.createElement("td");
        const select2 = document.createElement("select");
        const select3 = document.createElement("select");
        for (let i = 100; i >= 0; i--) {
            const option1 = document.createElement("option");
            option1.innerHTML = i;
            select2.appendChild(option1);
            const option2 = document.createElement("option");
            option2.innerHTML = i;
            select3.appendChild(option2);
        }
        td3.appendChild(select2);
        td3.appendChild(document.createTextNode(" - "));
        td3.appendChild(select3);
        tr.appendChild(td3);
        gradeKeyEditTbody.appendChild(tr);
    });
    // Check + and - letters check box
    if (gradeKeyEditCheckBox.checked) {
        [...gradeKeyEditTbody.children].forEach(tr => {
            const tds = [...tr.children];
            // Set GPA
            tds[1].firstChild.value = letterToGPA_PM[tds[0].innerHTML];
            // Set percentage min
            tds[2].firstChild.value = LetterToPercentage_PM[tds[0].innerHTML].min;
            // Set percentage max
            tds[2].lastChild.value = LetterToPercentage_PM[tds[0].innerHTML].max;
        });
    } else {
        [...gradeKeyEditTbody.children].forEach(tr => {
            const tds = [...tr.children];
            // Set GPA
            tds[1].firstChild.value = letterToGPA[tds[0].innerHTML];
            // Set percentage min
            tds[2].firstChild.value = LetterToPercentage[tds[0].innerHTML].min;
            // Set percentage max
            tds[2].lastChild.value = LetterToPercentage[tds[0].innerHTML].max;
        });
    }
}
gradeKeyEditCheckBox.addEventListener("change", plusMinusLetters);
plusMinusLetters();

// Edit Grade's Key button
editGradeKey.addEventListener("click", () => document.getElementsByClassName("gradeKeyEdit").item(0).style.display = "table");

// Cancel Grade's Key Edit button
cancelGradeKeyEdit.addEventListener("click", () => {
    document.getElementsByClassName("gradeKeyEdit").item(0).style.display = "none";
    editGradeKeyWarn.style.display = "none";
    gradeKeyEditCheckBox.checked = plusMinus;
    plusMinusLetters();
});

// Save Grade's Key Edit button
saveGradeKeyEdit.addEventListener("click", () => {
    var previousLetter;
    var previousGPA;
    var previousMin;
    var stop = false;
    const LToGPA = {};
    const GPAToP = {};
    const LToP = {};
    editGradeKeyWarn.style.display = "none";
    [...gradeKeyEditTbody.children].forEach((tr, i) => {
        if (stop) return;
        stop = true;
        const tds = [...tr.children];
        if (!i) {
            previousGPA = Number(tds[1].firstChild.value);
            previousMin = parseInt(tds[2].lastChild.value) + 1;
            previousLetter = tds[0].innerHTML;
        }
        if (Number(tds[1].firstChild.value) > previousGPA) {
            // GPA at {letter} (GPA) is greater than {letter} (GPA)
            return editGradeKeyWarn.innerHTML = `GPA at ${tds[0].innerHTML} (${tds[1].firstChild.value}) is greater than ${previousLetter} (${previousGPA})`;
        } else if (parseInt(tds[2].lastChild.value) >= previousMin) {
            // Percentage max at {letter} (percent) is greater than or equal to percentage min at {letter} (percent)
            return editGradeKeyWarn.innerHTML = `Percentage max at ${tds[0].innerHTML} (${tds[2].lastChild.value}) is greater than or equal to percentage min at ${previousLetter} (${previousMin})`;
        } else if (parseInt(tds[2].lastChild.value) + 1 !== previousMin) {
            // Percentage max at {letter} (percent) is not less than percentage min at {letter} (percent) by 1
            return editGradeKeyWarn.innerHTML = `Percentage max at ${tds[0].innerHTML} (${tds[2].lastChild.value}) is not less than percentage min at ${previousLetter} (${previousMin}) by 1`;
        } else if (parseInt(tds[2].firstChild.value) >= parseInt(tds[2].lastChild.value)) {
            // At {letter}, percentage min (percent) is greater than or equal to percentage max (percent)
            return editGradeKeyWarn.innerHTML = `At ${tds[0].innerHTML}, percentage min (${tds[2].firstChild.value}) is greater than or equal to percentage max (${tds[2].lastChild.value})`;
        } else {
            stop = false;
            previousGPA = Number(tds[1].firstChild.value);
            previousMin = parseInt(tds[2].firstChild.value);
            previousLetter = tds[0].innerHTML;
            // Letter to GPA
            LToGPA[previousLetter] = previousGPA;
            // GPA to Percentage
            if (GPAToP[previousGPA] === undefined) GPAToP[previousGPA] = { min: previousMin, max: parseInt(tds[2].lastChild.value)};
            else GPAToP[previousGPA].min = previousMin;
            // Letter to Percentage
            LToP[previousLetter] = { min: previousMin, max: parseInt(tds[2].lastChild.value)};
        }
    });
    if (stop) return editGradeKeyWarn.style.display = "block";
    // Don't show Grade's Key Edit
    document.getElementsByClassName("gradeKeyEdit").item(0).style.display = "none";
    if (plusMinus) {
        Object.assign(letterToGPA_PM, LToGPA);
        Object.assign(GPAToPercentage_PM, GPAToP);
        Object.assign(LetterToPercentage_PM, LToP);
    } else {
        Object.assign(letterToGPA, LToGPA);
        Object.assign(GPAToPercentage, GPAToP);
        Object.assign(LetterToPercentage, LToP);
    }
    plusMinus = gradeKeyEditCheckBox.checked;
    // Set all grades to the Grade's Key table
    setGradesKey();
});