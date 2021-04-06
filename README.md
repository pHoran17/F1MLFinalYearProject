# F1MLFinalYearProject
Machine Learning Application created using React Native and Python

## How to Install F1ML
Currently this applicationis only available for android devices

An APK for this application has been included in the root of this repository
To install this APK on an android device from this repository, please ensure that the ability to install apps from Unknown sources is enabled.
This option can be found in the Settings menu under Security.
Once this option is enabled, open the apk in your file manager of choice

Alternatively the application can be installed using Android Debug Bridge (ADB) with the command : 
adb install F1ML-e409a95b6c4544b4901eb653538c1b3d-signed.apk

## How to use F1ML
When F1ML is opened you will be presented with the start screen. In order to see the core features of this application, you will be required to either register or to login into an existing account. You can choose to do whatever task is required by pressing either the register button or login button

Once you have been signed in, you will be presented with the Main Screen. This screen displays a countdown timer for the next race in the 2021 F1 season and the results for the last completed F1 race. On this screen you have the option to change to other screens. You can change to the Results Screen or the Predictions Screen. You will also have the option to log out of the application by pressing the logout button which is located in the screen's header. This will return you to the Start Screen.

When navigating to the Predictions Screen, the resulting prediction data from the Multiple Linear Regression machine learning model will be displayed. This data shows which drivers were predicted to win podium positions in the 2020 F1 season and shows the actual number of podiums that each driver achieved in the season for comparison. The previously mentioned logout button will be available to use on this screen alongside a new button on the left side of the header for navigating back to the previously used screen. 

Upon pressing the results button, you will be sent to the results screen. This screen allows you to view race results for every F1 race from 1950 to 2020. The dropdown picker can be used to choose a specific race. Doing so will display the results for the chosen race. You can choose to log out or go back to the previous screen by using the relevant buttons contained within the header of the screen. 



