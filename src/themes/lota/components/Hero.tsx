"use client";
export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-[80px] pb-[100px] gap-10 min-h-[483px] relative">
      {/* Text block */}
      <div className="relative w-[502px]">
        {/* "Hello" italic thin */}
        <p
          className="absolute text-white/52 italic font-light"
          style={{ fontSize: "43px", fontWeight: 250, top: "-6px", left: "5.61px", lineHeight: "150%" }}
        >
          Hello
        </p>

        {/* Main headline */}
        <div style={{ paddingTop: "46.71px" }}>
          <p className="text-white" style={{ fontSize: "61.43px", lineHeight: "150%", fontWeight: 400 }}>
            I&apos;m what you need.
          </p>
          <div className="flex items-center gap-0">
            <p className="text-white" style={{ fontSize: "61.43px", lineHeight: "150%", fontWeight: 400 }}>
              I&apos;m that&nbsp;
            </p>
            {/* "Designer." with gold border box and corner squares */}
            <div className="relative inline-flex items-center">
              {/* Corner squares */}
              <div className="absolute w-[8.53px] h-[8.53px] bg-white border border-gold-border" style={{ top: 0, left: 0, transform: "translate(-50%,-50%)" }} />
              <div className="absolute w-[8.53px] h-[8.53px] bg-white border border-gold-border" style={{ top: 0, right: 0, transform: "translate(50%,-50%)" }} />
              <div className="absolute w-[8.53px] h-[8.53px] bg-white border border-gold-border" style={{ bottom: 0, left: 0, transform: "translate(-50%,50%)" }} />
              <div className="absolute w-[8.53px] h-[8.53px] bg-white border border-gold-border" style={{ bottom: 0, right: 0, transform: "translate(50%,50%)" }} />
              <span
                className="text-gold px-2"
                style={{
                  fontSize: "61.43px",
                  lineHeight: "150%",
                  fontWeight: 400,
                  border: "1px solid #F2A206",
                  padding: "0 8.53px",
                }}
              >
                Designer.
              </span>
            </div>
          </div>
        </div>

        {/* Name card — floating bottom right */}
        <div
          className="absolute"
          style={{ right: "-128px", bottom: "-40px" }}
        >
          <div
            className="relative px-[17px] py-[8.5px] bg-cream/10 rounded-[4.27px] shadow-md"
            style={{ minWidth: "262px" }}
          >
            {/* Arrow decoration */}
            <div
              className="absolute"
              style={{
                width: "23px",
                height: "20px",
                left: "-30px",
                top: 0,
                background: "linear-gradient(180.12deg, rgba(115,115,115,0.26) 11.87%, rgba(255,255,255,0.51) 51%, rgba(115,115,115,0.26) 91.67%)",
                transform: "rotate(-114.06deg)",
              }}
            />
            <p className="text-white/90 font-bold text-[25.6px] leading-[150%]" style={{ fontFamily: "Istok Web, sans-serif" }}>
              Lotachukwu Oranu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
