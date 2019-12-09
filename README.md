<p>Title of Project: LitterTracker</p> <br/>
<p>Description of Project: Helps visually represent how efficiently cleaning is being done throughout PGC </p><br/>
<p>Link to App: https://littertracker.herokuapp.com/ </p><br/>
<p>Target Browsers: Google Chrome, Mozilla Firefox, Safari, Microsoft Edge </p><br/>
<p>Link to User Manual: https://github.com/curtisellison/finalproject377/blob/master/docs/user.md </p><br/>
<p>Link to Developer Manual: See below. </p><br/>

# Developer Manual
<h1>How to install application and all dependencies</h1>
  <ol>
    <li>Download the source code from GitHub</li>
      <ul>git clone "https://github.com/curtisellison/finalproject377.git</ul>
    <li>Install npm for your specific OS</li>
      <ul> https://nodejs.org/en/download/ </ul>
    <li>Execute npm install command</li>
  </ol>
<h1>How to run application on a server </h1>
  <ol>
    <li>Execute npm start command</li>
    <li>Open browser and connect to the local host</li>
  </ol>
<h1>How to run tests </h1>
  <ol>
    <li>Executing npm start will test the application and return back any errors before launching it</li>
  </ol>
<h1>The API for the server application </h1>  
  <ol>
    <li>To return all of the data points</li>
      <ul> http://localhost/api </ul>
    <li>To return all of the organizations</li>
      <ul> http://localhost/api/organization </ul>
    <li>To return the organization that matches the filter (Below is DOC org example)</li>
      <ul> http://localhost/api/organization?filter=DOC </ul>
  </ol>
<h1>Any expectations around known bugs and road-map for future development </h1>
  <p>There are no known bugs right now. Future development would spread our map to other counties, which may cause a bug
  if the map becomes too large. It would be bad if the map was so big that the user could not distinguish any of the litter points. </p>
