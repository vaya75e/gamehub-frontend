
function About() {
  const features = [
    {
      icon: "🎮",
      title: "ค้นหาเกม",
      description:
        "ค้นหาและเลือกชมเกมหลากหลายประเภท พร้อมรายละเอียดและข้อมูลของแต่ละเกม",
    },
    {
      icon: "⭐",
      title: "รีวิวและให้คะแนน",
      description:
        "แบ่งปันความคิดเห็น รีวิวเกม และให้คะแนนเกมที่คุณชื่นชอบ",
    },
    {
      icon: "❤️",
      title: "รายการโปรด",
      description:
        "บันทึกเกมที่สนใจไว้ในรายการโปรด เพื่อกลับมาดูได้สะดวก",
    },
  ];

  const members = [
    {
      id: "670710319",
      name: "ณัฐพิฌา อั้งจุดพันธ์",
    },
    {
      id: "670710722",
      name: "ธัญลักษณ์ มาสถิตทรัพย์",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-14 text-white md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-16 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
            Welcome to GameHub
          </p>

          <h1 className="text-4xl font-extrabold md:text-5xl">
            เกี่ยวกับ{" "}
            <span className="text-blue-400">GameHub</span>
          </h1>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-blue-500" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-400 md:text-base">
            พื้นที่สำหรับคนรักเกม ที่รวบรวมข้อมูลเกมหลากหลายประเภท
            ให้คุณค้นพบเกมที่ใช่ พร้อมแบ่งปันความคิดเห็นและประสบการณ์
            กับผู้เล่นคนอื่น ๆ
          </p>
        </header>

        {/* Team */}
        <section className="mb-16">
          <div className="mb-7 text-center">
            <h2 className="text-2xl font-bold">
              ผู้จัดทำ
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              โปรเจกต์รายวิชา 520 342 Server Side Web Programming
              และ 520 341 Client Side Web Programming
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
            <p className="mb-6 text-center font-semibold text-blue-400">
              กลุ่มนายเมืองวัดบางระจัน
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-center transition hover:border-blue-500/50"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-xl text-blue-400">
                    👤
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {member.name}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {member.id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About GameHub */}
        <section className="mb-16 rounded-2xl border border-slate-800 bg-slate-900/70 p-7 md:p-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              🎯
            </div>

            <h2 className="text-2xl font-bold text-blue-400">
              GameHub คืออะไร?
            </h2>
          </div>

          <p className="text-sm leading-8 text-slate-300 md:text-base">
            GameHub เป็นเว็บไซต์ที่รวบรวมข้อมูลเกมจากหลากหลายแนว
            ไม่ว่าจะเป็นเกมผจญภัย เกมเอาชีวิตรอด เกมจำลองสถานการณ์
            เกมแอ็กชัน และเกมประเภทอื่น ๆ
            ผู้ใช้งานสามารถค้นหารายละเอียดเกม ดูช่องทางดาวน์โหลด
            อ่านรีวิว แสดงความคิดเห็น ให้คะแนน และเพิ่มเกมที่สนใจ
            ลงในรายการโปรดได้
          </p>
        </section>

        {/* Features */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">
              สิ่งที่คุณสามารถทำได้บน GameHub
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              ฟังก์ชันที่ช่วยให้การค้นพบเกมเป็นเรื่องง่าย
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                  {feature.icon}
                </div>

                <h3 className="mb-3 text-lg font-bold text-blue-400">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Goal */}
        <section className="rounded-2xl border border-blue-900/50 bg-blue-950/20 p-7 text-center md:p-10">
          <div className="mb-4 text-3xl">🚀</div>

          <h2 className="mb-5 text-2xl font-bold text-blue-400">
            เป้าหมายของเรา
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-8 text-slate-300 md:text-base">
            เราต้องการสร้างเว็บไซต์ที่ช่วยให้ผู้เล่นเข้าถึงข้อมูลเกมได้ง่าย
            สะดวกต่อการค้นหา และเป็นพื้นที่สำหรับแลกเปลี่ยนความคิดเห็น
            เพื่อให้ทุกคนสามารถค้นพบเกมใหม่ ๆ ที่ตรงกับความสนใจของตนเอง
          </p>
        </section>

      </div>
    </div>
  );
}

export default About;
