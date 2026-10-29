import path from "node:path";

import { Document, Font, Image, Page, Path, Rect, Stop, Svg, Text, View, LinearGradient, Defs, renderToBuffer } from "@react-pdf/renderer";
import QRCode from "qrcode";

import { logoPaths } from "@/components/brand/logo-paths";
import { siteConfig, siteUrl, whatsappLink } from "@/content/site";
import { strings, type Lang } from "@/content/strings";
import type { Category } from "@/lib/content";

const fonts = path.join(process.cwd(), "assets", "fonts");
Font.register({ family: "Prata", src: path.join(fonts, "Prata-Regular.ttf") });
Font.register({
  family: "Manrope",
  fonts: [
    { src: path.join(fonts, "Manrope-400.ttf"), fontWeight: 400 },
    { src: path.join(fonts, "Manrope-600.ttf"), fontWeight: 600 }
  ]
});
Font.registerHyphenationCallback((word) => [word]);

const INK = "#1a1416";
const RED = "#af2830";
const PLUM = "#6e4651";
const MAUVE = "#8f6a74";
const DOTS = "#d99aab";

const A4 = { w: 595.28, h: 841.89 };

function Background() {
  return (
    <Svg fixed height={A4.h} style={{ position: "absolute", top: 0, left: 0 }} width={A4.w}>
      <Defs>
        <LinearGradient id="pink" x1="0" x2="0.2" y1="0" y2="1">
          <Stop offset="0" stopColor="#fff6f8" />
          <Stop offset="0.55" stopColor="#fbe3e9" />
          <Stop offset="1" stopColor="#f5ccd7" />
        </LinearGradient>
      </Defs>
      <Rect fill="url(#pink)" height={A4.h} width={A4.w} x={0} y={0} />
    </Svg>
  );
}

function LogoMark({ width }: { width: number }) {
  return (
    <Svg height={(width * 747) / 1000} viewBox="0 0 1000 747" width={width}>
      <Path d={logoPaths.hair} fill={INK} fillRule="evenodd" />
      <Path d={logoPaths.script} fill={RED} fillRule="evenodd" />
      <Path d={logoPaths.tag} fill="#403a3c" fillRule="evenodd" />
    </Svg>
  );
}

function Flower({ size }: { size: number }) {
  return (
    <Svg height={size} viewBox="805 95 175 175" width={size}>
      <Path d={logoPaths.script} fill={RED} fillRule="evenodd" />
    </Svg>
  );
}

function Divider() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
      <View style={{ width: 90, height: 0.7, backgroundColor: DOTS }} />
      <View style={{ marginHorizontal: 10 }}>
        <Flower size={16} />
      </View>
      <View style={{ width: 90, height: 0.7, backgroundColor: DOTS }} />
    </View>
  );
}

function Row({ name, price }: { name: string; price: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", paddingVertical: 3.2 }} wrap={false}>
      <Text style={{ fontFamily: "Manrope", fontSize: 10.5, color: INK, maxWidth: 270 }}>{name}</Text>
      <View style={{ flexGrow: 1, borderBottomWidth: 1, borderBottomColor: DOTS, borderBottomStyle: "dotted", marginHorizontal: 6, marginBottom: 3 }} />
      <Text style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 10.5, color: INK }}>{price}</Text>
    </View>
  );
}

export async function renderMenuPdf(lang: Lang, categories: Category[]) {
  const t = strings[lang];
  const qr = await QRCode.toDataURL(whatsappLink(t.message.general), { margin: 0, width: 300, color: { dark: INK, light: "#00000000" } });
  const printed = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { month: "long", year: "numeric", timeZone: "Indian/Mauritius" }).format(new Date());

  const doc = (
    <Document author={siteConfig.name} language={lang} subject={t.menu.metaTitle} title={`${siteConfig.name}, ${t.menu.title}`}>
      {/* Cover */}
      <Page size="A4" style={{ padding: 56, alignItems: "center", justifyContent: "center" }}>
        <Background />
        <LogoMark width={330} />
        <Text style={{ fontFamily: "Prata", fontSize: 40, color: INK, marginTop: 34 }}>{t.menu.title}</Text>
        <Divider />
        <Text style={{ fontFamily: "Manrope", fontSize: 11.5, color: PLUM, textAlign: "center", maxWidth: 330, lineHeight: 1.5 }}>
          {t.heroLede}
        </Text>
        <View style={{ marginTop: 56, alignItems: "center" }}>
          <Image src={qr} style={{ width: 96, height: 96 }} />
          <Text style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 11, color: INK, marginTop: 10 }}>
            {t.ticket.book} {siteConfig.bookingWhatsappDisplay}
          </Text>
          <Text style={{ fontFamily: "Manrope", fontSize: 10, color: PLUM, marginTop: 4 }}>
            {t.footer.salon} {siteConfig.fixedLineDisplay}
          </Text>
          <Text style={{ fontFamily: "Manrope", fontSize: 10, color: PLUM, marginTop: 4 }}>{t.hoursSummary}</Text>
          <Text style={{ fontFamily: "Manrope", fontSize: 10, color: PLUM, marginTop: 4 }}>
            {siteConfig.address.street}, {siteConfig.address.locality}
          </Text>
        </View>
      </Page>

      {/* Price pages */}
      <Page size="A4" style={{ paddingTop: 54, paddingBottom: 64, paddingHorizontal: 92 }}>
        <Background />
        <Text style={{ fontFamily: "Manrope", fontSize: 9.5, color: MAUVE, textAlign: "center", marginBottom: 14 }}>{t.menu.intro}</Text>
        {categories.map((c) => (
          // Short categories stay in one piece; long ones may continue on the next page instead of leaving a gap.
          <View key={c.id} style={{ marginTop: 16 }} wrap={c.items.length > 10}>
            <Text minPresenceAhead={70} style={{ fontFamily: "Prata", fontSize: 19, color: INK, textAlign: "center" }}>
              {c.name}
            </Text>
            {c.note ? <Text style={{ fontFamily: "Manrope", fontSize: 9, color: MAUVE, textAlign: "center", marginTop: 3 }}>{c.note}</Text> : null}
            <View style={{ marginTop: 7 }}>
              {c.items.map((i) => (
                <Row key={i.id} name={i.name} price={i.price} />
              ))}
            </View>
          </View>
        ))}
        <View fixed style={{ position: "absolute", bottom: 26, left: 92, right: 92, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Manrope", fontSize: 8.5, color: MAUVE }}>
            {siteConfig.name}, {siteUrl.replace("https://", "")}
          </Text>
          <Text style={{ fontFamily: "Manrope", fontSize: 8.5, color: MAUVE }}>{printed}</Text>
        </View>
      </Page>
    </Document>
  );

  return renderToBuffer(doc);
}
