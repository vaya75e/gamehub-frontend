export const games = [
  {
    id: 1,
    title: "Sons of the Forest",
    isFeatured: true,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://bit.ly/3Uv44xL",
      gallery: [
        "https://bit.ly/4iG1Y5S",
        "https://bit.ly/4zcGAvn",
        "https://bit.ly/48luLIn",
        "https://bit.ly/4ewg8p4",
      ]
    },
    description: "ผู้เล่นต้องออกสำรวจเกาะลึกลับเพื่อตามหามหาเศรษฐีที่หายตัวไป แต่กลับพบกับเกาะที่เต็มไปด้วยมนุษย์กินคนและสิ่งมีชีวิตกลายพันธุ์ ผู้เล่นต้องรวบรวมทรัพยากร สร้างที่พัก คราฟต์อาวุธ และเอาชีวิตรอดจากอันตราย สามารถเล่นคนเดียวหรือร่วมมือกับเพื่อนได้" ,
    downloadLinks: [
      {
        platform: "Steam",
        price: 590,
        url: "https://store.steampowered.com/app/1326470/Sons_Of_The_Forest/"
      }
    ],                  
    genre: ["เอาชีวิตรอด", "แอ็คชั่น" , "ผจญภัย" , "จำลองสถานการณ์" , "สยองขวัญ"],
    players: "1-8",
    type_player: ["ผู้เล่นคนเดียว" , "Co-op"],
  },

  {
    id: 2,
    title: "Slap 'em UP!",
    isFeatured: true,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://bit.ly/48M6yLs",

      gallery: [
        "https://bit.ly/4iQ2uhQ",
        "https://bit.ly/4iOs9r4",
        "https://bit.ly/4jeO3nZ",
        "https://bit.ly/4kiztOp",
      ]
    },
    description: "เกมการ์ดแนวปาร์ตี้ (Casual Party Card Game) ฝีมือคนไทย พัฒนาโดย Urnique Studio ซึ่งหยิบยกกติกาเกมไพ่สลาฟที่ทุกคนคุ้นเคยมาทำใหม่ให้มีความสนุกสนานและกวนโอ๊ยยิ่งขึ้น",
    downloadLinks: [
      {
        platform: "Steam",
        price: 0,
        url: "https://store.steampowered.com/app/3703520/Slap_em_UP/"
      }
    ],                  
    genre: ["เกมการ์ด", "เกมอินดี้" , "เกมปาร์ตี้"],
    players: "1-4",
    type_player: ["ผู้เล่นหลายคน","PvP"],
  },
  {
    id: 3,
    title: "Stardew Valley",
    isFeatured: true,
    isNew: true,
    isPopular: true,
    images: {
      cover: "https://bit.ly/4AuiSMd",

      gallery: [
        "https://bit.ly/4etUlyn",
        "https://bit.ly/3WGaLh1",
        "https://bit.ly/4jeO3nZ",
        "https://bit.ly/4tg66id",
      ]
    },
    description: "เกมแนวจำลองชีวิตและทำฟาร์มผสมผสาน RPG ที่ให้ผู้เล่นเริ่มต้นชีวิตใหม่ในเมืองชนบท โดยได้รับมรดกเป็นฟาร์มเก่าจากคุณปู่ ผู้เล่นจะต้องฟื้นฟูพื้นที่รกร้างให้กลายเป็นฟาร์มที่อุดมสมบูรณ์ สามารถปลูกพืช เลี้ยงสัตว์ ตกปลา ขุดเหมือง และสร้างสิ่งของต่าง ๆ นอกจากนี้ยังสามารถพบปะพูดคุย สร้างมิตรภาพ และพัฒนาความสัมพันธ์กับชาวเมือง รวมถึงสำรวจเรื่องราวและความลับที่ซ่อนอยู่ในหุบเขาได้อย่างอิสระ",
    downloadLinks: [
      {
        platform: "Steam",
        price: 315,
        url: "https://store.steampowered.com/app/413150/Stardew_Valley/"
      }
    ],                  
    genre: ["จำลองสถานการณ์", "ทำฟาร์ม" , "ผจญภัย"],
    players: "1-8",
    type_player: ["ผู้เล่นคนเดียว","Co-op"],
  },
  {
    id: 4,
    title: "MECCHA CHAMELEON",
    isFeatured: true,
    isNew: true,
    isPopular: true,
    images: {
      cover: "https://bit.ly/4sVEHBV",

      gallery: [
        "https://bit.ly/4iBr6w1",
        "https://bit.ly/4iUMriR",
        "https://bit.ly/4k8SGBW",
        "https://bit.ly/4zeMYlG",
      ]
    },
    description: "เกมปาร์ตี้แนวซ่อนหาที่ผู้เล่นต้องระบายสีตัวละครให้กลมกลืนกับฉาก เพื่อหลบซ่อนจากฝ่ายค้นหา โดยต้องใช้ไหวพริบและการสังเกตเพื่อเอาชนะคู่แข่ง สามารถเล่นสนุกกับเพื่อนผ่านระบบออนไลน์ได้",
    downloadLinks: [
      {
        platform: "Steam",
        price: 125,
        url: "https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/"
      }
    ],                  
    genre: ["ปาร์ตี้", "ซ่อนหา"],
    players: "2-10",
    type_player: ["ผู้เล่นหลายคน","Co-op","PvP"],
  },
  {
    id: 5,
    title: "PEAK",
    isFeatured: true,
    isNew: true,
    isPopular: true,
    images: {
      cover: "https://l1nq.com/udmdmir",

      gallery: [
        "https://sl1nk.com/q6y7oq8",
        "https://sl1nk.com/48glaiq",
        "https://sl1nk.com/zzyk78f",
        "https://sl1nk.com/rcxdid8",
      ]
    },
    description: "PEAK เป็นเกมผจญภัยปีนเขาแบบร่วมมือกัน ผู้เล่นจะรับบทเป็นลูกเสือที่ติดอยู่บนเกาะลึกลับ และต้องช่วยกันปีนขึ้นไปยังยอดเขาเพื่อเอาชีวิตรอด ระหว่างทางต้องระวังอุปสรรค จัดการพลังงานและอาการบาดเจ็บ พร้อมใช้อุปกรณ์ช่วยปีนเขา สามารถเล่นคนเดียวหรือร่วมมือกับเพื่อนได้",
    downloadLinks: [
      {
        platform: "Steam",
        price: 159,
        url: "https://store.steampowered.com/app/3527290/PEAK/"
      }
    ],                  
    genre: ["แอ็คชั่น", "ผจญภัย" , "เอาชีวิตรอด"],
    players: "1-4",
    type_player: ["ผู้เล่นคนเดียว","Co-op"],
  },
  {
    id: 6,
    title: "RV There Yet?",
    isFeatured: true,
    isNew: true,
    isPopular: true,
    images: {
      cover: "https://sl1nk.com/brx8f3f",

      gallery: [
        "https://l1nq.com/qbcan77",
        "https://l1nq.com/zr7qix0",
        "https://sl1nk.com/kb5un3b",
        "https://l1nq.com/nq4i6hd",
      ]
    },
    description: "เกมขับรถบ้านผจญภัยที่ผู้เล่นต้องเดินทางกลับบ้านผ่านเส้นทางอันตราย ต้องช่วยกันขับรถ แก้ไขอุปสรรค ใช้อุปกรณ์ลากจูง และเอาชีวิตรอดระหว่างการเดินทาง",
    downloadLinks: [
      {
        platform: "Steam",
        price: 179,
        url: "https://store.steampowered.com/app/3949040/RV_There_Yet/"
      }
    ],                  
    genre: ["แอ็คชั่น", "ผจญภัย" , "จำลองสถานการณ์"],
    players: "1-4",
    type_player: ["ผู้เล่นคนเดียว","Co-op"],
  },
  {
    id: 7,
    title: "Green Hell",
    isFeatured: true,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://sl1nk.com/pd88ype",

      gallery: [
        "https://l1nq.com/n5h1pnf",
        "https://sl1nk.com/b17wgxp",
        "https://sl1nk.com/kgkkte0",
        "https://l1nq.com/1ut3urr",
      ]
    },
    description: "เกมเอาชีวิตรอดในป่าฝนอเมซอน ผู้เล่นต้องหาอาหาร ล่าสัตว์ สร้างที่พัก ประดิษฐ์อุปกรณ์ และดูแลสุขภาพร่างกายและจิตใจเพื่อเอาชีวิตรอดจากป่าที่เต็มไปด้วยอันตราย",
    downloadLinks: [
      {
        platform: "Steam",
        price: 319,
        url: "https://store.steampowered.com/app/815370/Green_Hell/"
      }
    ],                  
    genre: ["เอาชีวิตรอด", "แอ็คชั่น" , "ผจญภัย","จำลองสถานการณ์"],
    players: "1-4",
    type_player: ["ผู้เล่นคนเดียว","Co-op"],
  },
  {
    id: 8,
    title: "Genshin Impact",
    isFeatured: true,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://l1nq.com/oegy9xe",

      gallery: [
        "https://l1nq.com/fznkeri",
        "https://l1nq.com/hqne50a",
        "https://sl1nk.com/1cpb2sg",
        "https://sl1nk.com/zf6q9he",
      ]
    },
    description: "เกมผจญภัยสวมบทบาทในโลกแฟนตาซีแบบเปิด ผู้เล่นออกสำรวจดินแดน Teyvat ต่อสู้ด้วยพลังธาตุ รวบรวมตัวละคร และค้นพบเรื่องราวของโลก",
    downloadLinks: [
      {
        platform: "เว็บไซต์ทางการ",
        price: 0,
        url: "https://genshin.hoyoverse.com/en/home"
      }
    ],                  
    genre: ["แอ็คชั่น", "ผจญภัย" , "สวมบทบาท","แฟนตาซี","โลกเปิด"],
    players: "1-4",
    type_player: ["ผู้เล่นคนเดียว","ผู้เล่นหลายคน","Co-op"],
  },
  {
    id: 9,
    title: "The Sims 3",
    isFeatured: false,
    isNew: false,
    isPopular: false,
    images: {
      cover: "https://sl1nk.com/q9qcjyw",

      gallery: [
        "https://sl1nk.com/9tv2v6q",
        "https://l1nq.com/prj6856",
        "https://l1nq.com/15eh348",
        "https://l1nq.com/jjk6y63",
      ]
    },
    description: "เกมจำลองชีวิตที่ให้ผู้เล่นสร้างตัวละคร กำหนดบุคลิก ออกแบบบ้าน สร้างครอบครัว ทำงาน และใช้ชีวิตในโลกเปิดที่มีอิสระในการเล่น",
    downloadLinks: [
      {
        platform: "Steam",
        price: 539,
        url: "https://store.steampowered.com/app/47890/The_Sims_3/"
      },
      {
        platform: "EA",
        price: 840,
        url: "https://www.ea.com/games/the-sims/the-sims-3?utm_source=chatgpt.com"
      }
    ],                  
    genre: ["จำลองสถานการณ์", "สวมบทบาท"],
    players: "1",
    type_player: ["ผู้เล่นคนเดียว"],
  },
  {  
    id: 10,
    title: "The Sims 4",
    isFeatured: false,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://sl1nk.com/zjt5y8l",

      gallery: [
        "https://l1nq.com/apl9kzz",
        "https://sl1nk.com/fvogsi2",
        "https://l1nq.com/1fk9wk4",
        "https://sl1nk.com/spfdl27",
      ]
    },
    description: "เกมจำลองชีวิตที่ให้ผู้เล่นสร้างตัวละคร ออกแบบบ้าน ทำกิจกรรมในชีวิตประจำวัน สร้างความสัมพันธ์ ทำงาน และกำหนดเรื่องราวชีวิตของตัวละครได้ตามต้องการ",
    downloadLinks: [
      {
        platform: "Steam",
        price: 0,
        url: "https://store.steampowered.com/app/1222670/The_Sims_4/#app_reviews_hash"
      },
      {
        platform: "EA",
        price: 0,
        url: "https://www.ea.com/games/the-sims/the-sims-4?utm_source=chatgpt.com"
      },
      {
        platform: "Epic Games Store",
        price: 0,
        url: "https://store.epicgames.com/p/the-sims-4?utm_source=chatgpt.com"
      }
    ],                  
    genre: ["จำลองสถานการณ์", "สวมบทบาท"],
    players: "1",
    type_player: ["ผู้เล่นคนเดียว"],
  },
  {  
    id: 11,
    title: "3on3 FreeStyle: Rebound",
    isFeatured: true,
    isNew: false,
    isPopular: false,
    images: {
      cover: "https://sl1nk.com/d4adee9",

      gallery: [
        "https://sl1nk.com/e7gxbdx",
        "https://l1nq.com/rp4c05k",
        "https://l1nq.com/z585d80",
        "https://l1nq.com/ub4q52j",
      ]
    },
    description: "เกมบาสเกตบอลแนวสตรีทที่ผู้เล่นเลือกตัวละครและร่วมแข่งขันบาสเกตบอลแบบ 3 ต่อ 3 พร้อมใช้ทักษะเฉพาะตัวในการทำคะแนนและเอาชนะทีมคู่แข่ง",
    downloadLinks: [
      {
        platform: "Steam",
        price: 0,
        url: "https://store.steampowered.com/app/1292630/3on3_FreeStyle_Rebound/"
      }
    ],                  
    genre: ["กีฬา", "แอ็คชั่น"],
    players: "1-6",
    type_player: ["ผู้เล่นคนเดียว","ผู้เล่นหลายคน","Co-op","PvP"],
  },
  {  
    id: 12,
    title: "PratFall",
    isFeatured: false,
    isNew: true,
    isPopular: false,
    images: {
      cover: "https://l1nq.com/t37j0ee",

      gallery: [
        "https://sl1nk.com/17bxfzn",
        "https://sl1nk.com/8wgxtyj",
        "https://sl1nk.com/lq9s5du",
        "https://sl1nk.com/m6fxbyd",
      ]
    },
    description: "เกมผจญภัยแนวร่วมมือกัน ผู้เล่นต้องเดินทางลงไปในถ้ำอันตรายเพื่อช่วยเหลือสุนัขที่หายไป ระหว่างทางต้องขุดดิน หลบกับดัก ระเบิดสิ่งกีดขวาง และช่วยเหลือเพื่อนร่วมทีม",
    downloadLinks: [
      {
        platform: "Steam",
        price: 159,
        url: "https://store.steampowered.com/app/4244510/Pratfall/"
      }
    ],                  
    genre: ["แอ็คชั่น", "ผจญภัย" , "เอาชีวิตรอด"],
    players: "1 คนขึ้นไป",
    type_player: ["ผู้เล่นคนเดียว","ผู้เล่นหลายคน","Co-op"],
  },
  {  
    id: 13,
    title: "Apex Legends",
    isFeatured: false,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://sl1nk.com/i7s8ji4",

      gallery: [
        "https://sl1nk.com/5w788kt",
        "https://l1nq.com/w313cvt",
        "https://sl1nk.com/ltj0rn1",
        "https://sl1nk.com/ngsl3w1",
      ]
    },
    description: "เกมยิงแนว Battle Royale ที่ผู้เล่นเลือกตัวละครที่มีความสามารถแตกต่างกัน แล้วร่วมทีมต่อสู้กับทีมอื่นเพื่อเป็นผู้รอดชีวิตคนสุดท้าย",
    downloadLinks: [
      {
        platform: "Steam",
        price: 0,
        url: "https://store.steampowered.com/app/1172470/Apex_Legends/"
      },
      {
        platform: "EA",
        price: 0,
        url: "https://www.ea.com/games/apex-legends/apex-legends?utm_source=chatgpt.com"
      }
    ],                  
    genre: ["เอาชีวิตรอด", "แอ็คชั่น" , "ยิงปืน"],
    players: "1-3",
    type_player: ["ผู้เล่นหลายคน","Co-op","PvP"],
  },
  {  
    id: 14,
    title: "PUBG: BATTLEGROUNDS",
    isFeatured: false,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://l1nq.com/c9beq0n",

      gallery: [
        "https://sl1nk.com/61oh1ma",
        "https://sl1nk.com/axupm6i",
        "https://sl1nk.com/r833263",
        "https://sl1nk.com/fn9yn06",
      ]
    },
    description: "เกมยิงแนว Battle Royale ที่ผู้เล่นกระโดดร่มลงสู่สนามรบ ค้นหาอาวุธและอุปกรณ์ ต่อสู้กับผู้เล่นคนอื่น และเอาชีวิตรอดจนเป็นคนหรือทีมสุดท้าย",
    downloadLinks: [
      {
        platform: "Steam",
        price: 0,
        url: "https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/"
      },
      {
        platform: "Epic Games Store",
        price: 0,
        url: "https://store.epicgames.com/p/pubg-59c1d9"
      }
    ],                  
    genre: ["เอาชีวิตรอด", "แอ็คชั่น" , "ยิงปืน"],
    players: "1-4",
    type_player: ["ผู้เล่นคนเดียว","ผู้เล่นหลายคน","Co-op","PvP"],
  },
  {  
    id: 15,
    title: "VALORANT",
    isFeatured: true,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://l1nq.com/w7lqhin",

      gallery: [
        "https://sl1nk.com/me8lgd3",
        "https://l1nq.com/9co6iaa",
        "https://sl1nk.com/5zbvbcp",
        "https://l1nq.com/sztgesw",
      ]
    },
    description: "เกมยิงมุมมองบุคคลที่หนึ่งแบบทีม 5 ต่อ 5 ผู้เล่นเลือกเอเจนต์ที่มีความสามารถเฉพาะตัว วางแผนโจมตีและป้องกันเพื่อทำภารกิจให้สำเร็จ",
    downloadLinks: [
      {
        platform: "Epic Games Store",
        price: 0,
        url: "https://store.epicgames.com/p/valorant"
      },
      {
        platform: "เว็บไซต์ทางการ",
        price: 0,
        url: "https://playvalorant.com/th-th/?utm_source=chatgpt.com"
      }
    ],                  
    genre: ["แอ็คชั่น", "ยิงปืน"],
    players: "1-10",
    type_player: ["ผู้เล่นหลายคน","PvP"],
  },
  {  
    id: 16,
    title: "Super Battle Golf",
    isFeatured: true,
    isNew: true,
    isPopular: false,
    images: {
      cover: "https://l1nq.com/cg9pgy6",

      gallery: [
        "https://l1nq.com/x4oirpw",
        "https://l1nq.com/jllikyd",
        "https://l1nq.com/3p687b1",
        "https://sl1nk.com/gkb9mvk",
      ]
    },
    description: "เกมกอล์ฟออนไลน์แนวปาร์ตี้ที่ผู้เล่นแข่งขันกันตีลูกกอล์ฟไปยังหลุมพร้อมกัน สามารถใช้ไอเทมก่อกวนและขัดขวางคู่แข่งระหว่างการแข่งขันได้",
    downloadLinks: [
      {
        platform: "Steam",
        price: 259,
        url: "https://store.steampowered.com/app/4069520/Super_Battle_Golf/"
      }
    ],                  
    genre: ["กีฬา", "เกมปาร์ตี้"],
    players: "1-8",
    type_player: ["ผู้เล่นคนเดียว","ผู้เล่นหลายคน","Co-op","PvP"],
  },
  {  
    id: 17,
    title: "Minecraft",
    isFeatured: false,
    isNew: false,
    isPopular: true,
    images: {
      cover: "https://sl1nk.com/mg5lnip",

      gallery: [
        "https://sl1nk.com/gu6jp7y",
        "https://l1nq.com/nxglej4",
        "https://sl1nk.com/57alf9i",
        "https://sl1nk.com/cunqta0",
      ]
    },
    description: "เกมแซนด์บ็อกซ์ที่ให้ผู้เล่นสำรวจโลกแบบบล็อก เก็บทรัพยากร สร้างสิ่งก่อสร้าง ประดิษฐ์อุปกรณ์ และเอาชีวิตรอดจากสัตว์ประหลาด",
    downloadLinks: [
      {
        platform: "เว็บไซต์ทางการ",
        price: 1059,
        url: "https://www.minecraft.net/en-us/about-minecraft"
      }
    ],                  
    genre: ["ผจญภัย", "เอาชีวิตรอด" , "จำลองสถานการณ์"],
    players: "1 คนขึ้นไป",
    type_player: ["ผู้เล่นคนเดียว","ผู้เล่นหลายคน","Co-op"],
  },
  {  
    id: 18,
    title: "Aniimo",
    isFeatured: false,
    isNew: true,
    isPopular: true,
    images: {
      cover: "https://sl1nk.com/vi16ixa",

      gallery: [
        "https://l1nq.com/2lbf6je",
        "https://l1nq.com/gu3rovh",
        "https://l1nq.com/0g075eq",
        "https://l1nq.com/w5ygwkk",
      ]
    },
    description: "เกมผจญภัยสวมบทบาทโลกเปิดที่ให้ผู้เล่นออกสำรวจโลก Idyll จับและสะสมสิ่งมีชีวิตมหัศจรรย์ที่เรียกว่า Aniimo พร้อมพัฒนาความสามารถและค้นพบความลับของโลก",
    downloadLinks: [
      {
        platform: "Epic Games Store",
        price: 0,
        url: "https://store.epicgames.com/p/aniimo-759396"
      },
      {
        platform: "Steam",
        price: 0,
        url: "https://store.steampowered.com/app/4126040/Aniimo/"
      },
      {
        platform: "เว็บไซต์ทางการ",
        price: 0,
        url: "https://aniimo.com/"
      }
    ],                  
    genre: ["ผจญภัย", "สวมบทบาท" , "โลกเปิด","แฟนตาซี"],
    players: "1",
    type_player: ["ผู้เล่นคนเดียว","ผู้เล่นหลายคน"],
  },
  {  
    id: 19,
    title: "Planet Zoo 2",
    isFeatured: false,
    isNew: false,
    isPopular: false,
    images: {
      cover: "https://l1nq.com/bkiflzy",

      gallery: [
        "https://l1nq.com/97mhtt6",
        "https://sl1nk.com/ibc3c8z",
        "https://l1nq.com/bnbvbxn",
        "https://l1nq.com/ph73xud",
      ]
    },
    description: "เกมจำลองการสร้างและบริหารสวนสัตว์ ผู้เล่นออกแบบพื้นที่อยู่อาศัยของสัตว์ ดูแลสัตว์ จัดการพนักงาน และพัฒนาสวนสัตว์ให้เติบโต โดยมีสัตว์น้ำและสัตว์บินได้เพิ่มเติม",
    downloadLinks: [
      {
        platform: "Steam",
        price: 1079,
        url: "https://store.steampowered.com/app/3219030/Planet_Zoo_2/"
      },
      {
        platform: "Epic Games Store",
        price: 1079,
        url: "https://store.epicgames.com/p/planet-zoo-2-cbdaa7"
      }
    ],                  
    genre: ["จำลองสถานการณ์"],
    players: "1",
    type_player: ["ผู้เล่นคนเดียว"],
  },
  {  
    id: 20,
    title: "Castlevania: Belmont's Curse",
    isFeatured: true,
    isNew: true,
    isPopular: true,
    images: {
      cover: "https://sl1nk.com/2s9rtk2",

      gallery: [
        "https://sl1nk.com/1nxum23",
        "https://sl1nk.com/ztnxlkq",
        "https://sl1nk.com/zpc7c0i",
        "https://sl1nk.com/e01pzsr",
      ]
    },
    description: "เกมแอ็คชั่นผจญภัยแบบ 2 มิติ ผู้เล่นรับบทเป็น Rose Belmont ออกต่อสู้กับเหล่าปีศาจ สำรวจเมืองปารีสและปราสาทของ Dracula โดยใช้อาวุธและแส้ศักดิ์สิทธิ์",
    downloadLinks: [
      {
        platform: "Steam",
        price: 845,
        url: "https://store.steampowered.com/app/4231820/Castlevania_Belmonts_Curse/"
      }
    ],                  
    genre: ["แอ็คชั่น", "ผจญภัย" , "แฟนตาซี","สยองขวัญ"],
    players: "1",
    type_player: ["ผู้เล่นคนเดียว"],
  },
];