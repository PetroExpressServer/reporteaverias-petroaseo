/* ==========================================================================
   APPLICATION LOGIC - CONTROL DE AVERÍAS Y FLOTA
   ========================================================================== */

// --- SEED DATA ---
const fleetSeed = [
    { plate:"BWR-724", desc:"Unidad Compacta 1", type:"COMPACTA", brand:"SHACMAN", year:"2023" },
    { plate:"BWP-886", desc:"Unidad Compacta 2", type:"COMPACTA", brand:"SHACMAN", year:"2023" },
    { plate:"BWQ-764", desc:"Unidad Compacta 3", type:"COMPACTA", brand:"SHACMAN", year:"2023" },
    { plate:"BWP-917", desc:"Unidad Compacta 4", type:"COMPACTA", brand:"SHACMAN", year:"2023" },
    { plate:"BWQ-863", desc:"Unidad Compacta 5", type:"COMPACTA", brand:"SHACMAN", year:"2023" },
    { plate:"BZV-711", desc:"Unidad Compacta 6", type:"COMPACTA", brand:"SHACMAN", year:"2024" },
    { plate:"BZV-736", desc:"Unidad Compacta 7", type:"COMPACTA", brand:"SHACMAN", year:"2024" },
    { plate:"BZU-913", desc:"Unidad Compacta 8", type:"COMPACTA", brand:"SHACMAN", year:"2024" },
    { plate:"CBJ-823", desc:"Cisterna 1", type:"CISTERNA", brand:"FOTON", year:"2025" },
    { plate:"CBN-920", desc:"Cisterna 2", type:"CISTERNA", brand:"FOTON", year:"2025" },
    { plate:"BMB-818", desc:"Hidrolavado 1", type:"HIDROLAVADO", brand:"DONGFENG", year:"2022" },
    { plate:"BMB-794", desc:"Hidrolavado 2", type:"HIDROLAVADO", brand:"DONGFENG", year:"2022" },
    { plate:"BMD-830", desc:"Hidrolavado 3", type:"HIDROLAVADO", brand:"DONGFENG", year:"2022" },
    { plate:"BMA-793", desc:"Hidrolavado 4", type:"HIDROLAVADO", brand:"DONGFENG", year:"2022" },
    { plate:"BMC-738", desc:"Hidrolavado 5", type:"HIDROLAVADO", brand:"DONGFENG", year:"2022" },
    { plate:"BMB-902", desc:"Baranda 1", type:"BARANDA", brand:"DONGFENG", year:"2022" },
    { plate:"N°1", desc:"Barredora N°1", type:"BARREDORA MECÁNICA", brand:"NILFISK", year:"2024" },
    { plate:"N°2", desc:"Barredora N°2", type:"BARREDORA MECÁNICA", brand:"NILFISK", year:"2024" },
    { plate:"N°3", desc:"Barredora N°3", type:"BARREDORA MECÁNICA", brand:"NILFISK", year:"2024" },
    { plate:"N°4", desc:"Fregadora N°1", type:"FREGADORA MECÁNICA", brand:"NILFISK", year:"2024" },
    { plate:"N°5", desc:"Fregadora N°2", type:"FREGADORA MECÁNICA", brand:"NILFISK", year:"2024" },
    { plate:"V2Q-773", desc:"Unidad Adicional 1", type:"CISTERNA COMBUSTIBLE", brand:"N/D", year:"N/D" },
    { plate:"C7I-730", desc:"Unidad Adicional 2", type:"CISTERNA COMBUSTIBLE", brand:"N/D", year:"N/D" },
    { plate:"BRH-906", desc:"Unidad Adicional 3", type:"OTRO", brand:"N/D", year:"N/D" }
];

const driverNames = [
    "ALCCA CCAHUANA NEPTALI ROLANDO", "ARAUJO QUISPE EDGAR", "ARROYO DELGADO JHON ROYNER",
    "ASCANOA CONDOR DANIEL", "BARRIOS ALVAREZ DAVID", "CHIRINOS GONZALES MARCO ANTONIO",
    "CURIPACO MALLMA FRANCO SONY", "GOICOCHEA SALCEDO GUILLERMO", "GOMEZ ROCA FERNANDO",
    "GRILLET ARGENIS RAMON", "GUTIERREZ HUANAY JORGE LUIS", "JERI CHAVEZ GUSTAVO ORLANDO",
    "LLACTAHUAMAN GUERRERO WALTER", "MARRON BALDEON JOSE MANUEL", "MARTINEZ LEANDRO JORGE LUIS",
    "MIRAVAL RODENAS JORGE VISA", "PALOMINO ASTO JHON GELVERT", "PALOMINO CAJA JOSE ARISTIDES",
    "PAUCAR AGUILERA DIEGO", "QUISPE PERALES CHRISTHIAN AMERICO", "RIVERA HUANUQUEÑO GERSON MARIO",
    "ROBLES GORA SANTIAGO", "SANTIAGO MURGA MAXIMO", "VALDERRAMA CAMILO DANI DANIEL",
    "VELASQUEZ MAMANI WALTER", "TUPAC VILLEGAS ROBBY"
];
const driversSeed = driverNames.map(name => ({ name, dni: "-", license: "-", contact: "-" }));

