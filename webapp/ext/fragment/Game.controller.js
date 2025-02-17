sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress: function(oEvent) {
            let oText = sap.ui.getCore().byId('zrap100ws7::TravelList--fe::CustomTab::Game--scoreGame'); 
            let score = oText.getText().split('').filter(char => !isNaN(char) && char !== ' ').join('');
            score = parseInt(score) + 1;
            oText.setText(`Score : ${score}`)
        }, 
        onStart: function(oEvent) { 
            let oText = sap.ui.getCore().byId('zrap100ws7::TravelList--fe::CustomTab::Game--scoreGame'); 
            let oButtonGame = sap.ui.getCore().byId('zrap100ws7::TravelList--fe::CustomTab::Game--gameButton');
            let oEndButton = sap.ui.getCore().byId('zrap100ws7::TravelList--fe::CustomTab::Game--buttonEnd')
            oButtonGame.start();
            oEvent.getSource().setVisible(false);
            oEndButton.setVisible(true); 
            oText.setText(`Score : 0`)
        },
        onEnd: function(oEvent) { 
            let oButtonGame = sap.ui.getCore().byId('zrap100ws7::TravelList--fe::CustomTab::Game--gameButton');
            let oEndButton = sap.ui.getCore().byId('zrap100ws7::TravelList--fe::CustomTab::Game--buttonStart')
            oButtonGame.end();
            oEvent.getSource().setVisible(false);
            oEndButton.setVisible(true); 
        },

    };
});
