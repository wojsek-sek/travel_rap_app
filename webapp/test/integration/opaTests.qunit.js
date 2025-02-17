sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'zrap100ws7/test/integration/FirstJourney',
		'zrap100ws7/test/integration/pages/TravelList',
		'zrap100ws7/test/integration/pages/TravelObjectPage'
    ],
    function(JourneyRunner, opaJourney, TravelList, TravelObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('zrap100ws7') + '/test/flpSandbox.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTravelList: TravelList,
					onTheTravelObjectPage: TravelObjectPage
                }
            },
            opaJourney.run
        );
    }
);