const defectsSeed = [
    { id: 1, dateReport: "2026-06-02", timeReport: "06:15", plate: "N°1", driver: "JERI CHAVEZ GUSTAVO ORLANDO", description: "LUCES NO FUNCIONAN", system: "ELÉCTRICO", severity: "MODERADO", dateRepair: "2026-06-03", timeRepair: "06:00", status: "REPARADO", obs: "", daysStop: "23 horas y 45 min" },
    { id: 2, dateReport: "2026-06-02", timeReport: "06:15", plate: "N°1", driver: "JERI CHAVEZ GUSTAVO ORLANDO", description: "LLANTA POSTERIOR ESTA DESGASTADA", system: "NEUMÁTICOS", severity: "LEVE", dateRepair: "", timeRepair: "", status: "PENDIENTE", obs: "", daysStop: "" },
    { id: 3, dateReport: "2026-06-02", timeReport: "03:46", plate: "N°4", driver: "ARAUJO QUISPE EDGAR", description: "JEBE LATERAL PARA CAMBIO", system: "OTRO", severity: "MODERADO", dateRepair: "", timeRepair: "", status: "PENDIENTE", obs: "SE SOLICITO EL JEBE AL PROVEEDOR", daysStop: "" },
    { id: 4, dateReport: "2026-06-02", timeReport: "15:03", plate: "BZV-736", driver: "PALOMINO ASTO JHON GELVERT", description: "fuga de hidrolina por bomba hidraulica", system: "HIDRÁULICO", severity: "GRAVE", dateRepair: "2026-06-04", timeRepair: "17:00", status: "REPARADO", obs: "", daysStop: "2 días, 1 hora y 57 min" },
    { id: 5, dateReport: "2026-06-02", timeReport: "22:23", plate: "BWP-886", driver: "MARRON BALDEON JOSE MANUEL", description: "Roto puño de la base del piston hidrulico", system: "HIDRÁULICO", severity: "GRAVE", dateRepair: "2026-06-03", timeRepair: "15:15", status: "REPARADO", obs: "", daysStop: "16 horas y 52 min" },
    { id: 6, dateReport: "2026-06-03", timeReport: "09:13", plate: "BZU-913", driver: "QUISPE PERALES CHRISTHIAN AMERICO", description: "rotura de manguera hidraulica", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-03", timeRepair: "10:44", status: "REPARADO", obs: "Axilio Freddy Reyes", daysStop: "1 hora y 31 min" },
    { id: 7, dateReport: "2026-06-03", timeReport: "10:52", plate: "BWR-724", driver: "ALCCA CCAHUANA NEPTALI ROLANDO", description: "Fuga aceite del motor", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-03", timeRepair: "11:22", status: "REPARADO", obs: "Auxilio mecanico", daysStop: "30 min" },
    { id: 8, dateReport: "2026-06-03", timeReport: "13:18", plate: "BWR-724", driver: "ALCCA CCAHUANA NEPTALI ROLANDO", description: "Bolsa de aire del asiento del piloto", system: "OTRO", severity: "LEVE", dateRepair: "2026-06-03", timeRepair: "14:20", status: "REPARADO", obs: "", daysStop: "1 hora y 2 min" },
    { id: 9, dateReport: "2026-06-04", timeReport: "09:37", plate: "BWQ-863", driver: "MARRON BALDEON JOSE MANUEL", description: "Resume hidrolina por cañeria de metal del techo", system: "HIDRÁULICO", severity: "GRAVE", dateRepair: "2026-06-05", timeRepair: "15:00", status: "EN TALLER", obs: "INGRESA 15:43", daysStop: "1 día, 5 horas y 23 min" },
    { id: 10, dateReport: "2026-06-04", timeReport: "09:52", plate: "BZU-913", driver: "ROBLES GORA SANTIAGO", description: "fuga de lexiviado por llave de paso la de tina", system: "CARROCERÍA", severity: "MODERADO", dateRepair: "2026-06-04", timeRepair: "14:16", status: "REPARADO", obs: "", daysStop: "4 horas y 24 min" },
    { id: 11, dateReport: "2026-06-05", timeReport: "07:34", plate: "N°1", driver: "JERI CHAVEZ GUSTAVO ORLANDO", description: "baja mucho mas de su nivel", system: "OTRO", severity: "MODERADO", dateRepair: "", timeRepair: "", status: "EN REPORTE", obs: "", daysStop: "" },
    { id: 12, dateReport: "2026-06-05", timeReport: "06:31", plate: "BZV-736", driver: "QUISPE PERALES CHRISTHIAN AMERICO", description: "manija interna de puerta del conductor es malograda", system: "OTRO", severity: "LEVE", dateRepair: "", timeRepair: "", status: "EN REPORTE", obs: "", daysStop: "" },
    { id: 13, dateReport: "2026-06-05", timeReport: "07:34", plate: "BWR-724", driver: "TUPAC VILLEGAS ROBBY", description: "fuga de lexiviado por llave de paso la de tina", system: "OTRO", severity: "LEVE", dateRepair: "2026-06-05", timeRepair: "10:30", status: "EN REPORTE", obs: "", daysStop: "2 horas y 56 min" },
    { id: 14, dateReport: "2026-06-06", timeReport: "17:05", plate: "N°1", driver: "ARAUJO QUISPE EDGAR", description: "Derrame de hidrolina por manguera, unidad queda inoperativa", system: "HIDRÁULICO", severity: "GRAVE", dateRepair: "2026-06-08", timeRepair: "16:24", status: "REPARADO", obs: "", daysStop: "1 día, 23 horas y 19 min" },
    { id: 15, dateReport: "2026-06-06", timeReport: "22:20", plate: "BWP-917", driver: "ALCCA CCAHUANA NEPTALI ROLANDO", description: "Avería de manguera hidráulica (queda en la base Huachipa)", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-07", timeRepair: "16:37", status: "REPARADO", obs: "", daysStop: "18 horas y 17 min" },
    { id: 16, dateReport: "2026-06-07", timeReport: "16:18", plate: "BWR-724", driver: "ALCCA CCAHUANA NEPTALI ROLANDO", description: "fuga de lixiviado por cajón", system: "OTRO", severity: "GRAVE", dateRepair: "2026-06-09", timeRepair: "17:00", status: "REPARADO", obs: "", daysStop: "2 días y 42 min" },
    { id: 17, dateReport: "2026-06-08", timeReport: "16:12", plate: "BWQ-863", driver: "PALOMINO ASTO JHON GELVERT", description: "No cuenta con pernos de chasis, en la parte de adelante", system: "OTRO", severity: "LEVE", dateRepair: "", timeRepair: "", status: "REPARADO", obs: "", daysStop: "" },
    { id: 18, dateReport: "2026-06-09", timeReport: "15:14", plate: "BWQ-863", driver: "MARRON BALDEON JOSE MANUEL", description: "Fuga de hidrolina por cañería de metal, pin de la palanca de mando roto", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-09", timeRepair: "16:00", status: "REPARADO", obs: "", daysStop: "46 min" },
    { id: 19, dateReport: "2026-06-08", timeReport: "20:21", plate: "BWQ-764", driver: "PALOMINO ASTO JHON GELVERT", description: "Fuga de hidrolina por manguera de alta presión hidráulica, manguera de metal. (Queda en base Petro en Huachipa)", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-10", timeRepair: "17:05", status: "REPARADO", obs: "", daysStop: "1 día, 20 horas y 44 min" },
    { id: 20, dateReport: "2026-06-10", timeReport: "17:05", plate: "BZV-736", driver: "CHIRINOS GONZALES MARCO ANTONIO", description: "Fuga de lixiviado por cambiar frisa", system: "HIDRÁULICO", severity: "GRAVE", dateRepair: "2026-06-11", timeRepair: "09:00", status: "REPARADO", obs: "", daysStop: "15 horas y 55 min" },
    { id: 21, dateReport: "2026-06-06", timeReport: "15:57", plate: "CBJ-823", driver: "TUPAC VILLEGAS ROBBY", description: "Fuga de agua por válvula de descarga, manguera de abastecimiento esta para cambio tiene demasiadas fugas.", system: "ESTRUCTURA", severity: "GRAVE", dateRepair: "2026-06-20", timeRepair: "07:00", status: "REPARADO", obs: "", daysStop: "13 días, 15 horas y 3 min" },
    { id: 22, dateReport: "2026-06-10", timeReport: "06:22", plate: "N°3", driver: "JERI CHAVEZ GUSTAVO ORLANDO", description: "No enciende el motor al girar el contacto", system: "ELÉCTRICO", severity: "GRAVE", dateRepair: "2026-06-10", timeRepair: "08:45", status: "REPARADO", obs: "", daysStop: "2 horas y 23 min" },
    { id: 23, dateReport: "2026-06-12", timeReport: "20:21", plate: "BZU-913", driver: "ALCCA CCAHUANA NEPTALI ROLANDO", description: "El botón de control de Lifter no funciona", system: "ELÉCTRICO", severity: "MODERADO", dateRepair: "2026-06-13", timeRepair: "06:00", status: "REPARADO", obs: "", daysStop: "9 horas y 39 min" },
    { id: 24, dateReport: "2026-06-13", timeReport: "17:51", plate: "N°5", driver: "ARAUJO QUISPE EDGAR", description: "Fregadora N°5 presenta filtro en mal estado", system: "OTRO", severity: "MODERADO", dateRepair: "", timeRepair: "", status: "EN REPORTE", obs: "", daysStop: "" },
    { id: 25, dateReport: "2026-06-13", timeReport: "09:45", plate: "BWP-886", driver: "TUPAC VILLEGAS ROBBY", description: "manguera de lisfther con fuga de hidrolina", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-13", timeRepair: "12:00", status: "REPARADO", obs: "", daysStop: "2 horas y 15 min" },
    { id: 26, dateReport: "2026-06-12", timeReport: "22:51", plate: "BZU-913", driver: "PALOMINO ASTO JHON GELVERT", description: "Botella hidráulica fuga de hidrolina", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-13", timeRepair: "10:20", status: "REPARADO", obs: "", daysStop: "11 horas y 29 min" },
    { id: 27, dateReport: "2026-06-13", timeReport: "13:16", plate: "BWQ-764", driver: "ALCCA CCAHUANA NEPTALI ROLANDO", description: "falla de lisfther sale para relleno sanitario pasar a taller para reparación", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-13", timeRepair: "20:39", status: "REPARADO", obs: "", daysStop: "7 horas y 23 min" },
    { id: 28, dateReport: "2026-06-13", timeReport: "11:56", plate: "BZV-736", driver: "MARRON BALDEON JOSE MANUEL", description: "Reporta soporte de motor roto", system: "ESTRUCTURA", severity: "LEVE", dateRepair: "2026-06-13", timeRepair: "17:39", status: "REPARADO", obs: "", daysStop: "5 horas y 43 min" },
    { id: 29, dateReport: "2026-06-14", timeReport: "12:10", plate: "BWQ-863", driver: "PALOMINO ASTO JHON GELVERT", description: "fuga de hidrolina por acople de la manguera hidráulica de las palancas de expulsión del pistón hidráulico", system: "HIDRÁULICO", severity: "LEVE", dateRepair: "2026-06-15", timeRepair: "13:04", status: "REPARADO", obs: "", daysStop: "1 día y 54 min" },
    { id: 30, dateReport: "2026-06-15", timeReport: "06:00", plate: "BWQ-764", driver: "QUISPE PERALES CHRISTHIAN AMERICO", description: "unidad no arranca, no pasa corriente", system: "ELÉCTRICO", severity: "GRAVE", dateRepair: "2026-06-15", timeRepair: "06:41", status: "REPARADO", obs: "", daysStop: "41 min" },
    { id: 31, dateReport: "2026-06-15", timeReport: "13:04", plate: "BZU-913", driver: "MARRON BALDEON JOSE MANUEL", description: "Unidad pierde fuerza queda en base Petro para su reparación", system: "ELÉCTRICO", severity: "GRAVE", dateRepair: "2026-06-17", timeRepair: "12:13", status: "REPARADO", obs: "", daysStop: "1 día, 23 horas y 9 min" },
    { id: 32, dateReport: "2026-06-15", timeReport: "19:47", plate: "BWR-724", driver: "PALOMINO ASTO JHON GELVERT", description: "soporte de motor, botón de horómetro no funciona", system: "ELÉCTRICO", severity: "MODERADO", dateRepair: "2026-06-16", timeRepair: "09:00", status: "PENDIENTE", obs: "", daysStop: "13 horas y 13 min" },
    { id: 33, dateReport: "2026-06-16", timeReport: "06:18", plate: "BWQ-764", driver: "QUISPE PERALES CHRISTHIAN AMERICO", description: "2do placa de muelle roto, lado derecho", system: "ESTRUCTURA", severity: "MODERADO", dateRepair: "", timeRepair: "", status: "PENDIENTE", obs: "", daysStop: "" },
    { id: 34, dateReport: "2026-06-19", timeReport: "09:35", plate: "BWQ-863", driver: "MARRON BALDEON JOSE MANUEL", description: "Se salió pastilla de la pala de barrio, lado derecho, se envía a disposición final para dejar en taller para su reparación", system: "ESTRUCTURA", severity: "MODERADO", dateRepair: "2026-06-20", timeRepair: "10:04", status: "REPARADO", obs: "", daysStop: "1 día y 29 min" },
    { id: 35, dateReport: "2026-06-19", timeReport: "16:07", plate: "BZV-736", driver: "PALOMINO CAJA JOSE ARISTIDES", description: "falla de Lisfther", system: "HIDRÁULICO", severity: "MODERADO", dateRepair: "2026-06-22", timeRepair: "19:18", status: "REPARADO", obs: "", daysStop: "3 días, 3 horas y 11 min" },
    { id: 36, dateReport: "2026-06-19", timeReport: "21:30", plate: "BZU-913", driver: "ALCCA CCAHUANA NEPTALI ROLANDO", description: "fuga de lixiviado por cajón", system: "ESTRUCTURA", severity: "MODERADO", dateRepair: "2026-06-20", timeRepair: "07:01", status: "REPARADO", obs: "", daysStop: "9 horas y 31 min" },
    { id: 37, dateReport: "2026-06-20", timeReport: "11:17", plate: "BWR-724", driver: "GOICOCHEA SALCEDO GUILLERMO", description: "No ingresan los cambio, caja de cambio por repara", system: "CAJA DE CAMBIOS", severity: "GRAVE", dateRepair: "2026-06-26", timeRepair: "15:00", status: "REPARADO", obs: "", daysStop: "6 días, 3 horas y 43 min" },
    { id: 38, dateReport: "2026-06-21", timeReport: "11:20", plate: "N°2", driver: "MIRAVAL RODENAS JORGE VISA", description: "No enciende", system: "ELÉCTRICO", severity: "MODERADO", dateRepair: "2026-06-21", timeRepair: "12:30", status: "REPARADO", obs: "", daysStop: "1 hora y 10 min" },
    { id: 39, dateReport: "2026-06-21", timeReport: "16:23", plate: "N°2", driver: "ARAUJO QUISPE EDGAR", description: "Cepillo rosa con la tolva , perno se soporte de celillo esta gastado.", system: "ESTRUCTURA", severity: "MODERADO", dateRepair: "2026-06-22", timeRepair: "11:00", status: "REPARADO", obs: "", daysStop: "18 horas y 37 min" },
    { id: 40, dateReport: "2026-06-23", timeReport: "09:47", plate: "BZV-736", driver: "PALOMINO ASTO JHON GELVERT", description: "Falta soporte de motor de unidad, unidad inoperativa en emmsa", system: "CARROCERÍA", severity: "GRAVE", dateRepair: "2026-06-23", timeRepair: "15:53", status: "REPARADO", obs: "", daysStop: "6 horas y 6 min" },
    { id: 41, dateReport: "2026-06-23", timeReport: "11:22", plate: "N°1", driver: "JERI CHAVEZ GUSTAVO ORLANDO", description: "barredora N°1 Capuchones de bujía desgastados no falla al encender motor pierde fuerza , rodajes de rueda lado derecho, queda fuera de servició en emmsa.", system: "ELÉCTRICO", severity: "GRAVE", dateRepair: "2026-06-30", timeRepair: "14:00", status: "REPARADO", obs: "", daysStop: "7 días, 2 horas y 38 min" },
    { id: 42, dateReport: "2026-06-23", timeReport: "17:00", plate: "BWP-917", driver: "PALOMINO ASTO JHON GELVERT", description: "La unida esta subiendo temperatura, ingresa a Taller para revisión, agregar refrigerante", system: "MOTOR", severity: "MODERADO", dateRepair: "2026-06-26", timeRepair: "16:46", status: "EN TALLER", obs: "", daysStop: "2 días, 23 horas y 46 min" },
    { id: 43, dateReport: "2026-06-24", timeReport: "07:21", plate: "N°3", driver: "MIRAVAL RODENAS JORGE VISA", description: "se queda pegado el acelerado", system: "ELÉCTRICO", severity: "GRAVE", dateRepair: "2026-06-24", timeRepair: "17:05", status: "REPARADO", obs: "", daysStop: "9 horas y 44 min" },
    { id: 44, dateReport: "2026-06-25", timeReport: "13:47", plate: "BWQ-863", driver: "", description: "Fuga de hidrolina por manguera de alta presión hidráulica, manguera de metal. (Queda en base Petro en Huachipa)", system: "HIDRÁULICO", severity: "GRAVE", dateRepair: "2026-06-27", timeRepair: "13:00", status: "EN REPORTE", obs: "", daysStop: "1 día, 23 horas y 13 min" },
    { id: 45, dateReport: "2026-03-26", timeReport: "11:02", plate: "BZV-711", driver: "HUAMANI GUTIERREZ MIGUEL ANGEL", description: "Fuga de lexiviado por cajon", system: "ESTRUCTURA", severity: "LEVE", dateRepair: "2026-03-26", timeRepair: "14:00", status: "EN REPORTE", obs: "", daysStop: "2 horas y 58 min" },
    { id: 46, dateReport: "2026-06-26", timeReport: "16:25", plate: "BWQ-863", driver: "TUPAC VILLEGAS ROBBY", description: "no levan el lisfther", system: "LISFTHER", severity: "GRAVE", dateRepair: "2026-06-29", timeRepair: "14:06", status: "REPARADO", obs: "", daysStop: "2 días, 21 horas y 41 min" },
    { id: 47, dateReport: "2026-06-27", timeReport: "07:40", plate: "BWP-886", driver: "TUPAC VILLEGAS ROBBY", description: "Fuja de lixiviado por la frisa", system: "CAJON COMPACTADOR", severity: "GRAVE", dateRepair: "2026-06-29", timeRepair: "10:00", status: "REPARADO", obs: "", daysStop: "2 días, 2 horas y 20 min" },
    { id: 48, dateReport: "2026-06-27", timeReport: "16:04", plate: "BZV-736", driver: "TUPAC VILLEGAS ROBBY", description: "Fuja de lixiviado por la frisa", system: "CAJON COMPACTADOR", severity: "GRAVE", dateRepair: "2026-06-27", timeRepair: "19:00", status: "PENDIENTE", obs: "", daysStop: "2 horas y 56 min" },
    { id: 49, dateReport: "2026-06-28", timeReport: "11:41", plate: "BWP-886", driver: "", description: "Fuga de Hidrolina por manguera", system: "HIDRÁULICO", severity: "LEVE", dateRepair: "2026-06-29", timeRepair: "10:00", status: "REPARADO", obs: "", daysStop: "22 horas y 19 min" },
    { id: 50, dateReport: "2026-06-29", timeReport: "11:14", plate: "BWQ-863", driver: "ALCCA CCAHUANA NEPTALI ROLANDO", description: "Rotura de base de Lisfther", system: "ESTRUCTURA", severity: "GRAVE", dateRepair: "2026-06-29", timeRepair: "14:00", status: "REPARADO", obs: "", daysStop: "2 horas y 46 min" },
    { id: 51, dateReport: "2026-06-29", timeReport: "16:55", plate: "N°5", driver: "ARAUJO QUISPE EDGAR", description: "Escobillon central con desgaste, se desprendio de base", system: "ESTRUCTURA", severity: "GRAVE", dateRepair: "2026-06-30", timeRepair: "16:00", status: "REPARADO", obs: "", daysStop: "23 horas y 5 min" },
    { id: 52, dateReport: "2026-06-29", timeReport: "01:16", plate: "BWQ-764", driver: "ARROYO DELGADO JHON ROYNER", description: "Fuga de Hidrolina, manguera de Lifther", system: "LISFTHER", severity: "GRAVE", dateRepair: "2026-06-30", timeRepair: "09:15", status: "REPARADO", obs: "", daysStop: "1 día, 7 horas y 59 min" },
    { id: 53, dateReport: "2026-06-29", timeReport: "06:38", plate: "BZV-736", driver: "QUISPE PERALES CHRISTHIAN AMERICO", description: "Fuga de hidrolina por manguera hidraulica", system: "HIDRÁULICO", severity: "GRAVE", dateRepair: "2026-06-29", timeRepair: "13:15", status: "REPARADO", obs: "", daysStop: "6 horas y 37 min" }
];

// --- APP STATE ---
let state = {
    fleet: [],
    drivers: [],
    defects: []
};

// --- CHART INSTANCES ---
let charts = {
    trend: null,
    severity: null,
    plates: null,
    systems: null
};

// --- SUPABASE CLIENT & HELPER FUNCTIONS ---
const DEFAULT_SUPABASE_URL = "https://ojblhasbhhpgrxgxdnpc.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_fbgbaYccFB96zCLaGye3kQ_Nrc7gvRl";

let supabaseClient = null;

function dbDefectToJS(row) {
    return {
        id: row.id,
        dateReport: row.date_report,
        timeReport: row.time_report,
        plate: row.plate,
        driver: row.driver,
        description: row.description,
        system: row.system,
        severity: row.severity,
        dateRepair: row.date_repair || "",
        timeRepair: row.time_repair || "",
        status: row.status,
        obs: row.observations || "",
        daysStop: row.days_stop || ""
    };
}

function jsDefectToDB(d) {
    return {
        id: d.id,
        date_report: d.dateReport,
        time_report: d.timeReport,
        plate: d.plate,
        driver: d.driver,
        description: d.description,
        system: d.system,
        severity: d.severity,
        date_repair: d.dateRepair || null,
        time_repair: d.timeRepair || null,
        status: d.status,
        observations: d.obs || "",
        days_stop: d.daysStop || ""
    };
}

function dbFleetToJS(row) {
    return {
        plate: row.plate,
        desc: row.description,
        type: row.type,
        brand: row.brand,
        year: row.year
    };
}

function jsFleetToDB(f) {
    return {
        plate: f.plate,
        description: f.desc,
        type: f.type,
        brand: f.brand,
        year: f.year
    };
}

function updateSupabaseStatus(isConnected, text = null) {
    const badge = document.getElementById("supabaseStatusBadge");
    if (!badge) return;
    
    if (isConnected) {
        badge.className = "badge badge-reparado";
        badge.innerText = text || "Conectado (Cloud)";
    } else {
        badge.className = "badge badge-pendiente";
        badge.innerText = text || "Desconectado (LocalStorage)";
    }
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initDatabase();
    setupEventListeners();
    renderAll();
    
    // Default Dates for Form
    resetFormDates();
});

function initDatabase() {
    const dbVer = localStorage.getItem("petro_db_version");
    const currentVer = "1.2.3";
    
    if (dbVer !== currentVer) {
        // One-time database reset to seed 53 real reports
        localStorage.removeItem("petro_fleet");
        localStorage.removeItem("petro_drivers");
        localStorage.removeItem("petro_defects");
        localStorage.setItem("petro_db_version", currentVer);
    }

    const localFleet = localStorage.getItem("petro_fleet");
    const localDrivers = localStorage.getItem("petro_drivers");
    const localDefects = localStorage.getItem("petro_defects");

    if (localFleet && localDrivers && localDefects) {
        state.fleet = JSON.parse(localFleet);
        state.drivers = JSON.parse(localDrivers);
        state.defects = JSON.parse(localDefects);
        
        // Ensure legacy drivers have DNI and license fields
        state.drivers.forEach(d => {
            if (d.dni === undefined) d.dni = "-";
            if (d.license === undefined) d.license = "-";
        });
    } else {
        // Load Seed Data (53 real reports)
        state.fleet = [...fleetSeed];
        state.drivers = [...driversSeed];
        state.defects = [...defectsSeed];
        saveToLocalStorage();
    }

    // Connect to Supabase if config exists
    const isDisabled = localStorage.getItem("supabase_disabled") === "true";
    let url = localStorage.getItem("supabase_url");
    let key = localStorage.getItem("supabase_key");
    
    // Fallback to defaults if not disabled and no custom key is saved
    if (!url && !key && !isDisabled) {
        url = DEFAULT_SUPABASE_URL;
        key = DEFAULT_SUPABASE_KEY;
    }
    
    if (url && key && window.supabase) {
        try {
            supabaseClient = window.supabase.createClient(url, key);
            
            const urlInput = document.getElementById("supabaseUrlInput");
            const keyInput = document.getElementById("supabaseKeyInput");
            if (urlInput) urlInput.value = url;
            if (keyInput) keyInput.value = key;
            
            syncWithSupabase();
        } catch (e) {
            console.error("Error al conectar con Supabase:", e);
            updateSupabaseStatus(false, "Error de Conexión");
        }
    } else {
        updateSupabaseStatus(false);
    }
}

async function syncWithSupabase() {
    if (!supabaseClient) return;
    
    updateSupabaseStatus(true, "Sincronizando...");
    
    try {
        // 1. SYNC FLEET
        const { data: dbFleet, error: fErr } = await supabaseClient.from('fleet').select('*');
        if (fErr) throw fErr;
        
        if (dbFleet.length === 0 && state.fleet.length > 0) {
            const toInsert = state.fleet.map(jsFleetToDB);
            const { error: insErr } = await supabaseClient.from('fleet').insert(toInsert);
            if (insErr) throw insErr;
        } else if (dbFleet.length > 0) {
            state.fleet = dbFleet.map(dbFleetToJS);
        }

        // 2. SYNC DRIVERS
        const { data: dbDrivers, error: drErr } = await supabaseClient.from('drivers').select('*');
        if (drErr) throw drErr;
        
        if (dbDrivers.length === 0 && state.drivers.length > 0) {
            const { error: insErr } = await supabaseClient.from('drivers').insert(state.drivers);
            if (insErr) throw insErr;
        } else if (dbDrivers.length > 0) {
            state.drivers = dbDrivers;
        }

        // 3. SYNC DEFECTS
        const { data: dbDefects, error: defErr } = await supabaseClient.from('defects').select('*');
        if (defErr) throw defErr;
        
        if (dbDefects.length === 0 && state.defects.length > 0) {
            const toInsert = state.defects.map(jsDefectToDB);
            const { error: insErr } = await supabaseClient.from('defects').insert(toInsert);
            if (insErr) throw insErr;
        } else if (dbDefects.length > 0) {
            state.defects = dbDefects.map(dbDefectToJS);
        }

        saveToLocalStorage();
        updateDashboardMetrics();
        renderDashboardCharts();
        
        const activeTab = document.querySelector(".menu-item.active")?.getAttribute("data-target");
        if (activeTab) {
            switchPane(activeTab);
        }
        
        updateSupabaseStatus(true, "Conectado (Nube)");
    } catch (e) {
        console.error("Fallo al sincronizar con Supabase:", e);
        updateSupabaseStatus(true, "Error de Sincronización");
    }
}

function saveToLocalStorage() {
    localStorage.setItem("petro_fleet", JSON.stringify(state.fleet));
    localStorage.setItem("petro_drivers", JSON.stringify(state.drivers));
    localStorage.setItem("petro_defects", JSON.stringify(state.defects));
}

// --- VIEW NAVIGATION ---
function setupEventListeners() {
    // Sidebar navigation
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(mi => mi.classList.remove("active"));
            item.classList.add("active");
            
            const targetPane = item.getAttribute("data-target");
            switchPane(targetPane);
            
            // Close sidebar on mobile after clicking
            document.getElementById("appSidebar").classList.remove("show-mobile");
        });
    });

    // Mobile Hamburger
    document.getElementById("sidebarToggle").addEventListener("click", () => {
        document.getElementById("appSidebar").classList.toggle("show-mobile");
    });

    // Close Modals
    document.querySelectorAll(".closeModalBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            closeAllModals();
        });
    });

    // Dynamic show/hide repair date based on status selection
    const statusSelect = document.getElementById("defectStatus");
    statusSelect.addEventListener("change", () => {
        toggleRepairFields(statusSelect.value);
    });

    // SUBMIT FORM - DEFECTS
    document.getElementById("defectForm").addEventListener("submit", handleDefectSubmit);
    document.getElementById("openAddDefectBtn").addEventListener("click", () => openDefectModal());

    // SUBMIT FORM - VEHICLES
    document.getElementById("unitForm").addEventListener("submit", handleUnitSubmit);
    document.getElementById("openAddUnitBtn").addEventListener("click", () => openUnitModal());

    // SUBMIT FORM - DRIVERS
    document.getElementById("driverForm").addEventListener("submit", handleDriverSubmit);
    document.getElementById("openAddDriverBtn").addEventListener("click", () => openDriverModal());
    document.getElementById("filterDriverSearch").addEventListener("input", renderDriversTable);

    // SEARCH HISTORY
    document.getElementById("searchHistoryBtn").addEventListener("click", handleHistorySearch);

    // DEFECT FILTERS
    document.getElementById("filterDefectSearch").addEventListener("input", filterDefectsTable);
    document.getElementById("filterDefectSystem").addEventListener("change", filterDefectsTable);
    document.getElementById("filterDefectSeverity").addEventListener("change", filterDefectsTable);
    document.getElementById("filterDefectStatus").addEventListener("change", filterDefectsTable);
    document.getElementById("clearDefectFilters").addEventListener("click", () => {
        document.getElementById("filterDefectSearch").value = "";
        document.getElementById("filterDefectSystem").value = "";
        document.getElementById("filterDefectSeverity").value = "";
        document.getElementById("filterDefectStatus").value = "";
        filterDefectsTable();
    });

    // BACKUP MANAGEMENT
    document.getElementById("btnExportData").addEventListener("click", exportDatabase);
    document.getElementById("btnImportTrigger").addEventListener("click", () => {
        document.getElementById("importFileInput").click();
    });
    document.getElementById("importFileInput").addEventListener("change", importDatabase);
    document.getElementById("btnResetDatabase").addEventListener("click", resetDatabaseToDefault);

    // SUPABASE CONFIG FORM
    const supabaseForm = document.getElementById("supabaseConfigForm");
    if (supabaseForm) {
        supabaseForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const urlVal = document.getElementById("supabaseUrlInput").value.trim();
            const keyVal = document.getElementById("supabaseKeyInput").value.trim();
            
            if (urlVal && keyVal) {
                localStorage.setItem("supabase_url", urlVal);
                localStorage.setItem("supabase_key", keyVal);
                localStorage.removeItem("supabase_disabled"); // Re-enable if previously disabled
                alert("Credenciales guardadas localmente. Conectando a Supabase...");
                await initDatabase();
            }
        });
    }

    const disconnectBtn = document.getElementById("btnDisconnectSupabase");
    if (disconnectBtn) {
        disconnectBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de desconectar Supabase? El sistema volverá a trabajar únicamente con LocalStorage.")) {
                localStorage.removeItem("supabase_url");
                localStorage.removeItem("supabase_key");
                localStorage.setItem("supabase_disabled", "true"); // Prevent default fallback on refresh
                supabaseClient = null;
                updateSupabaseStatus(false);
                document.getElementById("supabaseUrlInput").value = "";
                document.getElementById("supabaseKeyInput").value = "";
                alert("Desconectado de Supabase. Recargando aplicación.");
                window.location.reload();
            }
        });
    }
}

