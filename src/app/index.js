import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

// The start menu: one button per example.
// "href" is the file name in src/app (e.g. "/graphs" -> src/app/graphs.js)
const examples = [
  { href: "/graphs", title: "1. Graphs", subtitle: "Skia: animated graph + drag slider" },
  { href: "/matrix", title: "2. Matrix", subtitle: "Skia: falling code rain" },
  { href: "/gooey", title: "3. Gooey Menu", subtitle: "Skia + Reanimated: tap the menu" },
  { href: "/carousel", title: "4. Carousel", subtitle: "FlashList: horizontal swipe" },
  { href: "/menu", title: "5. Native Menu", subtitle: "@react-native-menu/menu" },
];

export default function StartMenu() {
  return (
    <View style={styles.container}>
      {examples.map((example) => (
        <Link key={example.href} href={example.href} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.title}>{example.title}</Text>
            <Text style={styles.subtitle}>{example.subtitle}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: "#f2f2f7",
  },
  button: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
