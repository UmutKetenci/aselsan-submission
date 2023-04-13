Demo: https://splendorous-pavlova-67181b.netlify.app/

**Documentation**:

**1) Prerequisites:**

You need a running device with a resolution 1920x1080 (not responsive for other sizes yet). <br/>
Node.js version 14 or higher (you can download it from https://nodejs.org)<br/>
You need a IDE such as WebStorm or Visual Studio Code. Both are tested and both works for this application. <br/>
Note: After following the steps above, if the app does not run IDE Eslint strictions may be preventing your code from running locally giving warnings or errors.

**2) Installation:**

Clone the project from the Git repository using the command: **git clone https://github.com/UmutKetenci/aselsan-submission.git**
Navigate to the project directory in your terminal using the command: **cd project-name**

Run the command **npm install** to install all the dependencies specified in the package.json file.

**3) Running the app:**

Once the installation is completed, run the command **npm start** in the terminal. This will start the development server and open the app in your default browser.
If the app doesn't open in your browser, you can access it by opening your browser and typing http://localhost:3000 in the address bar.

**4) Building the app:**

To build the app for production, run the command **npm run build**. This will create an optimized production build in the build folder.
You can then deploy the contents of the build folder to your web server or hosting service.

**5) About the app:**

This is a vending machine application and it is coded using React, TypeScript and Redux.

The vending machine state consists of the following properties:

balance: the current amount of money inserted by the customer <br/>
products: an array of products available in the vending machine <br/>
selectedProduct: the currently selected product by the customer <br/>
refundAmount: the amount of money that will be refunded if the process is canceled <br/>
earnedMoney: the amount of money earned by the vending machine <br/>
time: the time elapsed since the vending machine was last reset <br/>
lastTimeSinceMoneyAccept: the last time money was accepted by the machine; </br>

The vending machine actions are defined in the VendingMachineActionTypes enum, and they are:

SELECT_PRODUCT: selects a product based on its id <br/>
ACCEPT_MONEY: accepts money from the customer <br/>
COMPLETE_PURCHASE: completes the purchase of the selected product <br/>
CANCEL_PROCESS: cancels the current process and refunds the money <br/>
COLLECT_MONEY: collects the earned money from the vending machine <br/>
RESET_MACHINE: resets the vending machine <br/>
INCREASE_TIME: increases the elapsed time <br/>
DECREASE_PRODUCT_TEMPERATURE = Decreases slot's temperature to desired value. </br>
INCREASE_PRODUCT_TEMPERATURE = Increases slot's temperature to desired value. </br>

The vendingMachineReducer function is responsible for updating the vending machine state based on the actions dispatched to the store. The reducer function takes two arguments: the current state and the action to be performed. The function returns a new state object with the updated values.

The VendingMachineActions type is a union type of all possible action types in the vending machine, and each action has a corresponding interface defining the payload that is needed for the action.

The initialVendingMachineState object defines the initial state of the vending machine, including the available products, their quantities, and prices.

Repeated money insertions are not allowed as it is detected as scam. You have to wait a second before inserting another unit money.

EnergyState is responsible for keeping track of consume rates of components such as lighting, button interactions and cooling/heating.

TemperatureState manages the state of a temperature control feature in a web application. The TemperatureState interface defines the shape of the state object, which has three properties: temperature, isOverheating, and selectedTemperatureCelsius.

The initialTemperatureState object is the initial state of the application. It sets the default values of the state properties to 25, true, and 20, respectively.

The enum called TemperatureTypes defines two action types: COOLING and HEATING.

The DecreaseTemperatureAction and IncreaseTemperatureAction interfaces represent the two types of actions that can be dispatched to the reducer. The DecreaseTemperatureAction has a type of COOLING, while the IncreaseTemperatureAction has a type of HEATING.

The temperatureReducer function is the Redux reducer function that takes in the current state and an action, and returns a new state based on the action type.

If the action type is COOLING, it checks if the current temperature is higher than the selected temperature, and if so, it reduces the temperature by 1 and sets isOverheating to true. If the temperature is already lower than the selected temperature, it only reduces the temperature by 1 and sets isOverheating to false.

If the action type is HEATING, it checks if the current temperature is lower than the selected temperature. If so, it increases the temperature by 1 and sets isOverheating to false. If the temperature is already higher than the selected temperature, it only increases the temperature by 1 and sets isOverheating to true.

The decreaseTemperature and increaseTemperature functions are action creator functions, which create and return actions of the corresponding types.

This code is to implement a basic temperature control feature, where the user can select a desired temperature in Celsius and the system will either heat or cool the vending machine to maintain that temperature.

Temperature increases every time an interaction is made with the machine.

Interactions are defined as actions where user clicks a blue button.

The code also imports the createStore and combineReducers functions from Redux and the toast function from the react-toastify library.

**6) Usage Scenario:** <br/> 

User inserts money by clicking the money blocks that is below the vending machine. <br/>
User selects a number to select a product respectively. <br/>
User clicks OK button.If user has enough money, they receive the item. Else app gives a warning according to the error. <br/>
User may cancel the process and refund their money by using CANCEL button. <br/>
User may reset the machine by using RESET button. <br/>
User may collect money from the vending machine using COLLECT MONEY button. <br/>

**7) Tests:** <br/> 

Basic tests are written for the application.