function switchPane(paneId) {
    document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
    document.getElementById(paneId).classList.add("active");

    // Update Top Title
    const paneTitleMap = {
        "dashboard": "Dashboard de Control",
        "averias": "Registro de Averías de Unidades",
        "flota": "Control de Flota y Estado Operativo",
        "conductores": "Gestión de Conductores",
        "historial": "Historial de Incidencias",
        "configuracion": "Copia de Seguridad & Configuración"
    };
    document.getElementById("currentPaneTitle").innerText = paneTitleMap[paneId] || "Control de Averías";

    if (paneId === "dashboard") {
        updateDashboardMetrics();
        renderDashboardCharts();
    } else if (paneId === "averias") {
        renderDefectsTable(state.defects);
    } else if (paneId === "flota") {
        renderFleetTable();
    } else if (paneId === "conductores") {
        renderDriversTable();
    } else if (paneId === "historial") {
        populateHistoryPlateSelect();
    }
}

function closeAllModals() {
    document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
}

function resetFormDates() {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 5);
    document.getElementById("defectDate").value = dateStr;
    document.getElementById("defectTime").value = timeStr;
}

function toggleRepairFields(status) {
    const repairFields = document.getElementById("repairFields");
    const repDate = document.getElementById("defectRepairDate");
    const repTime = document.getElementById("defectRepairTime");
    
    if (status === "REPARADO") {
        repairFields.style.display = "flex";
        repDate.required = true;
        repTime.required = true;
        if (!repDate.value) {
            const now = new Date();
            repDate.value = now.toISOString().slice(0, 10);
            repTime.value = now.toTimeString().slice(0, 5);
        }
    } else {
        repairFields.style.display = "none";
        repDate.required = false;
        repTime.required = false;
    }
}

