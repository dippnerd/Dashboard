# Dashboard
Dashboard for home automation display and control

<img src="dashboard.png" width="80%" alt="header image">

## Outline
Ideally this dashboard will provide a modular means of not only displaying useful data (weather, device status) but providing interactivity for home automation including lights/scenes, music (playback and source control) and other things. Building this dashboard in a modular sense should allow complete control over what buttons to display, what they do (load a page, trigger an action) and offer expandability for features beyond what is already present. 

My initial plans are to at least include a weather module (Forecast.io API), support for lights (Philips Hue) and specific scenes, as well as music control (iTunes initially, with support for changing playlists, tracks, volume and AirPlay sources). I have a crude model working for weather and music so far, but nothing is modular at this point. The size has been optimized for running on an iPad Mini display, but I plan to make it more flexible for resizing to different demands. The main goal is for a screen as small as the iPad Mini to be as easy to read from a distance as possible and not be too cluttered as is easy to do. 

So far this project is written in Node.JS using Express and Handlebars, but I'm open to suggestions if these are less than ideal for the scope of this project.

## Components
Components aren't currently written in the most practical modular sense, they are just individual pages loaded by referencing their URL. Ideally this will change to be one page that is loaded along with all components, the buttons will simply change what content is displayed (but already loaded). This should help reduce noticeable lag when changing pages. 

Currently the following components are available:
- Weather (uses Forecast.IO API, some tweaks to the screenshot above are in progress to give better insight on the next 24 hours)
- Music (currently implemented using [iTunes-Remote](https://github.com/Siddharth11/iTunes-Remote/))
- Lights (this component is in the works, aiming specifically at Philips Hue, ideally with support for individual light controls as well as scene triggers)

The buttons on the left will eventually be modular, with a visual differentiator for pages vs actions (currently the bottom 3 with blue indicators are for scene triggers). Action buttons are intended to trigger scenes, respective to whatever platform can be tied in. Scenes ideally will not be limited just to light scenes but rather include a spectrum of devices that all trigger with the same scene. 
