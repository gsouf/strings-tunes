GuitarMate.system.chromatic = (function(GuitarMate){
    var o = {};

    o.Key = {};
    o.Key.C  = new GuitarMate.Key("C");
    o.Key.CA = new GuitarMate.Key("C#");
    o.Key.D  = new GuitarMate.Key("D");
    o.Key.DA = new GuitarMate.Key("D#");
    o.Key.E  = new GuitarMate.Key("E");
    o.Key.F  = new GuitarMate.Key("F");
    o.Key.FA = new GuitarMate.Key("F#");
    o.Key.G  = new GuitarMate.Key("G");
    o.Key.GA = new GuitarMate.Key("G#");
    o.Key.A  = new GuitarMate.Key("A");
    o.Key.AA = new GuitarMate.Key("A#");
    o.Key.B  = new GuitarMate.Key("B");


    o.Ival = {};
    
    o.Ival.Tonic = new GuitarMate.Ival(
        "F","tonic");
        
    o.Ival.SecondMinor = new GuitarMate.Ival(
        "2-","second-minor",[]);
        
    o.Ival.Second = new GuitarMate.Ival(
        "2","second");
        
    o.Ival.ThirdMinor = new GuitarMate.Ival(
        "3-","third");
        
    o.Ival.Third = new GuitarMate.Ival(
        "3","third-major");
        
    o.Ival.Quart = new GuitarMate.Ival(
        "4","quart");
        
    o.Ival.QuintMinor = new GuitarMate.Ival(
        "5-","quint-minor");
        
    o.Ival.Quint = new GuitarMate.Ival(
        "5","quint");
        
    o.Ival.SixthMinor = new GuitarMate.Ival(
        "6-","sixth-minor");
        
    o.Ival.Sixth = new GuitarMate.Ival(
        "6","sixth");
        
    o.Ival.Seventh = new GuitarMate.Ival(
        "7","seventh");
        
    o.Ival.SeventhMajor = new GuitarMate.Ival(
        "7M","seventh-major");


    
    var ivalOrder = [
       o.Ival.Tonic,
       o.Ival.SecondMinor,
       o.Ival.Second,
       o.Ival.ThirdMinor,
       o.Ival.Third,
       o.Ival.Quart,
       o.Ival.QuintMinor,
       o.Ival.Quint,
       o.Ival.SixthMinor,
       o.Ival.Sixth,
       o.Ival.Seventh,
       o.Ival.SeventhMajor
    ];


    var keyOrder = [
        o.Key.C,
        o.Key.CA,
        o.Key.D,
        o.Key.DA,
        o.Key.E,
        o.Key.F,
        o.Key.FA,
        o.Key.G,
        o.Key.GA,
        o.Key.A,
        o.Key.AA,
        o.Key.B
    ];
    
    var chromaticSystem  = new GuitarMate.System(ivalOrder,keyOrder);


    // MAJOR SCALE
    var majorScale = new GuitarMate.Scale("Major", [
        o.Ival.Tonic,
        o.Ival.Second,
        o.Ival.Third,
        o.Ival.Quart,
        o.Ival.Quint,
        o.Ival.Sixth,
        o.Ival.SeventhMajor
    ],[
        "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolidian", "Aeolian", "Locryan"
    ]);
    chromaticSystem.addScale(majorScale);

    // PENTATONIC SCALE
    var pentatonicScale = new GuitarMate.Scale("Pentatonic", [
        o.Ival.Tonic,
        o.Ival.Third,
        o.Ival.Quart,
        o.Ival.Quint,
        o.Ival.Seventh
    ],[
        "Major", "Suspended", "Man Gong", "Ritusen", "Minor"
    ]);
    chromaticSystem.addScale(pentatonicScale);
    chromaticSystem.Key = o.Key;

    return chromaticSystem;
})(GuitarMate);