// --- HELPER METRIC CALCULATIONS ---
function getUnitOperationalStatus(plate) {
    // If unit has any active defect with status "EN TALLER", it is Inoperative.
    const inTaller = state.defects.some(d => d.plate === plate && d.status === "EN TALLER");
    return inTaller ? "INOPERATIVA" : "OPERATIVA";
}

function calculateDaysStop(reportDate, reportTime, repairDate, repairTime) {
    if (!reportDate || !reportTime || !repairDate || !repairTime) return "";
    
    // Construct local Date objects using YYYY-MM-DD and HH:MM
    const start = new Date(`${reportDate}T${reportTime}`);
    const end = new Date(`${repairDate}T${repairTime}`);
    
    const diffMs = end - start;
    if (diffMs < 0 || isNaN(diffMs)) return "0 min";
    
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const mins = diffMins % 60;
    const diffHrs = Math.floor(diffMins / 60);
    const hrs = diffHrs % 24;
    const days = Math.floor(diffHrs / 24);
    
    let parts = [];
    if (days > 0) {
        parts.push(days === 1 ? "1 día" : `${days} días`);
    }
    if (hrs > 0) {
        parts.push(hrs === 1 ? "1 hora" : `${hrs} horas`);
    }
    if (mins > 0 || parts.length === 0) {
        parts.push(mins === 1 ? "1 min" : `${mins} min`);
    }
    
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} y ${parts[1]}`;
    return `${parts[0]}, ${parts[1]} y ${parts[2]}`;
}

// --- DASHBOARD RENDER ---
function updateDashboardMetrics() {
    const totalUnits = state.fleet.length;
    let inoperativeCount = 0;
    
    state.fleet.forEach(unit => {
        if (getUnitOperationalStatus(unit.plate) === "INOPERATIVA") {
            inoperativeCount++;
        }
    });

    const operativeCount = totalUnits - inoperativeCount;
    const activeDefects = state.defects.filter(d => d.status !== "REPARADO").length;
    const availabilityRate = totalUnits > 0 ? Math.round((operativeCount / totalUnits) * 100) : 0;

    document.getElementById("statTotalUnits").innerText = totalUnits;
    document.getElementById("statOperativeUnits").innerText = operativeCount;
    document.getElementById("statInoperativeUnits").innerText = inoperativeCount;
    document.getElementById("statActiveDefects").innerText = activeDefects;
    document.getElementById("statAvailabilityRate").innerText = availabilityRate + "%";
}

function renderDashboardCharts() {
    // Destroy previous charts to avoid canvas recycling issues
    Object.keys(charts).forEach(key => {
        if (charts[key]) {
            charts[key].destroy();
            charts[key] = null;
        }
    });

    if (state.defects.length === 0) {
        // Draw empty placeholders inside the canvases
        const canvasIds = ['chartTrend', 'chartSeverity', 'chartPlates', 'chartSystems'];
        canvasIds.forEach(id => {
            const canvas = document.getElementById(id);
            if (canvas) {
                const ctx = canvas.getContext('2d');
                // Adjust for dynamic sizing
                const w = canvas.clientWidth || 300;
                const h = canvas.clientHeight || 150;
                canvas.width = w;
                canvas.height = h;
                
                ctx.clearRect(0, 0, w, h);
                ctx.font = '500 14px "Outfit", sans-serif';
                ctx.fillStyle = '#94a3b8';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Sin datos registrados', w / 2, h / 2);
            }
        });
        return;
    }

    // --- 1. TREND CHART (Daily reports last 15 reports or 15 days) ---
    const dailyCounts = {};
    state.defects.forEach(d => {
        dailyCounts[d.dateReport] = (dailyCounts[d.dateReport] || 0) + 1;
    });
    const sortedDates = Object.keys(dailyCounts).sort().slice(-10);
    const trendData = sortedDates.map(date => dailyCounts[date]);

    const ctxTrend = document.getElementById("chartTrend").getContext("2d");
    charts.trend = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: sortedDates.map(d => d.substring(5)), // MM-DD format
            datasets: [{
                label: 'Averías Reportadas',
                data: trendData,
                borderColor: '#d91439',
                backgroundColor: 'rgba(217, 20, 57, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });

    // --- 2. SEVERITY CHART ---
    const severityCounts = { LEVE: 0, MODERADO: 0, GRAVE: 0 };
    state.defects.forEach(d => {
        if (severityCounts[d.severity] !== undefined) {
            severityCounts[d.severity]++;
        }
    });

    const ctxSeverity = document.getElementById("chartSeverity").getContext("2d");
    charts.severity = new Chart(ctxSeverity, {
        type: 'doughnut',
        data: {
            labels: ['Leve', 'Moderado', 'Grave'],
            datasets: [{
                data: [severityCounts.LEVE, severityCounts.MODERADO, severityCounts.GRAVE],
                backgroundColor: ['#64748b', '#fe6e00', '#d91439'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // --- 3. TOP UNITS WITH DEFECTS ---
    const plateCounts = {};
    state.defects.forEach(d => {
        plateCounts[d.plate] = (plateCounts[d.plate] || 0) + 1;
    });
    const sortedPlates = Object.keys(plateCounts).sort((a,b) => plateCounts[b] - plateCounts[a]).slice(0, 10);
    const plateData = sortedPlates.map(p => plateCounts[p]);

    const ctxPlates = document.getElementById("chartPlates").getContext("2d");
    charts.plates = new Chart(ctxPlates, {
        type: 'bar',
        data: {
            labels: sortedPlates,
            datasets: [{
                label: 'Incidencias',
                data: plateData,
                backgroundColor: '#fe6e00',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });

    // --- 4. SYSTEMS AFFECTED ---
    const systemCounts = { 'ELÉCTRICO': 0, 'HIDRÁULICO': 0, 'NEUMÁTICOS': 0, 'MOTOR': 0, 'FRENOS': 0, 'OTRO': 0 };
    state.defects.forEach(d => {
        const sys = d.system || 'OTRO';
        systemCounts[sys] = (systemCounts[sys] || 0) + 1;
    });
    const systemLabels = Object.keys(systemCounts);
    const systemData = Object.values(systemCounts);

    const ctxSystems = document.getElementById("chartSystems").getContext("2d");
    charts.systems = new Chart(ctxSystems, {
        type: 'bar',
        data: {
            labels: systemLabels,
            datasets: [{
                label: 'Cantidad',
                data: systemData,
                backgroundColor: '#d91439',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });
}

// --- AVERIAS TAB RENDERING & CRUD ---
function renderDefectsTable(defectsList) {
    const tbody = document.getElementById("defectsTbody");
    tbody.innerHTML = "";

    if (defectsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; color: var(--text-muted);">No se encontraron averías registradas.</td></tr>`;
        return;
    }

    // Sort descending by date & time
    const sorted = [...defectsList].sort((a, b) => {
        const datetimeA = new Date(a.dateReport + "T" + a.timeReport);
        const datetimeB = new Date(b.dateReport + "T" + b.timeReport);
        return datetimeB - datetimeA;
    });

    sorted.forEach(d => {
        const tr = document.createElement("tr");
        
        const badgeStatusClass = `badge-${d.status.toLowerCase().replace(" ", "-")}`;
        const badgeSevClass = `badge-${d.severity.toLowerCase()}`;
        const formattedDays = d.daysStop !== "" && d.daysStop !== undefined ? d.daysStop : "-";

        tr.innerHTML = `
            <td><strong>#${d.id}</strong></td>
            <td>
                <div style="font-weight: 500;">${d.dateReport}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${d.timeReport}</div>
            </td>
            <td><span style="font-weight: 600; color: #1e293b;">${escapeHtml(d.plate)}</span></td>
            <td><div style="max-width: 140px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(d.driver)}">${escapeHtml(d.driver)}</div></td>
            <td><div style="max-width: 250px; font-weight: 500;" title="${escapeHtml(d.description)}">${escapeHtml(d.description)}</div></td>
            <td><span style="font-size: 0.75rem; font-weight: 600;">${d.system}</span></td>
            <td><span class="badge ${badgeSevClass}">${d.severity}</span></td>
            <td>${d.dateRepair || "-"}</td>
            <td><span style="font-weight: 600;">${formattedDays}</span></td>
            <td><span class="badge ${badgeStatusClass}">${d.status}</span></td>
            <td>
                <div class="actions-group">
                    <button class="btn btn-secondary btn-icon btn-sm editDefectBtn" data-id="${d.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-icon btn-sm deleteDefectBtn" data-id="${d.id}" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Attach actions
    tbody.querySelectorAll(".editDefectBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            openDefectModal(id);
        });
    });

    tbody.querySelectorAll(".deleteDefectBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            if (confirm(`¿Estás seguro de eliminar el reporte de avería #${id}?`)) {
                deleteDefect(id);
            }
        });
    });
}

