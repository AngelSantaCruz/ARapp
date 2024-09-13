import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Header from "@/components/Header";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useTheme,
} from "@react-navigation/native";
import { useEffect } from "react";

export default function TabOneScreen() {
  const colorScheme = useTheme();

  return (
    <ThemeProvider
      value={colorScheme.dark === false ? DarkTheme : DefaultTheme}
    >
      <ScrollView style={styles.container}>
        <Header atHome={false} />
        <View style={styles.ideasContainer}>
          <Text style={styles.ideasHeading}>Ideas</Text>
          <View style={styles.ideas}>
            <View
              style={[
                styles.idea,
                {
                  borderColor:
                    colorScheme.dark === false
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                },
              ]}
            >
              <View style={styles.ideaHead}>
                <Text style={styles.ideaHeading}>
                  Idea 
                </Text>
                <Text>3:34 PM, Hoy.</Text>
              </View>
              <Text>
                A curious, wild idea has arrived. Have a look at it to
                learn more about it.
              </Text>
            </View>
            <View
              style={[
                styles.idea,
                {
                  borderColor:
                    colorScheme.dark === false
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                },
              ]}
            >
              <View style={styles.ideaHead}>
                <Text style={styles.ideaHeading}>
                  Idea 
                </Text>
                <Text>3:34 PM, Hoy.</Text>
              </View>
              <Text>
                A curious, wild idea has arrived. Have a look at it to
                learn more about it.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  ideasContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  ideasHeading: {
    fontSize: 24,
    fontWeight: "700",
  },
  ideas: {
    marginTop: 20,
    width: "100%",
    height: "100%",
    gap: 20,
  },
  idea: {
    width: "100%",
    padding: 20,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 5,
  },
  ideaHead: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  ideaHeading: {
    fontWeight: "700",
  },
});
