$(document).ready(function () {

    
    var date = new Date('2013-01-25'); //    YYYY-MM-DD
    var minDate = new Date('1993-06-17'); //    first day records: 1993-06-17
    var maxDate = new Date('2015-02-10'); //    last day records: 2015-02-10

    var loo;
    
    var ip = "192.168.1.104"; // ip of server with skyAerosol API
    var port = "1337"; // port of server with skyAerosol API
    
    // init the map

    var map = new Datamap({
        element: document.getElementById('container'),
        responsive: true,
//        width: 300,
//        heiht: 400,
        fills: {
            defaulFill: '#303030',
            lvl0: '#B0B0B0', // no data
            lvl1: '#BFFF00',
            lvl2: '#FFFF00',
            lvl3: '#FF9E00',
            lvl4: '#F50000',
        },
        bubblesConfig: {
            borderWidth: 2,
            borderColor: '#000000',
            popupOnHover: true,
            popupTemplate: function (geography, data) {
                return '&lt;div class="hoverinfo"&gt;&lt;strong&gt;' + data.name + '&lt;/strong&gt;&lt;/div&gt;';
            },
            fillOpacity: 0.75,
            highlightOnHover: true,
            highlightFillColor: '#FC8D59',
            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            highlightBorderWidth: 3,
            highlightFillOpacity: 0.85
        },
        geographyConfig: {
            hideAntarctica: false,
            borderWidth: 1,
            borderColor: '#303030'
                //        borderColor: '#FDFDFD'
        }
    });

    $(window).on('resize', function () {
        map.resize();
    });

    function drawPoints(data, date) {
        console.log(data);
        var datos = [];
        for (var i = 0; i < data.length; i++) {
            var dato = {};

            data[i].longitude = data[i].long;
            data[i].latitude = data[i].lat;
            data[i].radius = "10";
//            console.log(data[i]['870-440AngstromParam.[AOTExt]-Total']);
            var ang = data[i]['870-440AngstromParam.[AOTExt]-Total'];
            data[i].fillKey = ang != 'N/A' ? ang < 0.5 ? 'lvl1' : ang >= 0.5 && ang < 1 ? 'lvl2' : ang >= 1 && ang < 1.5 ? 'lvl3' : 'lvl4' : 'lvl0';
//            data[i].fillKey = 
        }
        map.bubbles(data, {
            popupTemplate: function (geo, data) {
                tem();
                return [
                        '<div class="hoverinfo">Location: ' + data.Locations,
                            '<br/>PI: ' + data.PI,

// Esto de sacar aquí los datos de esta manera hay que cambiarlo por algo más elegante

                        '<br/>Longitude: ' + data['longitude'],
                        '<br/>Latitude: ' + data['latitude'],
                        '<br/><strong>AOT_1640: </strong>' + data['AOT_1640'],
                        '<br/><strong>870-440AngstromParam.[AOTExt]-Total: </strong>' + data['870-440AngstromParam.[AOTExt]-Total'],
                        '<br/><strong>N[870-440AngstromParam.[AOTAbsp]-Total]: </strong>' + data['N[870-440AngstromParam.[AOTAbsp]-Total]'],
                        '<br/><strong>870-440AngstromParam.[AOTAbsp]: </strong>' + data['870-440AngstromParam.[AOTAbsp]'],

                        '<br/>AOTExt1022-C: ' + data['AOTExt1022-C'] + '  0.05: ' + data['0.05'] + '  VolCon-C: ' + data['VolCon-C'] + '  N[AOT_555]: ' + data['N[AOT_555]'] + '  N[AOTAbsp868-T]: ' + data['N[AOTAbsp868-T]'] + '  N[0.439173]: ' + data['N[0.439173]'] + '  N[UpwardFlux](BOA): ' + data['N[UpwardFlux](BOA)'],
'<br/>latitude: ' + data['latitude'] + '  870-440AngstromParam.[AOTExt]-Total: ' + data['870-440AngstromParam.[AOTExt]-Total'] + '  0.065604: ' + data['0.065604'] + '  EffRad-C: ' + data['EffRad-C'] + '  N[AOT_551]: ' + data['N[AOT_551]'] + '  N[AOTAbsp1022-T]: ' + data['N[AOTAbsp1022-T]'] + '  N[0.576227]: ' + data['N[0.576227]'] + '  N[UpwardFlux](TOA): ' + data['N[UpwardFlux](TOA)'],
'<br/>elev: ' + data['elev'] + '  SSA440-T: ' + data['SSA440-T'] + '  0.086077: ' + data['0.086077'] + '  VolMedianRad-C: ' + data['VolMedianRad-C'] + '  N[AOT_532]: ' + data['N[AOT_532]'] + '  N[870-440AngstromParam.[AOTAbsp]-Total]: ' + data['N[870-440AngstromParam.[AOTAbsp]-Total]'] + '  N[0.756052]: ' + data['N[0.756052]'] + '  N[RadiativeForcing](BOA): ' + data['N[RadiativeForcing](BOA)'],
'<br/>AOT_1640: ' + data['AOT_1640'] + '  SSA675-T: ' + data['SSA675-T'] + '  0.112939: ' + data['0.112939'] + '  StdDev-C: ' + data['StdDev-C'] + '  N[AOT_531]: ' + data['N[AOT_531]'] + '  N[REFR(440)]: ' + data['N[REFR(440)]'] + '  N[0.991996]: ' + data['N[0.991996]'] + '  N[RadiativeForcing](TOA): ' + data['N[RadiativeForcing](TOA)'],
'<br/>AOT_1020: ' + data['AOT_1020'] + '  SSA868-T: ' + data['SSA868-T'] + '  0.148184: ' + data['0.148184'] + '  Altitude(BOA)(km): ' + data['Altitude(BOA)(km)'] + '  N[AOT_500]: ' + data['N[AOT_500]'] + '  N[REFR(675)]: ' + data['N[REFR(675)]'] + '  N[1.301571]: ' + data['N[1.301571]'] + '  N[ForcingEfficiency](BOA): ' + data['N[ForcingEfficiency](BOA)'],
'<br/>AOT_870: ' + data['AOT_870'] + '  SSA1022-T: ' + data['SSA1022-T'] + '  0.194429: ' + data['0.194429'] + '  Altitude(TOA)(km): ' + data['Altitude(TOA)(km)'] + '  N[AOT_490]: ' + data['N[AOT_490]'] + '  N[REFR(868)]: ' + data['N[REFR(868)]'] + '  N[1.707757]: ' + data['N[1.707757]'] + '  N[ForcingEfficiency](TOA): ' + data['N[ForcingEfficiency](TOA)'],
'<br/>AOT_675: ' + data['AOT_675'] + '  AOTAbsp440-T: ' + data['AOTAbsp440-T'] + '  0.255105: ' + data['0.255105'] + '  DownwardFlux(BOA): ' + data['DownwardFlux(BOA)'] + '  N[AOT_443]: ' + data['N[AOT_443]'] + '  N[REFR(1022)]: ' + data['N[REFR(1022)]'] + '  N[2.240702]: ' + data['N[2.240702]'] + '  N[DownwardFlux440-T]: ' + data['N[DownwardFlux440-T]'],
'<br/>AOT_667: ' + data['AOT_667'] + '  AOTAbsp675-T: ' + data['AOTAbsp675-T'] + '  0.334716: ' + data['0.334716'] + '  DownwardFlux(TOA): ' + data['DownwardFlux(TOA)'] + '  N[AOT_440]: ' + data['N[AOT_440]'] + '  N[REFI(440)]: ' + data['N[REFI(440)]'] + '  N[2.939966]: ' + data['N[2.939966]'] + '  N[DownwardFlux675-T]: ' + data['N[DownwardFlux675-T]'],
'<br/>AOT_555: ' + data['AOT_555'] + '  AOTAbsp868-T: ' + data['AOTAbsp868-T'] + '  0.439173: ' + data['0.439173'] + '  UpwardFlux(BOA): ' + data['UpwardFlux(BOA)'] + '  N[AOT_412]: ' + data['N[AOT_412]'] + '  N[REFI(675)]: ' + data['N[REFI(675)]'] + '  N[3.857452]: ' + data['N[3.857452]'] + '  N[DownwardFlux868-T]: ' + data['N[DownwardFlux868-T]'],
'<br/>AOT_551: ' + data['AOT_551'] + '  AOTAbsp1022-T: ' + data['AOTAbsp1022-T'] + '  0.576227: ' + data['0.576227'] + '  UpwardFlux(TOA): ' + data['UpwardFlux(TOA)'] + '  N[AOT_380]: ' + data['N[AOT_380]'] + '  N[REFI(868)]: ' + data['N[REFI(868)]'] + '  N[5.061260]: ' + data['N[5.061260]'] + '  N[DownwardFlux1022-T]: ' + data['N[DownwardFlux1022-T]'],
'<br/>AOT_532: ' + data['AOT_532'] + '  870-440AngstromParam.[AOTAbsp]: ' + data['870-440AngstromParam.[AOTAbsp]'] + '  0.756052: ' + data['0.756052'] + '  RadiativeForcing(BOA): ' + data['RadiativeForcing(BOA)'] + '  N[AOT_340]: ' + data['N[AOT_340]'] + '  N[REFI(1022)]: ' + data['N[REFI(1022)]'] + '  N[6.640745]: ' + data['N[6.640745]'] + '  N[UpwardFlux440-T]: ' + data['N[UpwardFlux440-T]'],
'<br/>AOT_531: ' + data['AOT_531'] + '  REFR(440): ' + data['REFR(440)'] + '  0.991996: ' + data['0.991996'] + '  RadiativeForcing(TOA): ' + data['RadiativeForcing(TOA)'] + '  N[Water(cm)]: ' + data['N[Water(cm)]'] + '  N[ASYM440-T]: ' + data['N[ASYM440-T]'] + '  N[8.713145]: ' + data['N[8.713145]'] + '  N[UpwardFlux675-T]: ' + data['N[UpwardFlux675-T]'],
'<br/>AOT_500: ' + data['AOT_500'] + '  REFR(675): ' + data['REFR(675)'] + '  1.301571: ' + data['1.301571'] + '  ForcingEfficiency(BOA): ' + data['ForcingEfficiency(BOA)'] + '  N[AOTExt440-T]: ' + data['N[AOTExt440-T]'] + '  N[ASYM675-T]: ' + data['N[ASYM675-T]'] + '  N[11.432287]: ' + data['N[11.432287]'] + '  N[UpwardFlux868-T]: ' + data['N[UpwardFlux868-T]'],
'<br/>AOT_490: ' + data['AOT_490'] + '  REFR(868): ' + data['REFR(868)'] + '  1.707757: ' + data['1.707757'] + '  ForcingEfficiency(TOA): ' + data['ForcingEfficiency(TOA)'] + '  N[AOTExt675-T]: ' + data['N[AOTExt675-T]'] + '  N[ASYM868-T]: ' + data['N[ASYM868-T]'] + '  N[15.000000]: ' + data['N[15.000000]'] + '  N[UpwardFlux1022-T]: ' + data['N[UpwardFlux1022-T]'],
'<br/>AOT_443: ' + data['AOT_443'] + '  REFR(1022): ' + data['REFR(1022)'] + '  2.240702: ' + data['2.240702'] + '  DownwardFlux440-T: ' + data['DownwardFlux440-T'] + '  N[AOTExt868-T]: ' + data['N[AOTExt868-T]'] + '  N[ASYM1022-T]: ' + data['N[ASYM1022-T]'] + '  N[Inflection_Point[um]]: ' + data['N[Inflection_Point[um]]'] + '  N[DiffuseFlux440-T]: ' + data['N[DiffuseFlux440-T]'],
'<br/>AOT_440: ' + data['AOT_440'] + '  REFI(440): ' + data['REFI(440)'] + '  2.939966: ' + data['2.939966'] + '  DownwardFlux675-T: ' + data['DownwardFlux675-T'] + '  N[AOTExt1022-T]: ' + data['N[AOTExt1022-T]'] + '  N[ASYM440-F]: ' + data['N[ASYM440-F]'] + '  N[VolCon-T]: ' + data['N[VolCon-T]'] + '  N[DiffuseFlux675-T]: ' + data['N[DiffuseFlux675-T]'],
'<br/>AOT_412: ' + data['AOT_412'] + '  REFI(675): ' + data['REFI(675)'] + '  3.857452: ' + data['3.857452'] + '  DownwardFlux868-T: ' + data['DownwardFlux868-T'] + '  N[AOTExt440-F]: ' + data['N[AOTExt440-F]'] + '  N[ASYM675-F]: ' + data['N[ASYM675-F]'] + '  N[EffRad-T]: ' + data['N[EffRad-T]'] + '  N[DiffuseFlux868-T]: ' + data['N[DiffuseFlux868-T]'],
'<br/>AOT_380: ' + data['AOT_380'] + '  REFI(868): ' + data['REFI(868)'] + '  5.06126: ' + data['5.06126'] + '  DownwardFlux1022-T: ' + data['DownwardFlux1022-T'] + '  N[AOTExt675-F]: ' + data['N[AOTExt675-F]'] + '  N[ASYM868-F]: ' + data['N[ASYM868-F]'] + '  N[VolMedianRad-T]: ' + data['N[VolMedianRad-T]'] + '  N[DiffuseFlux1022-T]: ' + data['N[DiffuseFlux1022-T]'],
'<br/>AOT_340: ' + data['AOT_340'] + '  REFI(1022): ' + data['REFI(1022)'] + '  6.640745: ' + data['6.640745'] + '  UpwardFlux440-T: ' + data['UpwardFlux440-T'] + '  N[AOTExt868-F]: ' + data['N[AOTExt868-F]'] + '  N[ASYM1022-F]: ' + data['N[ASYM1022-F]'] + '  N[StdDev-T]: ' + data['N[StdDev-T]'] + '  last_processing_date(mm/dd/yyyy): ' + data['last_processing_date(mm/dd/yyyy)'],
'<br/>Water(cm): ' + data['Water(cm)'] + '  ASYM440-T: ' + data['ASYM440-T'] + '  8.713145: ' + data['8.713145'] + '  UpwardFlux675-T: ' + data['UpwardFlux675-T'] + '  N[AOTExt1022-F]: ' + data['N[AOTExt1022-F]'] + '  N[ASYM440-C]: ' + data['N[ASYM440-C]'] + '  N[VolCon-F]: ' + data['N[VolCon-F]'] + '  alm_type: ' + data['alm_type'],
'<br/>AOTExt440-T: ' + data['AOTExt440-T'] + '  ASYM675-T: ' + data['ASYM675-T'] + '  11.432287: ' + data['11.432287'] + '  UpwardFlux868-T: ' + data['UpwardFlux868-T'] + '  N[AOTExt440-C]: ' + data['N[AOTExt440-C]'] + '  N[ASYM675-C]: ' + data['N[ASYM675-C]'] + '  N[EffRad-F]: ' + data['N[EffRad-F]'] + '  DATA_TYPE: ' + data['DATA_TYPE'],
'<br/>AOTExt675-T: ' + data['AOTExt675-T'] + '  ASYM868-T: ' + data['ASYM868-T'] + '  15: ' + data['15'] + '  UpwardFlux1022-T: ' + data['UpwardFlux1022-T'] + '  N[AOTExt675-C]: ' + data['N[AOTExt675-C]'] + '  N[ASYM868-C]: ' + data['N[ASYM868-C]'] + '  N[VolMedianRad-F]: ' + data['N[VolMedianRad-F]'],
'<br/>AOTExt868-T: ' + data['AOTExt868-T'] + '  ASYM1022-T: ' + data['ASYM1022-T'] + '  Inflection_Point[um]: ' + data['Inflection_Point[um]'] + '  DiffuseFlux440-T: ' + data['DiffuseFlux440-T'] + '  N[AOTExt868-C]: ' + data['N[AOTExt868-C]'] + '  N[ASYM1022-C]: ' + data['N[ASYM1022-C]'] + '  N[StdDev-F]: ' + data['N[StdDev-F]'],
'<br/>AOTExt1022-T: ' + data['AOTExt1022-T'] + '  ASYM440-F: ' + data['ASYM440-F'] + '  VolCon-T: ' + data['VolCon-T'] + '  DiffuseFlux675-T: ' + data['DiffuseFlux675-T'] + '  N[AOTExt1022-C]: ' + data['N[AOTExt1022-C]'] + '  N[0.050000]: ' + data['N[0.050000]'] + '  N[VolCon-C]: ' + data['N[VolCon-C]'],
'<br/>AOTExt440-F: ' + data['AOTExt440-F'] + '  ASYM675-F: ' + data['ASYM675-F'] + '  EffRad-T: ' + data['EffRad-T'] + '  DiffuseFlux868-T: ' + data['DiffuseFlux868-T'] + '  N[870-440AngstromParam.[AOTExt]-Total]: ' + data['N[870-440AngstromParam.[AOTExt]-Total]'] + '  N[0.065604]: ' + data['N[0.065604]'] + '  N[EffRad-C]: ' + data['N[EffRad-C]'],
'<br/>AOTExt675-F: ' + data['AOTExt675-F'] + '  ASYM868-F: ' + data['ASYM868-F'] + '  VolMedianRad-T: ' + data['VolMedianRad-T'] + '  DiffuseFlux1022-T: ' + data['DiffuseFlux1022-T'] + '  N[SSA440-T]: ' + data['N[SSA440-T]'] + '  N[0.086077]: ' + data['N[0.086077]'] + '  N[VolMedianRad-C]: ' + data['N[VolMedianRad-C]'],
'<br/>AOTExt868-F: ' + data['AOTExt868-F'] + '  ASYM1022-F: ' + data['ASYM1022-F'] + '  StdDev-T: ' + data['StdDev-T'] + '  N[AOT_1640]: ' + data['N[AOT_1640]'] + '  N[SSA675-T]: ' + data['N[SSA675-T]'] + '  N[0.112939]: ' + data['N[0.112939]'] + '  N[StdDev-C]: ' + data['N[StdDev-C]'],
'<br/>AOTExt1022-F: ' + data['AOTExt1022-F'] + '  ASYM440-C: ' + data['ASYM440-C'] + '  VolCon-F: ' + data['VolCon-F'] + '  N[AOT_1020]: ' + data['N[AOT_1020]'] + '  N[SSA868-T]: ' + data['N[SSA868-T]'] + '  N[0.148184]: ' + data['N[0.148184]'] + '  N[Altitude](BOA)(km): ' + data['N[Altitude](BOA)(km)'],
'<br/>AOTExt440-C: ' + data['AOTExt440-C'] + '  ASYM675-C: ' + data['ASYM675-C'] + '  EffRad-F: ' + data['EffRad-F'] + '  N[AOT_870]: ' + data['N[AOT_870]'] + '  N[SSA1022-T]: ' + data['N[SSA1022-T]'] + '  N[0.194429]: ' + data['N[0.194429]'] + '  N[Altitude](TOA)(km): ' + data['N[Altitude](TOA)(km)'],
'<br/>AOTExt675-C: ' + data['AOTExt675-C'] + '  ASYM868-C: ' + data['ASYM868-C'] + '  VolMedianRad-F: ' + data['VolMedianRad-F'] + '  N[AOT_675]: ' + data['N[AOT_675]'] + '  N[AOTAbsp440-T]: ' + data['N[AOTAbsp440-T]'] + '  N[0.255105]: ' + data['N[0.255105]'] + '  N[DownwardFlux](BOA): ' + data['N[DownwardFlux](BOA)'],
'<br/>AOTExt868-C: ' + data['AOTExt868-C'] + '  ASYM1022-C: ' + data['ASYM1022-C'] + '  StdDev-F: ' + data['StdDev-F'] + '  N[AOT_667]: ' + data['N[AOT_667]'] + '  N[AOTAbsp675-T]: ' + data['N[AOTAbsp675-T]'] + '  N[0.334716]: ' + data['N[0.334716]'] + '  N[DownwardFlux](TOA): ' + data['N[DownwardFlux](TOA)'],






                        '</div>'
                    ].join('');
            }
        });
        $('#date').text(date).trigger('change');
    }

    //    Init the map with data of this day: "25:01:2013" --> 2004

    function init(){
        date = new Date('2013-01-25'); //    YYYY-MM-DD
        $.get('http://' + ip + ':' + port + '/days?where={"Date(dd-mm-yyyy)":%20"25:01:2013"}',
            function (data) {
                drawPoints(data, '2013-01-25');
            }).fail(function () {
            console.error('algo fue mal :S');
        });
    }

    init();

    /**
    tooltip activation
    */

    $('[data-toggle="tooltip"]').tooltip();


    //    format the date as we need to make the request to server

    function dateDBFormat() {
        var myDay = ('0' + date.getDate()).slice(-2) + ':' + ('0' + (date.getMonth() + 1)).slice(-2) + ':' + date.getFullYear();
//        console.log(myDay);
        return myDay;
    }

    //    format the date for pressentation

    function dateGUIFormat() {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }
    
    function callData(myDay) {
        $.get('http://' + ip + ':' + port + '/days?where={"Date(dd-mm-yyyy)":%20"' + myDay + '"}',
            function (data) {
                drawPoints(data, dateGUIFormat());
            }).fail(function () {
            console.error('algo fue mal :S');
        });
    }

    //    one day less

    $('#less').on('click', function () {
        date.setDate(date.getDate() - 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one day more

    $('#more').on('click', function () {
        date.setDate(date.getDate() + 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one month less

    $('#lessMonth').on('click', function () {
        date.setMonth(date.getMonth() - 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one motnh more

    $('#moreMonth').on('click', function () {
        date.setMonth(date.getMonth() + 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one year less

    $('#lessYear').on('click', function () {
        date.setFullYear(date.getFullYear() - 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one year more

    $('#moreYear').on('click', function () {
        date.setFullYear(date.getFullYear() + 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });
    
    function testDates() {
        console.log('mi ' + minDate);
        console.log('Ma ' + date);
        if (date < minDate) {
            console.log('me paso de la fecha abajo');
        }
        if (date > maxDate) {
            console.log('me paso de la fecha arriba');
        }
    }
    
    $('button.btn').on('click', function(){
        if ($('#stop').is(':visible')){
            stop();
            init();
        }
    });
    
    $('#stop').hide();
    
    $('#play').on('click', function(){
        $('#stop').show();
        $('#play').hide();
        date = minDate;
        loo = setInterval(function(){
            date.setDate(date.getDate() + 1);
            var myDay = dateDBFormat();
            callData(myDay);
        },750);      
    });
    
    $('#stop').on('click', function(){
        stop();
    });
    
    function stop(){
        $('#play').show();
        $('#stop').hide();
        clearInterval(loo);
//        init();        
    };

    function tem() {
        console.log('dejojojojoj');
    }
    
})