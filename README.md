
<h1 align="center">SeeTheSteps Algorithm Visualization Web Application</h1>
<p align="center">
<img height="400px" src="https://raw.githubusercontent.com/eBucher/algorithmWebsite/assets/websitePreview.gif"/>
</p>
<br/>

SeeTheSteps is a web application in development that allows users to visualize different computer science algorithms right in their browser. Unlike reading a textbook or watching a tutorial on Youtube, this program provides an interactive way for users to be able to see how any input would be handled by an algorithm that they are learning. This can be used as a supplementary tool for individual learning or teaching others.

## Features
* The user can enter any input that they want so that they are not limited to specific examples.
* As different steps of the algorithm are visualized, the page also shows pseudocode and highlights which step the algorithm is on. Next to it, there is also an explanation in plain English about what is currently happening.
* The user can move forward and backwards through the algorithm and can easily jump to different steps.
* Want to share a visualization or quickly come back to one? Links can be generated for sharing the current algorithm and its input.
<img border="1px" height="130px" src="https://raw.githubusercontent.com/eBucher/algorithmWebsite/assets/linkPreview.gif"/>

## Development

### Languages and major libraries used

* Javascript (ES6)
* React (16.3.2)
* Redux
* Semantic UI
* Jest
* HTML/CSS

### Initial Setup
After cloning this project for the first time, the dependencies need to be downloaded. To do this, run **npm install** from the frontend folder. If there are any updates to the repository that require new dependencies, running this command will install them to your local project.

### Deploying the test server
From the frontend directory, run **npm start** to initialize the app for testing and development. By default, the app can be opened in a browser at *localhost:3000*.

### Documentation
Documentation for each class can be found in its respective file. A styling guide has been built using [React Styleguidist] to provide examples and documentation for most components. This guide can be opened by running **npm styleguidist sever** from the command line in the frontend folder. The default address that it will be available on is *localhost:8080*.

### Tests
Tests can be started by running **npm test** from the frontend folder. If the command line is left open, any time a test or file being import by a test is changed, the tests that use that file will be rerun.

### Future direction
Currently, the main goal is to add more algorithm pages that are similar in functionality to ones that are already built (where the user can enter input, the display is generated, and then the user can step through the steps). For some future algorithms that are more closely related to graph theory, it would be beneficial to be able to allow the user to move around elements in the display area.

## Authors
* Erich Bucher

Additional credit goes to all of the authors of the libraries that are being used in this project.
