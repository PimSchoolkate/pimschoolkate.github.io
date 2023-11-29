document.addEventListener("DOMContentLoaded", function() {
    console.log("Navbar script loaded"); // Check if script is loading

    var path = window.location.pathname;
    console.log("Current path: " + path); // Log the path

    function pathContains(directory) {
        return path.includes('/' + directory + '/');
    }

    if (pathContains('curriculum-vitae')) {
        console.log("In CV directory");
        document.getElementById('nav-cv').classList.add('active');
    } else if (pathContains('projects')) {
        console.log("In Projects directory");
        document.getElementById('nav-projects').classList.add('active');
    } else if (pathContains('education')) {
        console.log("In Education directory");
        document.getElementById('nav-education').classList.add('active');
    }
});