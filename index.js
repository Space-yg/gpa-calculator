function test() { console.log("Test"); }

// Grade Options
const gradeOption = [...document.getElementsByClassName("gradeOption")];
// Course
const coursesDiv = document.getElementById("courses");
const addCourseButton = document.getElementById("addCourse");
// GPA
const gpa = document.getElementById("gpa");
// Grade's Key
const gradesKey = document.getElementById("gradesKey");
// Edit Grade's Key
const gradeKeyEditTbody = document.getElementById("gradeKeyEdit");
const gradeKeyEditCheckBox = document.getElementById("gradeKeyEditCheckBox");
const editGradeKey = document.getElementById("editGradeKey");
const resetGradeKey = document.getElementById("resetGradeKey");
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
    "3.7": { max: 93, min: 90 },
    "3.3": { max: 90, min: 87 },
    "3": { max: 87, min: 83 },
    "2.7": { max: 83, min: 80 },
    "2.3": { max: 80, min: 77 },
    "2": { max: 77, min: 73 },
    "1.7": { max: 73, min: 70 },
    "1.3": { max: 70, min: 67 },
    "1": { max: 67, min: 63 },
    "0.7": { max: 63, min: 60 },
    "0": { max: 60, min: 0 }
};
const LetterToPercentage_PM = {
    "A+": { max: 100, min: 97 },
    "A": { max: 97, min: 93 },
    "A-": { max: 93, min: 90 },
    "B+": { max: 90, min: 87 },
    "B": { max: 87, min: 83 },
    "B-": { max: 83, min: 80 },
    "C+": { max: 80, min: 77 },
    "C": { max: 77, min: 73 },
    "C-": { max: 73, min: 70 },
    "D+": { max: 70, min: 67 },
    "D": { max: 67, min: 63 },
    "D-": { max: 63, min: 60 },
    "F": { max: 60, min: 0 }
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
    "3": { max: 90, min: 80 },
    "2": { max: 80, min: 70 },
    "1": { max: 70, min: 60 },
    "0": { max: 60, min: 0 }
};
const LetterToPercentage = {
    "A": { max: 100, min: 90 },
    "B": { max: 90, min: 80 },
    "C": { max: 80, min: 70 },
    "D": { max: 70, min: 60 },
    "F": { max: 60, min: 0 }
};

/**
 * Adds grade
 * @returns Element that is grade
 */
function addGrade() {
    if (document.getElementsByClassName("selectedGrade").item(0).innerHTML === "Letter") {
        /**
         * <select>
         *     <option>A</option>
         *     <option>B</option>
         *     <option>C</option>
         *     <option>D</option>
         *     <option>F</option>
         * </select>
         */
        const letters = (plusMinus) ? letterToGPA_PM : letterToGPA;
        const select = document.createElement("select");
        for (const letter in letters) {
            const option = document.createElement("option");
            option.innerHTML = letter;
            select.appendChild(option);
        }
        select.addEventListener("change", calculateGPA);
        return select;
    } else {
        // <input placeholder="Grade" type="number" min="0">
        const input = document.createElement("input");
        input.placeholder = "Grade";
        input.type = "number";
        input.min = "0";
        input.addEventListener("change", calculateGPA);
        return input;
    }
}

/**
 * Grade Option
 * @param {PointerEvent} event 
 */
function changeGrade(event) {
    if (event.target.classList.length === 1) {
        // Changes grading system
        gradeOption.forEach(grade => (grade.classList.length === 1) ? grade.classList.add("selectedGrade") : grade.classList.remove("selectedGrade"));
        [...coursesDiv.children].forEach(tr => {
            tr.children.item(3).innerHTML = "";
            tr.children.item(3).appendChild(addGrade());
        });
    }
}
gradeOption.forEach(button => button.addEventListener("click", changeGrade));

// Add Course
const coursesTypes = ["Regular", "Honors", "AP", "IB", "College"];
function addCourse() {
    // <tr>
    const tr = document.createElement("tr");
    tr.className = "course";

    // <td><span>Ⓧ</span></td>
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
    select.addEventListener("change", calculateGPA);
    td2.appendChild(select);
    tr.appendChild(td2);
    
    // <td><input type="text" placeholder="Course Name"></td>
    const td3 = document.createElement("td");
    const input1 = document.createElement("input");
    input1.type = "text";
    input1.placeholder = "Course Name";
    td3.appendChild(input1);
    tr.appendChild(td3);
    
    // Adds Grade
    const td4 = document.createElement("td");
    td4.appendChild(addGrade());
    tr.appendChild(td4);
    
    // <td><input type="number" min="0" placeholder="Credits"></td>
    const td5 = document.createElement("td");
    const input2 = document.createElement("input");
    input2.type = "number";
    input2.min = "0";
    input2.placeholder = "Credits";
    input2.addEventListener("change", calculateGPA);
    td5.appendChild(input2);
    tr.appendChild(td5);
    
    coursesDiv.appendChild(tr);
}
addCourseButton.addEventListener("click", addCourse);
addCourse();

