# Salesforce Soundboard (Experience Cloud)

![mainpage](assets/Screen%20Shot%202023-05-14%20at%208.25.10%20PM.png)

## Overview


#### Community Soundboard is a web application built on the Salesforce Experience Cloud using Lightning Web Components (LWC) and Apex. It allows users to create, share, use sound clips on their own soundboard, plus search for and add sounds created by other users. 



---

## Features

* User authentication as a community user
* Sound creation: users can upload an audio file and an image to create a sound clip that can be added to their own soundboard and shared with others
* Sound lookup: users can search for sounds added by other users to add to their own soundboard
* Soundboard management: users can view, play, and delete sounds on their own soundboard


---

## Technical Specification

#### The interface of the app is built using Lightning Web Components (LWC) and is divided into smaller components for better modularity and maintainability. The main component orchestrates the other components and implements the most important logic of the application. The app also utilizes Apex controllers for different functionalities, including searching for audio clips, retrieving related audio clips for the soundboard, and creating new audio records. This creation process also involves the creation of a content distribution object to make the audio available to the public, and organizing the media into their respective libraries based on their type. These Apex controllers allow for efficient and optimized execution of these functionalities while adhering to Salesforce development best practices.

---

## Screenshots

Login Screen:

![Login Screen](assets/Screen%20Shot%202023-05-14%20at%209.07.29%20PM.png)

Sound Creation:

![Sound Creation](assets/Screen%20Shot%202023-05-14%20at%208.19.29%20PM.png)

Searching:

![Searching](assets/Screen%20Shot%202023-05-14%20at%208.19.21%20PM.png)

---

### Contributing

#### None

---

### Questions

#### https://github.com/nickmighty

---

### License 

#### MIT

---

