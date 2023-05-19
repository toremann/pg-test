function showAPIDocs() {
    var apiDocs = document.getElementById("api-docs");
    var jobList = document.getElementById("job-list");
    var about = document.getElementById("about");
    if (apiDocs.style.display === "none") {
      apiDocs.style.display = "block";
      jobList.style.display = "none";
      about.style.display = "none";
    } else {
      apiDocs.style.display = "none";
      jobList.style.display = "block";
      about.style.display = "none";
    }
  }
  
  function showAbout() {
    var apiDocs = document.getElementById("api-docs");
    var jobList = document.getElementById("job-list");
    var about = document.getElementById("about");
    if (about.style.display === "none") {
      apiDocs.style.display = "none";
      jobList.style.display = "none";
      about.style.display = "block";
    } else {
      apiDocs.style.display = "none";
      jobList.style.display = "block";
      about.style.display = "none";
    }
  }