function filterDefectsTable() {
    const query = document.getElementById("filterDefectSearch").value.toLowerCase();
    const system = document.getElementById("filterDefectSystem").value;
    const severity = document.getElementById("filterDefectSeverity").value;
    const status = document.getElementById("filterDefectStatus").value;

    const filtered = state.defects.filter(d => {
        const matchesQuery = d.plate.toLowerCase().includes(query) ||
                             d.driver.toLowerCase().includes(query) ||
                             d.description.toLowerCase().includes(query) ||
                             d.obs.toLowerCase().includes(query) ||
                             String(d.id).includes(query);
                             
        const matchesSystem = system === "" || d.system === system;
        const matchesSeverity = severity === "" || d.severity === severity;
        const matchesStatus = status === "" || d.status === status;

        return matchesQuery && matchesSystem && matchesSeverity && matchesStatus;
    });

    renderDefectsTable(filtered);
}

function openDefectModal(id = null) {
    const modal = document.getElementById("defectModal");
    const form = document.getElementById("defectForm");
    form.reset();

    // Populate selectors
    const plateSelect = document.getElementById("defectPlate");
    plateSelect.innerHTML = state.fleet.map(u => `<option value="${u.plate}">${u.plate} - ${u.desc}</option>`).join("");

    const driverSelect = document.getElementById("defectDriver");
    driverSelect.innerHTML = state.drivers.sort((a,b) => a.name.localeCompare(b.name)).map(d => `<option value="${d.name}">${d.name}</option>`).join("");

    if (id !== null) {
        // Edit Mode
        const d = state.defects.find(def => def.id === id);
        if (!d) return;

        document.getElementById("defectModalTitle").innerText = `Editar Avería #${id}`;
        document.getElementById("defectId").value = d.id;
        document.getElementById("defectDate").value = d.dateReport;
        document.getElementById("defectTime").value = d.timeReport;
        document.getElementById("defectPlate").value = d.plate;
        document.getElementById("defectDriver").value = d.driver;
        document.getElementById("defectDescription").value = d.description;
        document.getElementById("defectSystem").value = d.system;
        document.getElementById("defectSeverity").value = d.severity;
        document.getElementById("defectStatus").value = d.status;
        document.getElementById("defectRepairDate").value = d.dateRepair || "";
        document.getElementById("defectRepairTime").value = d.timeRepair || "";
        document.getElementById("defectObservations").value = d.obs || "";
        
        toggleRepairFields(d.status);
    } else {
        // Create Mode
        document.getElementById("defectModalTitle").innerText = "Registrar Nueva Avería";
        document.getElementById("defectId").value = "";
        resetFormDates();
        toggleRepairFields("PENDIENTE");
    }

    modal.style.display = "flex";
}

