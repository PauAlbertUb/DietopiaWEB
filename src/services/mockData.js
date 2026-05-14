export const MOCK_USER = {
  name: "Alex García",
  email: "alex@example.com",
  avatar: "🧑‍💻",
  weight: 75,
  height: 175,
  age: 28,
  goal: "lose_weight",
  goalLabel: "Perder peso",
  restrictions: ["lactose_free"],
  budget: 60,
  planningType: "weekly",
  daysActive: 12,
  streak: 5,
  compliance: 78,
}

export const MOCK_MEAL_PLAN = {
  week: "28 Abr – 7 May 2025",
  calories_target: 1800,
  days: [
    {
      id: 0,
      day: "Lunes",
      date: "28 Abr",
      meals: {
        breakfast: { id: "b0", name: "Avena con frutas del bosque", emoji: "🍓", calories: 320, time: "8:00", tags: ["Sin lactosa", "Alto en fibra"], ingredients: ["80g avena", "150ml leche de avena", "50g arándanos", "1 cucharada de miel"], recipe: "Mezcla la avena con la leche de avena y calienta 2 min en microondas. Añade los arándanos y la miel por encima.", macros: { protein: 10, carbs: 58, fat: 6 } },
        lunch: { id: "l0", name: "Ensalada de pollo y aguacate", emoji: "🥗", calories: 480, time: "13:30", tags: ["Alto en proteína", "Fresco"], ingredients: ["150g pechuga de pollo", "1 aguacate", "100g lechuga mixta", "Tomates cherry", "Aceite de oliva"], recipe: "Cocina el pollo a la plancha. Mezcla la lechuga, el aguacate y los tomates. Añade el pollo y aliña con aceite.", macros: { protein: 38, carbs: 14, fat: 22 } },
        snack: { id: "s0", name: "Manzana con almendras", emoji: "🍎", calories: 200, time: "16:30", tags: ["Natural"], ingredients: ["1 manzana grande", "20g almendras"], recipe: "Sirve la manzana cortada en gajos junto con las almendras.", macros: { protein: 4, carbs: 28, fat: 9 } },
        dinner: { id: "d0", name: "Salmón al vapor con brócoli", emoji: "🐟", calories: 420, time: "20:30", tags: ["Omega-3", "Sin gluten"], ingredients: ["200g salmón", "200g brócoli", "1 limón", "Eneldo", "Aceite de oliva"], recipe: "Cocina el salmón al vapor 12 min. Cuece el brócoli 5 min. Sirve con zumo de limón y eneldo.", macros: { protein: 36, carbs: 10, fat: 24 } }
      }
    },
    {
      id: 1,
      day: "Martes",
      date: "29 Abr",
      meals: {
        breakfast: { id: "b1", name: "Tostadas de aguacate y huevo", emoji: "🥑", calories: 380, time: "8:00", tags: ["Alto en proteína"], ingredients: ["2 rebanadas pan integral", "1 aguacate", "2 huevos", "Sal", "Pimienta"], recipe: "Tuesta el pan, aplasta el aguacate y ponlo encima. Cuece los huevos al gusto y añádelos.", macros: { protein: 18, carbs: 42, fat: 18 } },
        lunch: { id: "l1", name: "Lentejas con verduras", emoji: "🫘", calories: 520, time: "13:30", tags: ["Alto en fibra", "Vegetariano"], ingredients: ["150g lentejas cocidas", "200g verduras mixtas", "1 cebolla", "Aceite de oliva", "Especias"], recipe: "Sofríe la cebolla, añade las lentejas cocidas y las verduras. Sazona y deja cocinar 10 min.", macros: { protein: 18, carbs: 65, fat: 8 } },
        snack: { id: "s1", name: "Yogur natural con granola", emoji: "🥣", calories: 220, time: "16:30", tags: ["Probióticos"], ingredients: ["200ml yogur natural", "40g granola", "Miel"], recipe: "Sirve el yogur en un cuenco, añade la granola y un chorrito de miel.", macros: { protein: 8, carbs: 42, fat: 3 } },
        dinner: { id: "d1", name: "Pechuga de pollo asada con patatas", emoji: "🍗", calories: 450, time: "20:30", tags: ["Bajo en grasa"], ingredients: ["200g pechuga de pollo", "200g patatas", "Verduras", "Hierbas"], recipe: "Asa el pollo a 200°C durante 20 min. Las patatas en horno con los mismos condimentos.", macros: { protein: 40, carbs: 45, fat: 8 } },
        nightSnack: { id: "n1", name: "Infusión y nueces", emoji: "☕", calories: 110, time: "22:00", tags: ["Ligero"], ingredients: ["1 infusión", "15g nueces"], recipe: "Prepara una infusión y acompaña con nueces crudas.", macros: { protein: 3, carbs: 4, fat: 9 } }
      }
    },
    {
      id: 2,
      day: "Miércoles",
      date: "30 Abr",
      meals: {
        breakfast: { id: "b2", name: "Batido verde energético", emoji: "🥤", calories: 290, time: "7:30", tags: ["Vegano", "Energizante"], ingredients: ["1 plátano", "1 puñado de espinacas", "200ml leche de almendras", "1 kiwi"], recipe: "Tritura todos los ingredientes en la batidora hasta obtener una mezcla suave.", macros: { protein: 6, carbs: 54, fat: 5 } },
        lunch: { id: "l2", name: "Pasta con salsa de tomate y atún", emoji: "🍝", calories: 560, time: "14:00", tags: ["Alto en proteína"], ingredients: ["180g pasta integral", "1 lata de atún", "Salsa de tomate casera", "Albahaca"], recipe: "Cuece la pasta. Mezcla con la salsa de tomate y el atún. Sirve con albahaca fresca.", macros: { protein: 32, carbs: 76, fat: 10 } },
        snack: { id: "s2", name: "Plátano y nueces", emoji: "🍌", calories: 190, time: "16:30", tags: ["Natural", "Energía rápida"], ingredients: ["1 plátano", "20g nueces"], recipe: "Sirve el plátano con las nueces.", macros: { protein: 4, carbs: 30, fat: 8 } },
        dinner: { id: "d2", name: "Tortilla de verduras", emoji: "🥚", calories: 360, time: "20:00", tags: ["Vegetariano"], ingredients: ["3 huevos", "1 pimiento", "1 cebolla", "1 calabacín", "Aceite de oliva"], recipe: "Sofríe las verduras. Bate los huevos y mézclalos. Cuaja en la sartén a fuego medio.", macros: { protein: 22, carbs: 18, fat: 22 } }
      }
    },
    {
      id: 3,
      day: "Jueves",
      date: "1 May",
      meals: {
        breakfast: { id: "b3", name: "Pancakes de avena y plátano", emoji: "🥞", calories: 400, time: "8:30", tags: ["Sin gluten", "Dulce natural"], ingredients: ["100g avena molida", "1 plátano", "2 huevos", "1 cucharadita de canela"], recipe: "Tritura todos los ingredientes. Cuaja pequeñas tortitas en sartén antiadherente 2 min por lado.", macros: { protein: 16, carbs: 62, fat: 10 } },
        lunch: { id: "l3", name: "Ensalada de garbanzos", emoji: "🥙", calories: 490, time: "13:30", tags: ["Vegano", "Alto en fibra"], ingredients: ["200g garbanzos cocidos", "Pepino", "Tomate", "Cebolla morada", "Perejil", "Limón"], recipe: "Mezcla todos los ingredientes. Aliña con zumo de limón y aceite de oliva.", macros: { protein: 20, carbs: 64, fat: 12 } },
        snack: { id: "s3", name: "Naranja y pistachos", emoji: "🍊", calories: 180, time: "17:00", tags: ["Natural"], ingredients: ["1 naranja grande", "20g pistachos"], recipe: "Pela la naranja y sirve con los pistachos.", macros: { protein: 5, carbs: 26, fat: 7 } },
        dinner: { id: "d3", name: "Merluza al ajillo con espárragos", emoji: "🐠", calories: 380, time: "20:30", tags: ["Bajo en calorías", "Sin gluten"], ingredients: ["200g merluza", "10 espárragos", "4 dientes de ajo", "Aceite de oliva", "Perejil"], recipe: "Dora el ajo en aceite. Añade la merluza y cuece 8 min. Sirve con espárragos a la plancha.", macros: { protein: 38, carbs: 8, fat: 18 } },
        nightSnack: { id: "n3", name: "Yogur con semillas", emoji: "🥄", calories: 120, time: "22:00", tags: ["Ligero"], ingredients: ["125g yogur natural", "1 cucharada de chía"], recipe: "Mezcla el yogur con semillas de chía y deja reposar 10 min.", macros: { protein: 7, carbs: 8, fat: 4 } }
      }
    },
    {
      id: 4,
      day: "Viernes",
      date: "2 May",
      meals: {
        breakfast: { id: "b4", name: "Chia pudding con mango", emoji: "🥭", calories: 310, time: "8:00", tags: ["Sin lactosa", "Omega-3"], ingredients: ["40g semillas de chía", "250ml leche de coco", "1/2 mango", "1 cucharadita de vainilla"], recipe: "Mezcla chía con leche de coco. Refrigera toda la noche. Sirve con mango troceado.", macros: { protein: 8, carbs: 42, fat: 14 } },
        lunch: { id: "l4", name: "Bowl de arroz con verduras", emoji: "🍱", calories: 530, time: "13:30", tags: ["Vegano", "Equilibrado"], ingredients: ["150g arroz integral", "Edamame", "Zanahoria", "Pepino", "Salsa de soja", "Sésamo"], recipe: "Cuece el arroz. Prepara las verduras. Monta el bowl y aliña con salsa de soja y sésamo.", macros: { protein: 18, carbs: 84, fat: 8 } },
        snack: { id: "s4", name: "Barritas de dátil y avena", emoji: "🍫", calories: 240, time: "16:30", tags: ["Natural", "Energía sostenida"], ingredients: ["100g dátiles", "60g avena", "20g almendras trituradas"], recipe: "Tritura los dátiles. Mezcla con avena y almendras. Compacta y refrigera 1 hora. Corta en barras.", macros: { protein: 6, carbs: 44, fat: 7 } },
        dinner: { id: "d4", name: "Pizza de coliflor con tomate", emoji: "🍕", calories: 420, time: "20:30", tags: ["Sin gluten", "Bajo en carbos"], ingredients: ["1 coliflor grande", "2 huevos", "Salsa de tomate", "Orégano", "Verduras al gusto"], recipe: "Tritura la coliflor. Mezcla con huevos. Forma la base y hornea 20 min. Añade toppings y hornea 10 min más.", macros: { protein: 20, carbs: 32, fat: 18 } }
      }
    },
    {
      id: 5,
      day: "Sábado",
      date: "3 May",
      meals: {
        breakfast: { id: "b5", name: "Granola casera con frutas", emoji: "🫐", calories: 360, time: "9:00", tags: ["Vegano"], ingredients: ["80g granola", "200ml leche de almendras", "1 puñado de fresas", "1 kiwi"], recipe: "Sirve la granola con la leche de almendras. Añade las frutas por encima.", macros: { protein: 8, carbs: 62, fat: 12 } },
        lunch: { id: "l5", name: "Tacos de tofu y aguacate", emoji: "🌮", calories: 510, time: "14:00", tags: ["Vegano", "Sin gluten"], ingredients: ["200g tofu firme", "2 tortillas de maíz", "1 aguacate", "Pico de gallo", "Lima"], recipe: "Marina el tofu y cocínalo a la plancha. Monta los tacos con aguacate y pico de gallo. Añade zumo de lima.", macros: { protein: 22, carbs: 48, fat: 22 } },
        snack: { id: "s5", name: "Smoothie de fresas", emoji: "🍓", calories: 170, time: "17:00", tags: ["Bajo en calorías"], ingredients: ["150g fresas", "100ml yogur de coco", "1 cucharadita de miel"], recipe: "Tritura todos los ingredientes hasta que quede cremoso.", macros: { protein: 4, carbs: 34, fat: 3 } },
        dinner: { id: "d5", name: "Paella de verduras", emoji: "🥘", calories: 550, time: "21:00", tags: ["Vegano", "Festivo"], ingredients: ["200g arroz", "Pimiento rojo y verde", "Tomate", "Judías verdes", "Azafrán", "Caldo de verduras"], recipe: "Sofríe las verduras. Añade el arroz y el azafrán. Vierte el caldo caliente y cuece 18 min sin remover.", macros: { protein: 12, carbs: 96, fat: 8 } },
        nightSnack: { id: "n5", name: "Kéfir con avena tostada", emoji: "🥛", calories: 115, time: "22:00", tags: ["Ligero"], ingredients: ["125ml kéfir", "10g avena tostada"], recipe: "Sirve el kéfir y añade avena tostada por encima.", macros: { protein: 6, carbs: 9, fat: 4 } }
      }
    },
    {
      id: 6,
      day: "Domingo",
      date: "4 May",
      meals: {
        breakfast: { id: "b6", name: "Brunch: Huevos Benedict vegano", emoji: "🍳", calories: 440, time: "10:00", tags: ["Vegano", "Especial"], ingredients: ["2 huevos pochados", "Pan integral", "Espinacas", "Tomate", "Salsa holandesa vegana"], recipe: "Pocha los huevos. Tuesta el pan. Monta con espinacas, tomate y salsa holandesa.", macros: { protein: 18, carbs: 46, fat: 20 } },
        lunch: { id: "l6", name: "Sopa de verduras reconfortante", emoji: "🍜", calories: 350, time: "14:00", tags: ["Vegano", "Ligero"], ingredients: ["Zanahoria", "Apio", "Puerro", "Patata", "Caldo de verduras", "Tomillo"], recipe: "Sofríe las verduras. Añade el caldo y cuece 30 min. Tritura parcialmente para cremosidad.", macros: { protein: 8, carbs: 58, fat: 6 } },
        snack: { id: "s6", name: "Uvas y queso vegano", emoji: "🍇", calories: 200, time: "17:00", tags: ["Natural"], ingredients: ["150g uvas", "50g queso vegano"], recipe: "Sirve las uvas lavadas con el queso vegano.", macros: { protein: 6, carbs: 28, fat: 8 } },
        dinner: { id: "d6", name: "Curry de garbanzos y espinacas", emoji: "🍛", calories: 480, time: "20:00", tags: ["Vegano", "Reconfortante"], ingredients: ["200g garbanzos cocidos", "100g espinacas", "Leche de coco", "Curry en polvo", "Cebolla", "Ajo"], recipe: "Sofríe cebolla y ajo. Añade el curry y la leche de coco. Incorpora los garbanzos y las espinacas. Cuece 15 min.", macros: { protein: 16, carbs: 56, fat: 18 } },
        nightSnack: { id: "n6", name: "Infusión y yogur con semillas", emoji: "☕", calories: 120, time: "22:00", tags: ["Ligero", "Digestivo"], ingredients: ["1 infusión", "125g yogur natural", "1 cucharada semillas de chía"], recipe: "Prepara la infusión y acompáñala con un yogur natural mezclado con chía.", macros: { protein: 8, carbs: 10, fat: 5 } }
      }
    },
    {
      id: 7,
      day: "Lunes",
      date: "5 May",
      meals: {
        breakfast: { id: "b7", name: "Bol de yogur griego y avena", emoji: "🥣", calories: 340, time: "8:00", tags: ["Alto en proteína"], ingredients: ["200g yogur griego", "50g avena", "1 plátano", "Canela"], recipe: "Sirve el yogur con la avena y el plátano en rodajas. Termina con canela por encima.", macros: { protein: 22, carbs: 42, fat: 8 } },
        lunch: { id: "l7", name: "Pavo salteado con quinoa", emoji: "🍲", calories: 510, time: "13:30", tags: ["Equilibrado", "Sin gluten"], ingredients: ["150g pavo", "80g quinoa", "Pimiento", "Calabacín", "Ajo"], recipe: "Cuece la quinoa. Saltea el pavo con las verduras y mezcla con la quinoa al final.", macros: { protein: 36, carbs: 40, fat: 14 } },
        snack: { id: "s7", name: "Pera y crema de cacahuete", emoji: "🍐", calories: 210, time: "16:30", tags: ["Energía sostenida"], ingredients: ["1 pera", "1 cucharada crema de cacahuete"], recipe: "Corta la pera en láminas y sirve con una pequeña porción de crema de cacahuete.", macros: { protein: 5, carbs: 24, fat: 10 } },
        dinner: { id: "d7", name: "Crema de calabaza y tofu crujiente", emoji: "🎃", calories: 430, time: "20:30", tags: ["Vegano", "Ligero"], ingredients: ["Calabaza", "Cebolla", "200g tofu", "Pimentón", "Aceite de oliva"], recipe: "Cuece la calabaza con la cebolla y tritura. Dora el tofu con pimentón y sirve encima.", macros: { protein: 24, carbs: 28, fat: 18 } },
        nightSnack: { id: "n7", name: "Kéfir con cacao puro", emoji: "🥛", calories: 110, time: "22:00", tags: ["Probiótico"], ingredients: ["125ml kéfir", "1 cucharadita cacao puro"], recipe: "Mezcla el kéfir con el cacao puro hasta integrar.", macros: { protein: 7, carbs: 9, fat: 4 } }
      }
    },
    {
      id: 8,
      day: "Martes",
      date: "6 May",
      meals: {
        breakfast: { id: "b8", name: "Tostada de ricotta y miel", emoji: "🍯", calories: 310, time: "8:15", tags: ["Rápido"], ingredients: ["2 tostadas integrales", "80g ricotta", "1 cucharadita miel", "Nueces"], recipe: "Tuesta el pan y añade ricotta, miel y nueces troceadas por encima.", macros: { protein: 14, carbs: 34, fat: 12 } },
        lunch: { id: "l8", name: "Burrito bowl de ternera", emoji: "🌯", calories: 560, time: "13:45", tags: ["Completo", "Alto en proteína"], ingredients: ["150g ternera", "Arroz integral", "Maíz", "Tomate", "Lechuga", "Aguacate"], recipe: "Cocina la ternera. Sirve con arroz y verduras en un bol grande.", macros: { protein: 34, carbs: 58, fat: 18 } },
        snack: { id: "s8", name: "Batido de mango", emoji: "🥭", calories: 180, time: "17:00", tags: ["Fresco"], ingredients: ["1 mango", "150ml bebida vegetal", "Hielo"], recipe: "Tritura el mango con la bebida vegetal y hielo hasta que quede cremoso.", macros: { protein: 4, carbs: 30, fat: 4 } },
        dinner: { id: "d8", name: "Bacalao con verduras al horno", emoji: "🐟", calories: 390, time: "20:30", tags: ["Sin gluten", "Ligero"], ingredients: ["200g bacalao", "Zanahoria", "Calabacín", "Patata", "Romero"], recipe: "Hornea el bacalao con las verduras y romero durante 25 min.", macros: { protein: 38, carbs: 22, fat: 14 } },
        nightSnack: { id: "n8", name: "Manzanilla y dátiles", emoji: "🌙", calories: 95, time: "22:00", tags: ["Suave"], ingredients: ["1 infusión", "2 dátiles"], recipe: "Prepara la infusión y acompaña con un par de dátiles.", macros: { protein: 1, carbs: 20, fat: 0 } }
      }
    },
    {
      id: 9,
      day: "Miércoles",
      date: "7 May",
      meals: {
        breakfast: { id: "b9", name: "Porridge de cacao y plátano", emoji: "🥣", calories: 350, time: "8:00", tags: ["Energético"], ingredients: ["60g avena", "200ml leche", "1 plátano", "1 cucharadita cacao"], recipe: "Cocina la avena con leche. Añade el cacao y el plátano en rodajas.", macros: { protein: 12, carbs: 56, fat: 8 } },
        lunch: { id: "l9", name: "Lasaña de verduras", emoji: "🍝", calories: 540, time: "14:00", tags: ["Vegetariano", "Reconfortante"], ingredients: ["Láminas de lasaña", "Calabacín", "Berenjena", "Tomate", "Queso"], recipe: "Montar capas de verduras y pasta. Hornear hasta dorar el queso.", macros: { protein: 24, carbs: 64, fat: 18 } },
        snack: { id: "s9", name: "Kiwi y almendras", emoji: "🥝", calories: 160, time: "17:00", tags: ["Natural"], ingredients: ["2 kiwis", "15g almendras"], recipe: "Pela los kiwis y acompaña con almendras crudas.", macros: { protein: 4, carbs: 18, fat: 8 } },
        dinner: { id: "d9", name: "Tacos de pollo y col", emoji: "🌮", calories: 450, time: "20:30", tags: ["Sin gluten"], ingredients: ["Tortillas de maíz", "Pollo", "Col morada", "Yogur", "Lima"], recipe: "Cocina el pollo, rellena las tortillas y añade salsa de yogur y lima.", macros: { protein: 32, carbs: 36, fat: 16 } },
        nightSnack: { id: "n9", name: "Chocolate negro y fresas", emoji: "🍫", calories: 140, time: "22:00", tags: ["Capricho ligero"], ingredients: ["20g chocolate negro", "4 fresas"], recipe: "Sirve el chocolate en trozos pequeños con fresas frescas.", macros: { protein: 2, carbs: 12, fat: 9 } }
      }
    }
  ]
}

export const TESTIMONIALS = [
  {
    text: "Dietopia me ha ayudado a perder 5kg en un mes sin pasar hambre. ¡Increíble!",
    author: "María",
    role: "Cliente desde hace 2 meses",
    avatar: "👩‍💼"
  },
  {
    text: "La personalización es lo mejor. Come lo que me gusta mientras cuido mi peso.",
    author: "Juan",
    role: "Cliente desde hace 1 mes",
    avatar: "👨‍💼"
  },
  {
    text: "Las recetas son deliciosas y fáciles de preparar. ¡Totalmente recomendado!",
    author: "Sofia",
    role: "Cliente desde hace 3 semanas",
    avatar: "👩"
  }
]
