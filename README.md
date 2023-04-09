Prerequisites:

Node.js version 14 or higher (you can download it from https://nodejs.org)

You need a running computer as it is designed for computers (not responsive for other sizes yet.).

Installation:

Clone the project from the Git repository using the command: git clone https://github.com/UmutKetenci/aselsan-submission.git

Navigate to the project directory in your terminal using the command: cd <project-name>

Run the command npm install to install all the dependencies specified in the package.json file.

Running the app:

Once the installation is completed, run the command npm start in the terminal. This will start the development server and open the app in your default browser.

If the app doesn't open in your browser, you can access it by opening your browser and typing http://localhost:3000 in the address bar.

Building the app:

To build the app for production, run the command npm run build. This will create an optimized production build in the build folder.

You can then deploy the contents of the build folder to your web server or hosting service.


Application code is a TypeScript implementation of a vending machine using Redux.

The vending machine state consists of the following properties:

balance: the current amount of money inserted by the customer
products: an array of products available in the vending machine
selectedProduct: the currently selected product by the customer
refundAmount: the amount of money that will be refunded if the process is canceled
earnedMoney: the amount of money earned by the vending machine
time: the time elapsed since the vending machine was last reset
The vending machine actions are defined in the VendingMachineActionTypes enum, and they are:

SELECT_PRODUCT: selects a product based on its id
ACCEPT_MONEY: accepts money from the customer
COMPLETE_PURCHASE: completes the purchase of the selected product
CANCEL_PROCESS: cancels the current process and refunds the money
COLLECT_MONEY: collects the earned money from the vending machine
RESET_MACHINE: resets the vending machine
INCREASE_TIME: increases the elapsed time
The vendingMachineReducer function is responsible for updating the vending machine state based on the actions dispatched to the store. The reducer function takes two arguments: the current state and the action to be performed. The function returns a new state object with the updated values.

The VendingMachineActions type is a union type of all possible action types in the vending machine, and each action has a corresponding interface defining the payload that is needed for the action.

The initialVendingMachineState object defines the initial state of the vending machine, including the available products, their quantities, and prices.

The code also imports the createStore and combineReducers functions from Redux and the toast function from the react-toastify library.
