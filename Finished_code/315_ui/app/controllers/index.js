$.buttongrid.init({
    buttons: [
        { id: 'write', title: "Notes", backgroundColor: 'gray', backgroundSelectedColor: 'lightgray' },
        { id: 'lightbulb', title: "Ideas" },
        { id: 'bubble', title: 'Chat' },
        { id: 'person', title: "People" },
        { id: 'pictures', title: "Pictures", click: function (e) { alert("Open the pictures window"); } }
    ],
    buttonWidth: Alloy.isTablet ? 200: 100,
    buttonHeight: Alloy.isTablet ? 200 : 100,
    backgroundColor: '#660000',
    backgroundSelectedColor: '#A30000',
    duration: 800
});

$.index.open();