function handleDefectSubmit(e) {
    e.preventDefault();

    const idVal = document.getElementById("defectId").value;
    const dateVal = document.getElementById("defectDate").value;
    const timeVal = document.getElementById("defectTime").value;
    const plateVal = document.getElementById("defectPlate").value;
    const driverVal = document.getElementById("defectDriver").value;
    const descVal = document.getElementById("defectDescription").value;
    const systemVal = document.getElementById("defectSystem").value;
    const severityVal = document.getElementById("defectSeverity").value;
    const statusVal = document.getElementById("defectStatus").value;
    const repairDateVal = document.getElementById("defectRepairDate").value;
    const repairTimeVal = document.getElementById("defectRepairTime").value;
    const obsVal = document.getElementById("defectObservations").value;

    const daysStopVal = statusVal === "REPARADO" ? calculateDaysStop(dateVal, timeVal, repairDateVal, repairTimeVal) : "";

    const defectData = {
        dateReport: dateVal,
        timeReport: timeVal,
        plate: plateVal,
        driver: driverVal,
        description: descVal,
        system: systemVal,
        severity: severityVal,
        status: statusVal,
        dateRepair: statusVal === "REPARADO" ? repairDateVal : "",
        timeRepair: statusVal === "REPARADO" ? repairTimeVal : "",
        obs: obsVal,
        daysStop: daysStopVal
    };

    if (idVal) {
        // Update
        const id = parseInt(idVal);
        const idx = state.defects.findIndex(d => d.id === id);
        if (idx !== -1) {
            const updatedDefect = { id, ...defectData };
            state.defects[idx] = updatedDefect;
            
            if (supabaseClient) {
                supabaseClient.from('defects').upsert(jsDefectToDB(updatedDefect)).then(({error}) => {
                    if (error) console.error("Error al actualizar avería en Supabase:", error);
                });
            }
        }
    } else {
        // Insert
        const nextId = state.defects.length > 0 ? Math.max(...state.defects.map(d => d.id)) + 1 : 1;
        const newDefect = { id: nextId, ...defectData };
        state.defects.push(newDefect);
        
        if (supabaseClient) {
            supabaseClient.from('defects').insert(jsDefectToDB(newDefect)).then(({error}) => {
                if (error) console.error("Error al guardar avería en Supabase:", error);
            });
        }
    }

    saveToLocalStorage();
    closeAllModals();
    filterDefectsTable();
}

