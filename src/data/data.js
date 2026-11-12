export const games = [
  {
    id: "GAM001",
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
    id: "GAM002",
    title: "Slap 'em UP!",
    isFeatured: true,
    isNew: true,
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
    genre: ["เกมการ์ด", "เกมอินดี้" , "เกมปาร์ตี้" , "PvP"],
    players: "1-4",
    type_player: ["ผู้เล่นหลายคน"],
  }
];