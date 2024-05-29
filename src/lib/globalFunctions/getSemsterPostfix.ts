export function getSemesterNPostfix (semester : string, lang : string) : string {
    return semester + getSemesterPostfix(semester, lang);
}

function getSemesterPostfix (semester : string, lang : string) : string {
    console.log("LANGGG: " + lang);
    if (lang == "el")
        return "ο ";
    if (semester == "1")
        return "st ";
    else if (semester == "2")
        return "nd ";
    else
        return "th ";
}