// Calculate GPA
function calculateGPA() {
    const coursesTrs = [...document.getElementsByClassName("course")];
    let credits = 0;
    let gradeUnweighted = 0;
    let gradeWeighted = 0;
    // Get all courses
    coursesTrs.forEach(tr => {
        const tds = [...tr.children];
        if (document.getElementsByClassName("selectedGrade").item(0).innerHTML === "Letter") {
            const LToGPA = (plusMinus) ? letterToGPA_PM : letterToGPA;
            gradeUnweighted += LToGPA[tds[3].firstChild.value] * Number(tds[4].firstChild.value);
            gradeWeighted += Number(tds[4].firstChild.value) * ((tds[1].firstChild.value === "Regular") ? 0 : (tds[1].firstChild.value === "Honors") ? 0.5 : 1);
        } else {
            // Check if empty
            if (tds[3].firstChild.value.length === 0 || tds[4].firstChild.value.length === 0) return;
            // Check if grade is a number
            else if (/^(\d*\.\d+|\d+)$/gm.test(tds[3].firstChild.value)) {
                for (const g in GPAToPercentage_PM) if (GPAToPercentage_PM[g].min <= Number(tds[3].firstChild.value) && Number(tds[3].firstChild.value) < GPAToPercentage_PM[g].max) {
                    gradeUnweighted += Number(g) * Number(tds[4].firstChild.value);
                    gradeWeighted += Number(tds[4].firstChild.value) * ((tds[1].firstChild.value === "Regular" || Number(g) === 0) ? 0 : (tds[1].firstChild.value === "Honors") ? 0.5 : 1);
                    break;
                }
            }
        }
        credits += Number(tds[4].firstChild.value);
    });
    gradeWeighted += gradeUnweighted;
    if (credits !== 0) {
        gpa.firstChild.innerHTML = Math.round(gradeUnweighted / credits * 100) / 100;
        gpa.lastChild.innerHTML = Math.round(gradeWeighted / credits * 100) / 100;
    }
}