function deleteDefect(id) {
    state.defects = state.defects.filter(d => d.id !== id);
    saveToLocalStorage();
    filterDefectsTable();
    
    if (supabaseClient) {
        supabaseClient.from('defects').delete().eq('id', id).then(({error}) => {
            if (error) console.error("Error al eliminar avería de Supabase:", error);
        });
    }
}

// --- FLOTA TAB RENDERING & CRUD ---
function renderFleetTable() {
    const tbody = document.getElementById("fleetTbody");
    tbody.innerHTML = "";

    if (state.fleet.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No hay vehículos registrados en la flota.</td></tr>`;
        return;
    }

    const sortedFleet = [...state.fleet].sort((a, b) => {
        const isACompacta = a.type === "COMPACTA";
        const isBCompacta = b.type === "COMPACTA";
        
        if (isACompacta && !isBCompacta) return -1;
        if (!isACompacta && isBCompacta) return 1;
        
        if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
        }
        return a.plate.localeCompare(b.plate);
    });

    sortedFleet.forEach(u => {
        const totalIncidents = state.defects.filter(d => d.plate === u.plate).length;
        const opStatus = getUnitOperationalStatus(u.plate);
        const statusBadgeClass = opStatus === "OPERATIVA" ? "badge-operativa" : "badge-inoperativa";
        const statusLabel = opStatus === "OPERATIVA" ? "🟢 Operativa" : "🔴 Inoperativa";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong style="color: #1e293b;">${escapeHtml(u.plate)}</strong></td>
            <td>${escapeHtml(u.desc)}</td>
            <td><span class="badge" style="background-color: #f1f5f9; color: #475569;">${u.type}</span></td>
            <td>${escapeHtml(u.brand)}</td>
            <td>${escapeHtml(u.year)}</td>
            <td><span class="badge ${statusBadgeClass}">${statusLabel}</span></td>
            <td><span style="font-weight: 600;">${totalIncidents}</span></td>
            <td>
                <div class="actions-group">
                    <button class="btn btn-secondary btn-icon btn-sm editUnitBtn" data-plate="${escapeHtml(u.plate)}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-icon btn-sm deleteUnitBtn" data-plate="${escapeHtml(u.plate)}" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Attach actions
    tbody.querySelectorAll(".editUnitBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const plate = btn.getAttribute("data-plate");
            openUnitModal(plate);
        });
    });

    tbody.querySelectorAll(".deleteUnitBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const plate = btn.getAttribute("data-plate");
            const incidents = state.defects.filter(d => d.plate === plate).length;
            
            let msg = `¿Estás seguro de eliminar el vehículo ${plate} de la flota?`;
            if (incidents > 0) {
                msg += `\nATENCIÓN: Se eliminarán también las ${incidents} averías históricas registradas para esta unidad.`;
            }

            if (confirm(msg)) {
                deleteUnit(plate);
            }
        });
    });
}

function openUnitModal(plate = null) {
    const modal = document.getElementById("unitModal");
    const form = document.getElementById("unitForm");
    form.reset();

    const plateInput = document.getElementById("unitPlate");

    if (plate !== null) {
        // Edit Mode
        const u = state.fleet.find(unit => unit.plate === plate);
        if (!u) return;

        document.getElementById("unitModalTitle").innerText = `Editar Vehículo: ${plate}`;
        document.getElementById("unitIsEdit").value = "true";
        plateInput.value = u.plate;
        plateInput.disabled = true; // Disable key edit
        document.getElementById("unitDesc").value = u.desc;
        document.getElementById("unitType").value = u.type;
        document.getElementById("unitBrand").value = u.brand;
        document.getElementById("unitYear").value = u.year;
    } else {
        // Create Mode
        document.getElementById("unitModalTitle").innerText = "Registrar Nuevo Vehículo";
        document.getElementById("unitIsEdit").value = "false";
        plateInput.disabled = false;
    }

    modal.style.display = "flex";
}

function handleUnitSubmit(e) {
    e.preventDefault();

    const plateVal = document.getElementById("unitPlate").value.trim().toUpperCase();
    const descVal = document.getElementById("unitDesc").value.trim();
    const typeVal = document.getElementById("unitType").value;
    const brandVal = document.getElementById("unitBrand").value.trim();
    const yearVal = document.getElementById("unitYear").value.trim();
    const isEdit = document.getElementById("unitIsEdit").value === "true";

    if (!plateVal) return;

    const unitObj = { plate: plateVal, desc: descVal, type: typeVal, brand: brandVal, year: yearVal };

    if (isEdit) {
        const idx = state.fleet.findIndex(u => u.plate === plateVal);
        if (idx !== -1) {
            state.fleet[idx] = unitObj;
            
            if (supabaseClient) {
                supabaseClient.from('fleet').upsert(jsFleetToDB(unitObj)).then(({error}) => {
                    if (error) console.error("Error al actualizar vehículo en Supabase:", error);
                });
            }
        }
    } else {
        // Check duplicate
        if (state.fleet.some(u => u.plate === plateVal)) {
            alert(`Ya existe un vehículo registrado con la placa ${plateVal}.`);
            return;
        }
        state.fleet.push(unitObj);
        
        if (supabaseClient) {
            supabaseClient.from('fleet').insert(jsFleetToDB(unitObj)).then(({error}) => {
                if (error) console.error("Error al guardar vehículo en Supabase:", error);
            });
        }
    }

    saveToLocalStorage();
    closeAllModals();
    renderFleetTable();
}

function deleteUnit(plate) {
    state.fleet = state.fleet.filter(u => u.plate !== plate);
    // Delete corresponding defects to preserve referential integrity
    state.defects = state.defects.filter(d => d.plate !== plate);
    
    saveToLocalStorage();
    renderFleetTable();
    
    if (supabaseClient) {
        supabaseClient.from('fleet').delete().eq('plate', plate).then(({error}) => {
            if (error) console.error("Error al eliminar vehículo de Supabase:", error);
        });
        supabaseClient.from('defects').delete().eq('plate', plate).then(({error}) => {
            if (error) console.error("Error al eliminar averías asociadas de Supabase:", error);
        });
    }
}

// --- CONDUCTORES TAB RENDERING & CRUD ---
function renderDriversTable() {
    const tbody = document.getElementById("driversTbody");
    tbody.innerHTML = "";

    const query = document.getElementById("filterDriverSearch") ? document.getElementById("filterDriverSearch").value.toLowerCase() : "";

    if (state.drivers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No hay conductores registrados.</td></tr>`;
        return;
    }

    const filtered = state.drivers.filter(d => {
        const nameMatch = d.name.toLowerCase().includes(query);
        const dniMatch = (d.dni || "").toLowerCase().includes(query);
        const licenseMatch = (d.license || "").toLowerCase().includes(query);
        const contactMatch = (d.contact || "").toLowerCase().includes(query);
        return nameMatch || dniMatch || licenseMatch || contactMatch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No se encontraron conductores con el criterio de búsqueda.</td></tr>`;
        return;
    }

    const sortedDrivers = [...filtered].sort((a,b) => a.name.localeCompare(b.name));

    sortedDrivers.forEach(d => {
        const totalReports = state.defects.filter(def => def.driver === d.name).length;
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong style="color: #1e293b;">${escapeHtml(d.name)}</strong></td>
            <td>${escapeHtml(d.dni || "-")}</td>
            <td>${escapeHtml(d.license || "-")}</td>
            <td>${escapeHtml(d.contact || "-")}</td>
            <td><span style="font-weight: 600;">${totalReports}</span></td>
            <td>
                <div class="actions-group">
                    <button class="btn btn-secondary btn-icon btn-sm editDriverBtn" data-name="${escapeHtml(d.name)}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-icon btn-sm deleteDriverBtn" data-name="${escapeHtml(d.name)}" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Attach actions
    tbody.querySelectorAll(".editDriverBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.getAttribute("data-name");
            openDriverModal(name);
        });
    });

    tbody.querySelectorAll(".deleteDriverBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.getAttribute("data-name");
            if (confirm(`¿Estás seguro de eliminar al conductor "${name}" del registro?`)) {
                deleteDriver(name);
            }
        });
    });
}

function openDriverModal(name = null) {
    const modal = document.getElementById("driverModal");
    const form = document.getElementById("driverForm");
    form.reset();

    if (name !== null) {
        const d = state.drivers.find(drv => drv.name === name);
        if (!d) return;

        document.getElementById("driverModalTitle").innerText = "Editar Conductor";
        document.getElementById("driverIsEdit").value = "true";
        document.getElementById("driverOldName").value = d.name;
        document.getElementById("driverName").value = d.name;
        document.getElementById("driverDni").value = d.dni || "";
        document.getElementById("driverLicense").value = d.license || "";
        document.getElementById("driverContact").value = d.contact || "";
    } else {
        document.getElementById("driverModalTitle").innerText = "Registrar Conductor";
        document.getElementById("driverIsEdit").value = "false";
        document.getElementById("driverOldName").value = "";
        document.getElementById("driverDni").value = "";
        document.getElementById("driverLicense").value = "";
    }

    modal.style.display = "flex";
}

function handleDriverSubmit(e) {
    e.preventDefault();

    const nameVal = document.getElementById("driverName").value.trim().toUpperCase();
    const dniVal = document.getElementById("driverDni").value.trim();
    const licenseVal = document.getElementById("driverLicense").value.trim();
    const contactVal = document.getElementById("driverContact").value.trim();
    const isEdit = document.getElementById("driverIsEdit").value === "true";
    const oldName = document.getElementById("driverOldName").value;

    if (!nameVal) return;

    const driverObj = { name: nameVal, dni: dniVal, license: licenseVal, contact: contactVal };

    if (isEdit) {
        const idx = state.drivers.findIndex(d => d.name === oldName);
        if (idx !== -1) {
            state.drivers[idx] = driverObj;
        }
        
        // Update name in defects table if changed
        if (oldName !== nameVal) {
            state.defects.forEach(d => {
                if (d.driver === oldName) {
                    d.driver = nameVal;
                }
            });
        }

        if (supabaseClient) {
            if (oldName !== nameVal) {
                // Delete old pk record and insert new one
                supabaseClient.from('drivers').delete().eq('name', oldName).then(() => {
                    supabaseClient.from('drivers').insert(driverObj);
                });
                // Update driver name in defects table
                supabaseClient.from('defects').update({ driver: nameVal }).eq('driver', oldName);
            } else {
                supabaseClient.from('drivers').upsert(driverObj);
            }
        }
    } else {
        // Check duplicate
        if (state.drivers.some(d => d.name === nameVal)) {
            alert(`El conductor "${nameVal}" ya se encuentra registrado.`);
            return;
        }
        state.drivers.push(driverObj);
        
        if (supabaseClient) {
            supabaseClient.from('drivers').insert(driverObj).then(({error}) => {
                if (error) console.error("Error al guardar conductor en Supabase:", error);
            });
        }
    }

    saveToLocalStorage();
    closeAllModals();
    renderDriversTable();
}

function deleteDriver(name) {
    state.drivers = state.drivers.filter(d => d.name !== name);
    // Note: We do NOT delete the defects because historical records need to remain intact.
    // Instead we can keep the driver name as a string, which is fine since the schema is loose.
    saveToLocalStorage();
    renderDriversTable();
    
    if (supabaseClient) {
        supabaseClient.from('drivers').delete().eq('name', name).then(({error}) => {
            if (error) console.error("Error al eliminar conductor de Supabase:", error);
        });
    }
}

// --- HISTORIAL TAB SEARCH ---
function populateHistoryPlateSelect() {
    const select = document.getElementById("historyPlateSelect");
    select.innerHTML = '<option value="">-- Seleccionar Placa --</option>';
    
    const sorted = [...state.fleet].sort((a,b) => a.plate.localeCompare(b.plate));
    sorted.forEach(u => {
        select.innerHTML += `<option value="${u.plate}">${u.plate} - ${u.desc}</option>`;
    });
}

function handleHistorySearch() {
    const plate = document.getElementById("historyPlateSelect").value;
    const tbody = document.getElementById("historyTbody");
    const summaryBox = document.getElementById("historyVehicleSummary");
    
    tbody.innerHTML = "";
    
    if (!plate) {
        summaryBox.style.display = "none";
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted);">Selecciona una placa para ver su historial.</td></tr>`;
        return;
    }

    const unit = state.fleet.find(u => u.plate === plate);
    if (!unit) return;

    // Load Summary details
    const unitDefects = state.defects.filter(d => d.plate === plate);
    const activeCount = unitDefects.filter(d => d.status !== "REPARADO").length;
    const resolvedCount = unitDefects.length - activeCount;
    const opStatus = getUnitOperationalStatus(plate);
    const statusBadgeClass = opStatus === "OPERATIVA" ? "badge-operativa" : "badge-inoperativa";
    const statusLabel = opStatus === "OPERATIVA" ? "🟢 OPERATIVA (Disponible)" : "🔴 INOPERATIVA (En Taller/Reportado)";

    summaryBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary);">${escapeHtml(unit.plate)} - ${escapeHtml(unit.desc)}</h3>
                <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">
                    ${unit.type} | Marca: ${unit.brand} | Año: ${unit.year}
                </span>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: center;">
                <span class="badge ${statusBadgeClass}" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">${statusLabel}</span>
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">
                    Historial: ${activeCount} Activas / ${resolvedCount} Reparadas
                </span>
            </div>
        </div>
    `;
    summaryBox.style.display = "block";

    if (unitDefects.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2rem;">Esta unidad no cuenta con reportes de averías registrados.</td></tr>`;
        return;
    }

    // Sort descending by date & time
    const sorted = [...unitDefects].sort((a, b) => {
        const datetimeA = new Date(a.dateReport + "T" + a.timeReport);
        const datetimeB = new Date(b.dateReport + "T" + b.timeReport);
        return datetimeB - datetimeA;
    });

    sorted.forEach(d => {
        const tr = document.createElement("tr");
        const badgeStatusClass = `badge-${d.status.toLowerCase().replace(" ", "-")}`;
        const badgeSevClass = `badge-${d.severity.toLowerCase()}`;
        const formattedDays = d.daysStop !== "" && d.daysStop !== undefined ? d.daysStop : "-";

        tr.innerHTML = `
            <td>
                <div style="font-weight: 500;">${d.dateReport}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${d.timeReport}</div>
            </td>
            <td>${escapeHtml(d.driver)}</td>
            <td><strong>${escapeHtml(d.description)}</strong></td>
            <td>${d.system}</td>
            <td><span class="badge ${badgeSevClass}">${d.severity}</span></td>
            <td>${d.dateRepair || "-"}</td>
            <td><span style="font-weight: 600;">${formattedDays}</span></td>
            <td><span class="badge ${badgeStatusClass}">${d.status}</span></td>
            <td style="color: var(--text-muted); font-size: 0.8rem;">${escapeHtml(d.obs || "-")}</td>
        `;
        tbody.appendChild(tr);
    });
}

