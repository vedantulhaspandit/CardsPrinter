#CardsPrinter
* The NodeJS app will read a given set of student records from a JSON file and on the user's command, will pass on this data across Apache  Apollo to a subscribing Python app (Python script).
* The python app will process the data and then generate membership cards as jpeg images. 
* As these jpeg images are being generated their corresponding file names and the student data are sent back to our Node.js app in real-time and the same are dynamically displayed in the user-interface using Socket.io . 
* This app demonstrates the interoperability between a Node.js app and the Python script and the same process can be used in any Enterprise Integartion scenario.

#Additional Information
The App leverages the power of:
* Hapi.js:- Framework for Node.js
* Inert and vision:- For rendering of views in HTML
* Stomp-Client:- For interacting with the Message Broker
* Socket.io:- For implementing WebSockets
* Apache Apollo(Message Broker):- To provide message binding between two different applications written in two different platforms

#Architecture
![12](https://cloud.githubusercontent.com/assets/15076889/18174437/6ba53710-7022-11e6-97d1-e3b279ee927f.png)

#Pre-requisites:
* Latest version of Node.js
* Nodemon installed
* Latest version of Python
* Latest version of Apache Apollo
* Latest version of Java 

#Installation
* To run the app, first install the dependencies (in package.json) with NPM.

```bash
npm install
``` 
#Steps for deployment 
In order to deploy the app you will need three seperate instances of Apache Apollo, NodeJS app, Python script
1. Open the Command prompt and browse into the **apollo** folder formed after installing apache apollo. Go inside the **broker** folder which is in **apollo** folder and type:
```bash
   ../apacheapollo/apache-apollo-1.7.1/bin apache create brokerbot
``` 
This command will create an instance of the broker called as broker bot inside the broker folder.
To start the broker instance type:
```bash
 ./bin/apollo-broker run
```
Access  http://127.0.0.1:61680/ to create a new user and password.
After accessing the Apache Apollo Interface create two instances of the queue - **toPython** and **fromPython**
![a](https://cloud.githubusercontent.com/assets/15076889/18174502/ac01154a-7022-11e6-88d6-43e2b01590b5.png)

2. Go to lacation where node folder is there, and in a new command prompt, type **nodemon** to start node app.
This will start the NodeJS app.and when properly connected to the Apache Apollo broker would write **Connected to Apollo** to the Console
![b](https://cloud.githubusercontent.com/assets/15076889/18174542/c06db61e-7022-11e6-9ce3-c9124284d23e.png)

3. Start the Python Script in the command prompt as shown:
![c](https://cloud.githubusercontent.com/assets/15076889/18174545/c63e572e-7022-11e6-8f21-f1b4b5de60d7.png)

4. Front End Interface after step 2:
![d](https://cloud.githubusercontent.com/assets/15076889/18174547/c819ac56-7022-11e6-9896-73b0cdd55330.png)

5. After the Process cards button is pressed the cards are processed in real time by the python script and shown at the front-end interface in real-time: 
![e1](https://cloud.githubusercontent.com/assets/15076889/18174554/cbf70e68-7022-11e6-8baa-a748d76b7408.png)
   
   Also at back end,
![e2](https://cloud.githubusercontent.com/assets/15076889/18174557/cfd66272-7022-11e6-9614-af6030ff1591.png)

6. The final card generated is stored in output folder and can be viewed using view card:
![f](https://cloud.githubusercontent.com/assets/15076889/18174565/d6a4c88c-7022-11e6-8549-9c6db78ac5bf.png)