// Set the grade to the Grade's Key
function setGradesKey() {
    gradesKey.innerHTML = "";
    let LToGPA;
    let LToP;
    if (plusMinus) {
        LToGPA = letterToGPA_PM;
        LToP = LetterToPercentage_PM;
    } else {
        LToGPA = letterToGPA;
        LToP = LetterToPercentage;
    }
    for (const letter in LToGPA) {
        const tr = document.createElement("tr");
        // Letter Grade
        const td1 = document.createElement("td");
        td1.innerHTML = letter;
        tr.appendChild(td1);
        // GPA
        const td2 = document.createElement("td");
        td2.innerHTML = LToGPA[letter];
        tr.appendChild(td2);
        // Percentage Grade
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
editGradeKey.addEventListener("click", () => {
    document.getElementsByClassName("gradeKeyEdit").item(0).style.display = "table";
    // Make Edit Grade's Key button invisible
    editGradeKey.parentElement.style.display = "none";
    // Make Reset Grade's Key to default button visible
    resetGradeKey.style.display = "block";
});

// Resets Grade's Key values
function resetGradesKey() {
    // + and -
    for (const letter in letterToGPA_PM) {
        letterToGPA_PM[letter] = {
            "A+": 4, "A": 4, "A-": 3.7,
            "B+": 3.3, "B": 3, "B-": 2.7,
            "C+": 2.3, "C": 2, "C-": 1.7,
            "D+": 1.3, "D": 1, "D-": 0.7,
            "F": 0
        }[letter];
        LetterToPercentage_PM[letter] = {
            "A+": { max: 100, min: 97 },
            "A": { max: 97, min: 93 },
            "A-": { max: 93, min: 90 },
            "B+": { max: 90, min: 87 },
            "B": { max: 87, min: 83 },
            "B-": { max: 83, min: 80 },
            "C+": { max: 80, min: 77 },
            "C": { max: 77, min: 73 },
            "C-": { max: 73, min: 70 },
            "D+": { max: 70, min: 67 },
            "D": { max: 67, min: 63 },
            "D-": { max: 63, min: 60 },
            "F": { max: 60, min: 0 }
        }[letter];
    }
    Object.assign(GPAToPercentage_PM, {});
    for (const GPA of ["4", "3.7", "3.3", "3", "2.7", "2.3", "2", "1.7", "1.3", "1", "0.7", "0"]) {
        GPAToPercentage_PM[GPA] = {
            "4": { max: 100, min: 93 },
            "3.7": { max: 93, min: 90 },
            "3.3": { max: 90, min: 87 },
            "3": { max: 87, min: 83 },
            "2.7": { max: 83, min: 80 },
            "2.3": { max: 80, min: 77 },
            "2": { max: 77, min: 73 },
            "1.7": { max: 73, min: 70 },
            "1.3": { max: 70, min: 67 },
            "1": { max: 67, min: 63 },
            "0.7": { max: 63, min: 60 },
            "0": { max: 60, min: 0 }
        }[GPA];
    }
    // No + and -
    for (const letter in letterToGPA) {
        letterToGPA[letter] = {
            "A": 4,
            "B": 3,
            "C": 2,
            "D": 1,
            "F": 0
        }[letter];
        LetterToPercentage[letter] = {
            "A": { max: 100, min: 90 },
            "B": { max: 90, min: 80 },
            "C": { max: 80, min: 70 },
            "D": { max: 70, min: 60 },
            "F": { max: 60, min: 0 }
        }[letter];
    }
    Object.assign(GPAToPercentage, {});
    for (const GPA of ["4", "3", "2", "1", "0"]) {
        GPAToPercentage[GPA] = {
            "4": { max: 100, min: 90 },
            "3": { max: 90, min: 80 },
            "2": { max: 80, min: 70 },
            "1": { max: 70, min: 60 },
            "0": { max: 60, min: 0 }
        }[GPA];
    }
    setGradesKey();
    plusMinusLetters();
}
resetGradeKey.addEventListener("click", resetGradesKey);

// Cancel Grade's Key Edit button
cancelGradeKeyEdit.addEventListener("click", () => {
    document.getElementsByClassName("gradeKeyEdit").item(0).style.display = "none";
    editGradeKeyWarn.style.display = "none";
    gradeKeyEditCheckBox.checked = plusMinus;
    // Make Edit Grade's Key button visible
    editGradeKey.parentElement.style.display = ""
    // Make Reset Grade's Key to default button invisible
    resetGradeKey.style.display = "none";
    plusMinusLetters();
});

// Save Grade's Key Edit button
saveGradeKeyEdit.addEventListener("click", () => {
    let previousLetter;
    let previousGPA;
    let previousMin;
    let stop = false;
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
            previousMin = parseInt(tds[2].lastChild.value);
            previousLetter = tds[0].innerHTML;
        }
        if (Number(tds[1].firstChild.value) > previousGPA) {
            // GPA at {letter} (GPA) is greater than {letter} (GPA)
            return editGradeKeyWarn.innerHTML = `GPA at ${tds[0].innerHTML} (${tds[1].firstChild.value}) is greater than ${previousLetter} (${previousGPA})`;
        } else if (parseInt(tds[2].lastChild.value) > previousMin) {
            // Maximum percentage at {letter} (percent) is greater than minimum percentage at {letter} (percent)
            return editGradeKeyWarn.innerHTML = `Maximum percentage at ${tds[0].innerHTML} (${tds[2].lastChild.value}) is greater than minimum percentage at ${previousLetter} (${previousMin})`;
        } else if (parseInt(tds[2].lastChild.value) !== previousMin) {
            // Maximum percentage at {letter} (percent) is not equal to minimum percentage at {letter} (percent)
            return editGradeKeyWarn.innerHTML = `Maximum percentage at ${tds[0].innerHTML} (${tds[2].lastChild.value}) is equal to minimum percentage at ${previousLetter} (${previousMin})`;
        } else if (parseInt(tds[2].firstChild.value) >= parseInt(tds[2].lastChild.value)) {
            // At {letter}, minimum percentage (percent) is greater than or equal to maximum percentage (percent)
            return editGradeKeyWarn.innerHTML = `At ${tds[0].innerHTML}, minimum percentage (${tds[2].firstChild.value}) is greater than or equal to maximum percentage (${tds[2].lastChild.value})`;
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
    // Make Edit Grade's Key button visible
    editGradeKey.parentElement.style.display = "";
    // Set all grades to the Grade's Key table// Make Reset Grade's Key to default button invisible
    resetGradeKey.style.display = "none";
    setGradesKey();
    // Changes grade status
    if (document.getElementsByClassName("selectedGrade").item(0).innerHTML === "Letter") {
        [...coursesDiv.children].forEach(tr => {
            tr.children.item(3).innerHTML = "";
            tr.children.item(3).appendChild(addGrade());
        });
    }
});