// --- BACKUP & RESTORE DATA ---
function exportDatabase() {
    const backup = {
        version: "1.2.0",
        exportDate: new Date().toISOString(),
        fleet: state.fleet,
        drivers: state.drivers,
        defects: state.defects
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `respaldo_averias_flota_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importDatabase(e) {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);
            if (importedData.fleet && importedData.drivers && importedData.defects) {
                if (confirm("¿Estás seguro de sobrescribir los datos actuales del navegador con este archivo de respaldo?")) {
                    state.fleet = importedData.fleet;
                    state.drivers = importedData.drivers;
                    state.defects = importedData.defects;
                    
                    saveToLocalStorage();
                    alert("Base de datos restaurada correctamente.");
                    // Reload to update views cleanly
                    window.location.reload();
                }
            } else {
                alert("El archivo JSON no tiene el formato correcto de base de datos de control de averías.");
            }
        } catch (error) {
            alert("Error al procesar el archivo de respaldo: " + error.message);
        }
    };
    fileReader.readAsText(file);
}

function resetDatabaseToDefault() {
    if (confirm("¿Deseas restablecer la base de datos a sus valores iniciales de demostración?\nEsto borrará todos los cambios nuevos que hayas realizado.")) {
        localStorage.removeItem("petro_fleet");
        localStorage.removeItem("petro_drivers");
        localStorage.removeItem("petro_defects");
        
        initDatabase();
        alert("Base de datos restablecida correctamente.");
        window.location.reload();
    }
}

// --- UTILITY ---
function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}
